import { useEffect, useState } from 'react'

type GitHubRepository = {
  id: number
  name: string
  full_name: string
  default_branch: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
  archived: boolean
  topics: string[]
}

type ReadmeBadge = {
  label: string
  imageUrl: string
}

export type ProfolioRepository = GitHubRepository & {
  badges: ReadmeBadge[]
}

const profolioMarker = '<!-- {use profolio} -->'

function isGitHubRepository(value: unknown): value is GitHubRepository {
  if (typeof value !== 'object' || value === null) return false
  const repo = value as Record<string, unknown>
  return (
    typeof repo.id === 'number' &&
    typeof repo.name === 'string' &&
    typeof repo.full_name === 'string' &&
    typeof repo.default_branch === 'string' &&
    typeof repo.html_url === 'string' &&
    (typeof repo.description === 'string' || repo.description === null) &&
    (typeof repo.language === 'string' || repo.language === null) &&
    typeof repo.stargazers_count === 'number' &&
    typeof repo.forks_count === 'number' &&
    typeof repo.updated_at === 'string' &&
    typeof repo.fork === 'boolean' &&
    typeof repo.archived === 'boolean' &&
    Array.isArray(repo.topics) &&
    repo.topics.every((topic) => typeof topic === 'string')
  )
}

function getReadmeDescription(markdown: string) {
  const content = markdown.replace(/^\uFEFF?---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, '')

  for (const paragraph of content.replace(/```[\s\S]*?```/g, ' ').split(/\n\s*\n/)) {
    const description = paragraph
      .split(/\r?\n/)
      .filter((line) => !/^\s*(?:#{1,6}\s|(?:-{3,}|\*{3,}|_{3,})\s*$)/.test(line))
      .join(' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
      .replace(/<[^>]*>/g, ' ')
      .replace(/[`*_~]/g, '')
      .replace(/\s+/g, ' ')
      .trim()

    if (description) {
      return description.length > 220 ? `${description.slice(0, 217).trimEnd()}…` : description
    }
  }

  return null
}

function getReadmeBadges(markdown: string): ReadmeBadge[] {
  const badges: ReadmeBadge[] = []
  const imagePattern = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)(?:\s+"[^"]*")?\)/g

  for (const match of markdown.matchAll(imagePattern)) {
    const [, label, imageUrl] = match
    const isBadge =
      /shields\.io|badgen\.net|badge\.fury\.io|codecov\.io|coveralls\.io|travis-ci|circleci\.com|appveyor\.com/i.test(imageUrl) ||
      /\/(?:badge|badges|status)(?:\/|\.|$)/i.test(imageUrl) ||
      /\b(badge|build|coverage|license|status|version)\b/i.test(label)

    if (isBadge) {
      badges.push({ label: label || 'Repository badge', imageUrl })
    }
    if (badges.length === 6) break
  }

  return badges
}

async function getProfolioRepository(repository: GitHubRepository, signal: AbortSignal) {
  let markdown: string | null = null
  const readmeFiles = ['README.md', 'README', 'readme.md', 'readme']

  for (const fileName of readmeFiles) {
    const response = await fetch(
      `https://raw.githubusercontent.com/${repository.full_name}/${encodeURIComponent(repository.default_branch)}/${fileName}`,
      { signal },
    )

    if (response.status === 404) continue
    if (!response.ok) {
      throw new Error(`Could not check the README for ${repository.full_name} (HTTP ${response.status}).`)
    }

    markdown = await response.text()
    break
  }

  if (markdown === null) return null
  if (!markdown.includes(profolioMarker)) return null

  return {
    ...repository,
    description: getReadmeDescription(markdown) ?? repository.description,
    badges: getReadmeBadges(markdown),
  }
}

export function useProfolioRepositories() {
  const [repositories, setRepositories] = useState<ProfolioRepository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadRepositories() {
      try {
        const allRepositories: GitHubRepository[] = []
        let page = 1

        while (true) {
          const response = await fetch(
            `https://api.github.com/users/DevHatemAlDouh/repos?type=owner&sort=updated&per_page=100&page=${page}`,
            {
              headers: { Accept: 'application/vnd.github+json' },
              signal: controller.signal,
            },
          )

          if (!response.ok) {
            const rateLimitReset = response.headers.get('x-ratelimit-reset')
            const resetMessage = rateLimitReset
              ? ` Try again after ${new Date(Number(rateLimitReset) * 1000).toLocaleTimeString()}.`
              : ''
            throw new Error(
              `GitHub repository request failed (HTTP ${response.status}).${response.status === 429 || response.status === 403 ? resetMessage : ''}`,
            )
          }

          const payload: unknown = await response.json()
          if (
            !Array.isArray(payload) ||
            !payload.every(isGitHubRepository)
          ) {
            throw new Error('GitHub returned repository data in an unexpected format.')
          }

          allRepositories.push(...payload)
          if (payload.length < 100) break
          page += 1
        }

        const markedRepositories: (ProfolioRepository | null)[] = []
        for (let index = 0; index < allRepositories.length; index += 8) {
          markedRepositories.push(
            ...await Promise.all(
              allRepositories
                .slice(index, index + 8)
                .map((repository) => getProfolioRepository(repository, controller.signal)),
            ),
          )
        }

        if (active) {
          setRepositories(
            markedRepositories
              .filter((repository): repository is ProfolioRepository => repository !== null)
              .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)),
          )
          setError(null)
        }
      } catch (caughtError) {
        if (controller.signal.aborted) return
        if (active) {
          setError(caughtError instanceof Error ? caughtError.message : 'Could not load repositories from GitHub.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadRepositories()
    return () => {
      active = false
      controller.abort()
    }
  }, [])

  return { repositories, loading, error }
}

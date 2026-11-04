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
  isGame: boolean
}

type RepositoryCache = {
  updatedAt: string
  repositories: ProfolioRepository[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isProfolioRepository(value: unknown): value is ProfolioRepository {
  if (!isRecord(value)) return false
  const repository = value
  return (
    typeof repository.id === 'number' &&
    typeof repository.name === 'string' &&
    typeof repository.full_name === 'string' &&
    typeof repository.default_branch === 'string' &&
    typeof repository.html_url === 'string' &&
    (typeof repository.description === 'string' || repository.description === null) &&
    (typeof repository.language === 'string' || repository.language === null) &&
    typeof repository.stargazers_count === 'number' &&
    typeof repository.forks_count === 'number' &&
    typeof repository.updated_at === 'string' &&
    typeof repository.fork === 'boolean' &&
    typeof repository.archived === 'boolean' &&
    Array.isArray(repository.topics) &&
    repository.topics.every((topic) => typeof topic === 'string') &&
    Array.isArray(repository.badges) &&
    repository.badges.every(
      (badge) =>
        isRecord(badge) &&
        typeof badge.label === 'string' &&
        typeof badge.imageUrl === 'string',
    ) &&
    typeof repository.isGame === 'boolean'
  )
}

function isRepositoryCache(value: unknown): value is RepositoryCache {
  if (!isRecord(value)) return false
  return (
    typeof value.updatedAt === 'string' &&
    Array.isArray(value.repositories) &&
    value.repositories.every(isProfolioRepository)
  )
}

export function useProfolioRepositories() {
  const [repositories, setRepositories] = useState<ProfolioRepository[]>([])
  const [cacheUpdatedAt, setCacheUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRepositories() {
      try {
        const response = await fetch('/repositories.json', { signal: controller.signal })
        if (!response.ok) {
          throw new Error(
            `Project cache request failed (HTTP ${response.status}). Make sure the repository cache workflow has run.`,
          )
        }
        if (!response.headers.get('content-type')?.includes('application/json')) {
          throw new Error('The project cache URL returned HTML instead of JSON. Run the Update repository cache workflow in GitHub Actions.')
        }

        const payload: unknown = await response.json()
        if (!isRepositoryCache(payload)) {
          throw new Error('Project cache data has an unexpected format.')
        }

        if (!controller.signal.aborted) {
          setRepositories(payload.repositories)
          setCacheUpdatedAt(payload.updatedAt)
          setError(null)
        }
      } catch (caughtError) {
        if (controller.signal.aborted) return
        setError(caughtError instanceof Error ? caughtError.message : 'Could not load projects.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadRepositories()
    return () => controller.abort()
  }, [])

  return { repositories, cacheUpdatedAt, loading, error }
}

import { mkdir, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const username = 'DevHatemAlDouh'
const outputPath = resolve('public/repositories.json')
const token = process.env.GITHUB_TOKEN
const profolioMarker = '<!-- {use profolio} -->'
const profolioGameMarker = '<!-- {use profolio game} -->'

if (!token) {
  throw new Error('GITHUB_TOKEN is required to refresh the repository cache.')
}

async function fetchGitHubJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!response.ok) {
    const resetAt = response.headers.get('x-ratelimit-reset')
    const resetMessage = resetAt ? ` Rate limit resets at ${new Date(Number(resetAt) * 1000).toISOString()}.` : ''
    throw new Error(`GitHub request failed (HTTP ${response.status}).${resetMessage}`)
  }

  return response.json()
}

function getReadmeDescription(markdown) {
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

function getReadmeBadges(markdown) {
  const badges = []
  const imagePattern = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)(?:\s+"[^"]*")?\)/g

  for (const match of markdown.matchAll(imagePattern)) {
    const [, label, imageUrl] = match
    const isBadge =
      /shields\.io|badgen\.net|badge\.fury\.io|codecov\.io|coveralls\.io|travis-ci|circleci\.com|appveyor\.com/i.test(imageUrl) ||
      /\/(?:badge|badges|status)(?:\/|\.|$)/i.test(imageUrl) ||
      /\b(badge|build|coverage|license|status|version)\b/i.test(label)

    if (isBadge) badges.push({ label: label || 'Repository badge', imageUrl })
    if (badges.length === 6) break
  }

  return badges
}

async function getReadme(repository) {
  for (const fileName of ['README.md', 'README', 'readme.md', 'readme']) {
    const url = `https://raw.githubusercontent.com/${repository.full_name}/${encodeURIComponent(repository.default_branch)}/${fileName}`
    const response = await fetch(url)

    if (response.status === 404) continue
    if (!response.ok) {
      throw new Error(`Could not check the README for ${repository.full_name} (HTTP ${response.status}).`)
    }

    return response.text()
  }

  return null
}

async function getProfolioRepository(repository) {
  const markdown = await getReadme(repository)
  if (markdown === null) return null

  const isGame = markdown.includes(profolioGameMarker)
  if (!isGame && !markdown.includes(profolioMarker)) return null

  return {
    ...repository,
    description: getReadmeDescription(markdown) ?? repository.description,
    badges: getReadmeBadges(markdown),
    isGame:
      isGame ||
      repository.language === 'GDScript' ||
      repository.topics.some((topic) => ['game', 'gamedev', 'godot'].includes(topic.toLowerCase())) ||
      /game|fabric|bonga|hox|alphabet/i.test(repository.name),
  }
}

async function getAllRepositories() {
  const repositories = []

  for (let page = 1; ; page += 1) {
    const pageRepositories = await fetchGitHubJson(
      `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100&page=${page}`,
    )
    if (!Array.isArray(pageRepositories)) {
      throw new Error('GitHub returned repository data in an unexpected format.')
    }
    repositories.push(...pageRepositories)
    if (pageRepositories.length < 100) return repositories
  }
}

const repositories = await getAllRepositories()
const profolioRepositories = []

for (let index = 0; index < repositories.length; index += 8) {
  const batch = await Promise.all(repositories.slice(index, index + 8).map(getProfolioRepository))
  profolioRepositories.push(...batch.filter((repository) => repository !== null))
}

profolioRepositories.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))

const cache = {
  updatedAt: new Date().toISOString(),
  repositories: profolioRepositories,
}

await mkdir(dirname(outputPath), { recursive: true })
const temporaryPath = `${outputPath}.tmp`
await writeFile(temporaryPath, `${JSON.stringify(cache, null, 2)}\n`)
await rename(temporaryPath, outputPath)
console.log(`Updated ${outputPath} with ${profolioRepositories.length} marked repositories.`)

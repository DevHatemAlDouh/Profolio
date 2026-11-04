import type { ProfolioRepository } from '../hooks/useProfolioRepositories'
import ArrowIcon from './ArrowIcon'

type ProjectsSectionProps = {
  isGame: boolean
  projects: ProfolioRepository[]
  cacheUpdatedAt: string | null
  loading: boolean
  error: string | null
}

function ProjectsSection({ isGame, projects, cacheUpdatedAt, loading, error }: ProjectsSectionProps) {
  return (
    <section id="work" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#85906f]">{isGame ? 'WORLDS IN PROGRESS' : 'A FEW THINGS I’VE BUILT'}</p>
            <h2 className="text-4xl font-medium tracking-[-0.06em] sm:text-5xl">{isGame ? 'Selected games' : 'Selected projects'}<span className="text-[#9eaa85]">.</span></h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#777d72]">
            {loading
              ? 'Loading cached projects…'
              : `${projects.length} selected public repositories marked for Profolio, sorted by recent activity.`}
          </p>
        </div>
        <div aria-live="polite" aria-busy={loading}>
          {loading && (
            <p className="rounded-2xl border border-[#e5e7df] bg-[#f7f7f2] p-8 text-center text-sm text-[#6e7469]">
              Loading projects…
            </p>
          )}
          {error && (
            <div role="alert" className="rounded-2xl border border-[#e7c9bd] bg-[#fff8f4] p-8 text-center">
              <p className="font-medium text-[#593b32]">Projects could not be loaded.</p>
              <p className="mt-2 text-sm text-[#80685e]">{error}</p>
              <button type="button" onClick={() => window.location.reload()} className="mt-4 rounded-full bg-[#20251f] px-4 py-2 text-sm text-white hover:bg-[#414a3b]">Try again</button>
            </div>
          )}
          {!loading && !error && projects.length === 0 && (
            <p className="rounded-2xl border border-[#e5e7df] bg-[#f7f7f2] p-8 text-center text-sm text-[#6e7469]">
              {cacheUpdatedAt === 'not-yet-generated'
                ? 'The project cache is waiting for its first update. Run the Update repository cache workflow in GitHub Actions.'
                : `No ${isGame ? 'game' : 'web or software'} repositories found.`}
            </p>
          )}
          {!loading && !error && projects.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <article key={project.id} className="group overflow-hidden rounded-2xl border border-[#e8e9e2] bg-[#fbfbf8] transition-transform duration-300 hover:-translate-y-1">
                  <a href={project.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${project.full_name.replaceAll('_', ' ')} on GitHub (opens in a new tab)`} className="relative flex aspect-[1.45] items-center justify-center overflow-hidden bg-gradient-to-br from-[#dce9d5] via-[#f0eee3] to-[#d9dff0]">
                    <span className={`absolute h-36 w-36 rounded-full blur-2xl ${index % 3 === 1 ? 'bg-[#e6bca7]/50' : index % 3 === 2 ? 'bg-[#c6caed]/60' : 'bg-[#c3d6ae]/60'}`} />
                    <span className="relative max-w-[85%] truncate rounded-full border border-white/70 bg-white/70 px-5 py-3 text-center text-lg font-medium tracking-tight text-[#303a30] shadow-sm backdrop-blur-sm">
                      {project.name.replaceAll('_', ' ')}
                    </span>
                    <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#303a30] shadow-sm transition-transform group-hover:rotate-45"><ArrowIcon diagonal /></span>
                  </a>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-medium tracking-tight">{project.name.replaceAll('_', ' ')}</h3>
                        <p className="mt-2 min-h-10 text-sm leading-5 text-[#7d8378]">
                          {project.description || `${project.language ?? 'GitHub'} project by Hatem.`}
                        </p>
                      </div>
                      <span className="mt-1 shrink-0 text-xs text-[#979d91]">#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    {project.badges.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Repository README badges">
                        {project.badges.map((badge) => (
                          <img
                            key={`${badge.imageUrl}-${badge.label}`}
                            src={badge.imageUrl}
                            alt={badge.label}
                            title={badge.label}
                            loading="lazy"
                            className="h-5 max-w-full object-contain"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection

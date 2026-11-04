import ArrowIcon from './ArrowIcon'

type HeroArtworkProps = {
  isGame: boolean
}

function HeroArtwork({ isGame }: HeroArtworkProps) {
  return (
    <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto">
      <div className="absolute -left-7 top-12 h-20 w-20 rounded-full border border-[#dfe2d6] sm:-left-10 sm:h-28 sm:w-28" />
      <div className={`relative aspect-[0.92] overflow-hidden rounded-[48%_48%_20px_20px] ${isGame ? 'bg-[#dfe5d4]' : 'bg-[#dce9d5]'}`}>
        {isGame ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,#f0d28b_0%,#d1a26d_18%,transparent_38%),linear-gradient(180deg,#8296a0_0%,#556c67_55%,#26382f_100%)]" />
            <div className="absolute bottom-0 left-0 h-[47%] w-full bg-[#293b32] [clip-path:polygon(0_30%,15%_0,32%_32%,48%_8%,62%_38%,81%_12%,100%_38%,100%_100%,0_100%)]" />
            <div className="absolute bottom-[18%] left-[47%] h-[27%] w-[15%] -translate-x-1/2 rounded-t-full bg-[#1d2925] shadow-[0_0_35px_rgba(214,243,106,0.18)]" />
            <div className="absolute bottom-[39%] left-[42%] h-3 w-3 rounded-full bg-[#d6f36a] shadow-[0_0_20px_6px_rgba(214,243,106,0.5)]" />
            <div className="absolute left-[14%] top-[28%] h-1 w-1 rounded-full bg-white shadow-[50px_30px_white,230px_-20px_white,280px_70px_white]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_30%,#f3d9c3_0%,#d1b79f_28%,transparent_29%),linear-gradient(145deg,#dce5d2_0%,#c2ceb7_48%,#87947e_100%)]" />
            <div className="absolute left-[16%] top-[22%] h-[38%] w-[68%] rounded-xl border border-white/50 bg-white/20 p-2 shadow-[0_20px_60px_rgba(32,37,31,0.13)] backdrop-blur-sm">
              <div className="flex h-full overflow-hidden rounded-lg bg-[#f7f7f2]">
                <div className="hidden w-[28%] flex-col gap-2 bg-[#eef0e9] p-2 sm:flex"><span className="mb-2 h-2 w-10 rounded bg-[#87947e]" /><span className="h-1 w-full rounded bg-[#d5d9cd]" /><span className="h-1 w-4/5 rounded bg-[#d5d9cd]" /><span className="h-1 w-full rounded bg-[#d5d9cd]" /></div>
                <div className="flex flex-1 flex-col p-2 sm:p-3"><span className="h-1.5 w-1/3 rounded bg-[#454e42]" /><div className="mt-3 grid flex-1 grid-cols-3 gap-1.5"><span className="rounded bg-[#dce9d5]" /><span className="rounded bg-[#ead8c7]" /><span className="rounded bg-[#d9dff0]" /></div><div className="mt-2 h-1 w-1/2 rounded bg-[#d4d8cc]" /></div>
              </div>
            </div>
            <div className="absolute bottom-[-20%] left-1/2 h-[48%] w-[82%] -translate-x-1/2 rounded-t-[48%] bg-[#343d35] shadow-[inset_20px_0_40px_rgba(255,255,255,0.08)]" />
          </>
        )}
        <div className="absolute bottom-5 left-5 rounded-full border border-white/50 bg-white/70 px-3 py-1.5 text-[10px] font-medium tracking-wide text-[#3b4738] backdrop-blur-sm sm:bottom-7 sm:left-7 sm:text-xs">
          {isGame ? 'PLAYER ONE · HATEM' : 'DESIGN MINDED. DETAIL DRIVEN.'}
        </div>
      </div>
      <div className="absolute -right-2 top-8 rotate-3 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-[0_12px_35px_rgba(32,37,31,0.1)] backdrop-blur sm:-right-10 sm:top-12 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eff4df] text-[#617449]"><ArrowIcon diagonal /></span>
          <div><p className="text-[10px] text-[#858b7e] sm:text-xs">Currently</p><p className="text-xs font-medium sm:text-sm">{isGame ? 'Building new worlds' : 'Building for the web'}</p></div>
        </div>
      </div>
    </div>
  )
}

export default HeroArtwork

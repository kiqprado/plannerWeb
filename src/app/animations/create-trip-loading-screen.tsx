import { Airplane } from '@phosphor-icons/react'

export function CreateTripLoadingScreen() {
  return (
    <div className="absolute inset-0 z-50 flex bg-zinc-950/90">
      <div className="m-auto">
        <div className="mt-12 flex flex-col gap-3 text-center">
          <div className="relative w-64 h-5 rounded-full bg-zinc-800 overflow-hidden">
            <div className="absolute h-full w-full animate-[loading-bar_2s_ease-in-out_infinite]">
              <div 
                className="h-full w-full rounded-full 
                  bg-gradient-to-r from-lime-500/30 via-lime-500/80 to-lime-500
                  shadow-[0_0_16px_#84cc16,0_0_8px_#94e220]"
                style={{
                  filter: "blur(2px)"
                }}
              />
              <div className="absolute left-0 top-0 h-full w-12 bg-lime-500/40 blur-2xl"/>
              <div className="absolute right-0 top-0 h-full w-6 bg-lime-500/90 blur-md"/>
            </div>
            <div className="absolute inset-0 flex items-center animate-[plane-move_2s_ease-in-out_infinite]">
              <Airplane
                size={20} 
                weight="fill" 
                className="text-zinc-50 drop-shadow-md 
                  translate-x-[39%] rotate-90" 
              />
            </div>
          </div>

          <h3 className="text-md tracking-wider text-zinc-200">
            Criando sua viagem <span className="tracking-widest">...</span>
          </h3>
        </div>
      </div>
    </div>
  )
}

import { PokeCircular } from "@/components/circular"

interface PokeEvolution {
  name: string
  id: number
}

export interface EvolutionLevelProps {
  evolutionChain: PokeEvolution[]
  pokemonId: number
}

export function EvolutionLevel(props: EvolutionLevelProps) {
  const { evolutionChain, pokemonId } = props

  const manyEvolutions = evolutionChain.length > 2

  const canShrink = manyEvolutions
    ? "[&>*]:flex-shrink-0 justify-start"
    : "justify-center [&>*]:shrink-[0.5]"

  return (
    <div className="w-full overflow-auto">
      <div className={`flex md:flex-col gap-10 ${canShrink}`}>
        {evolutionChain.map((evolution) => (
          <PokeCircular
            key={evolution.id}
            pokemonId={evolution.id}
            pokemonName={evolution.name}
            isCurrentPokemon={pokemonId === evolution.id}
          />
        ))}
      </div>
    </div>
  )
}

import { PokeCard } from "@/components/card"
import { useQuery } from "react-query"
import { maxPokemon } from "@/utils/constants"

interface PokemonResponse {
  results: {
    name: string
    url: string
  }[]
}

function mapPokemonToCard(pokemon: any, index: number) {
  const pokemonId = index + 1

  return <PokeCard pokemonName={pokemon.name} pokemonId={pokemonId} />
}

export default function Home() {
  const { data, isLoading, isError } = useQuery<PokemonResponse>([
    "/pokemon?limit=" + maxPokemon,
  ])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8 h-full">
      {data?.results.map(mapPokemonToCard)}
    </div>
  )
}

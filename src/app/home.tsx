import { PokeCard } from "@/components/card"
import { useQuery } from "react-query"
import { maxPokemon } from "@/utils/constants"
import { useEffect, useState } from "react"

interface PokemonResponse {
  results: {
    name: string
    url: string
  }[]
}

interface HomeProps {
  term: string
}

interface Pokemon {
  id?: number
  name: string
}

function mapPokemonToCard(pokemon: Pokemon, index: number) {
  const pokemonId = pokemon.id ?? index + 1

  return (
    <PokeCard
      key={pokemonId}
      pokemonName={pokemon.name}
      pokemonId={pokemonId}
    />
  )
}

export default function Home(props: HomeProps) {
  const { term } = props

  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([])

  const { data, isLoading, isError } = useQuery<PokemonResponse>([
    "/pokemon?limit=" + maxPokemon,
  ])

  useEffect(() => {
    if (data && term) {
      const localFilteredPokemon = data.results.filter((pokemon, index) => {
        Object.assign(pokemon, { id: index + 1 })

        return pokemon.name.includes(term.toLowerCase())
      })

      setFilteredPokemon(localFilteredPokemon)
    }
  }, [data, term])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const pokemonToDisplay = term ? filteredPokemon : data?.results

  return (
    <div className="flex flex-wrap items-start justify-center gap-4 lg:gap-8 py-8 h-full">
      {pokemonToDisplay!.map(mapPokemonToCard)}
    </div>
  )
}

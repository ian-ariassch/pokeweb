import { PokeCard } from "@/components/card"
import { useQuery } from "react-query"
import { maxPokemon } from "@/utils/constants"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

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

  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([])

  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  const pokemonPerPage = 30

  const [hasMore, setHasMore] = useState(true)

  const [records, setRecords] = useState<number>(pokemonPerPage)

  const loadMore = () => {
    if (records >= Number(maxPokemon)) {
      setHasMore(false)
      return
    } else {
      setTimeout(() => {
        setRecords(records + pokemonPerPage)
      })
    }
  }

  const { data, isLoading, isError } = useQuery<PokemonResponse>([
    "/pokemon-species/?limit=" + maxPokemon,
  ])

  useEffect(() => {
    if (data) {
      if (term) {
        const localFilteredPokemon = data.results.filter((pokemon, index) => {
          Object.assign(pokemon, { id: index + 1 })

          return pokemon.name.includes(term.toLowerCase())
        })

        setPokemon(localFilteredPokemon)
      } else {
        setPokemon(data.results)
      }
    }
  }, [data, term, records])

  useEffect(() => {
    setDisplayedPokemon(pokemon.slice(0, records))
  }, [pokemon, records])

  if (isLoading) {
    return (
      <div className="flex flex-wrap items-start justify-center gap-4 lg:gap-8 py-8 h-full">
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className="w-28 lg:w-48 h-40 lg:h-64 skeleton" />
        ))}
      </div>
    )
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <InfiniteScroll
      dataLength={displayedPokemon!.length}
      hasMore={hasMore}
      next={loadMore}
      loader={<div />}
      className="flex flex-wrap items-start justify-center gap-4 lg:gap-8 py-8 h-full"
    >
      {displayedPokemon!.map(mapPokemonToCard)}
    </InfiniteScroll>
  )
}

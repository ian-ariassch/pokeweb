"use client"
import Link from "next/link"
import { useQuery } from "react-query"
import { PokeDetailsCard } from "./details-card"
import { PokeStats } from "./stats"
import { PokeEvolutionChainResponse, PokeEvolutions } from "./evolutions"
import { useEffect, useState } from "react"

interface PokeDetailsProps {
  pokemonId: number
}

interface PokeDetailsParams {
  params: PokeDetailsProps
}

interface PokeDetailsResponse {
  name: string
  sprites: {
    front_default: string
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string
            back_default: string
          }
        }
      }
    }
  }
  types: {
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
  species: {
    url: string
  }
}

interface PokeSpeciesResponse {
  evolution_chain: {
    url: string
  }
}

function Header() {
  return (
    <header className="flex items-center justify-start header bg-primary h-16 px-8 w-full">
      <h1 className="text-3xl font-bold m-0">
        <Link className="text-base-content" href="/">
          PokeWeb
        </Link>
      </h1>
    </header>
  )
}

export default function PokeDetails(props: PokeDetailsParams) {
  const { pokemonId } = props.params

  const [chainId, setChainId] = useState<string | null>(null)

  const { data, isLoading, isError } = useQuery<PokeDetailsResponse>([
    "/pokemon/" + pokemonId,
  ])

  const {
    data: speciesData,
    isLoading: speciesIsLoading,
    isError: speciesIsError,
  } = useQuery<PokeSpeciesResponse>({
    queryKey: ["/pokemon-species/" + data?.species.url.split("/")[6]],
    enabled: !!data,
  })

  const {
    data: evolutionData,
    isLoading: evolutionIsLoading,
    isError: evolutionIsError,
  } = useQuery<PokeEvolutionChainResponse>({
    queryKey: ["/evolution-chain/" + chainId],
    enabled: !!chainId,
  })

  useEffect(() => {
    if (speciesData) {
      setChainId(speciesData.evolution_chain.url.split("/")[6])
    }
  }, [speciesData])

  if (isLoading || speciesIsLoading || evolutionIsLoading || !chainId) {
    return (
      <>
        <Header />
        <div
          className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr,3fr] px-6 py-4 lg:px-16 lg:py-8
            xl:px-32 xl:py-16 h-[770px] lg:gap-8"
        >
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton lg:col-span-2"></div>
        </div>
      </>
    )
  }

  if (isError || speciesIsError || evolutionIsError) {
    return <div>Error</div>
  }

  const types = data!.types.map((type) => type.type.name)

  const name = data!.name

  const image =
    data!.sprites?.versions["generation-v"]["black-white"]?.animated
      .front_default

  const fallbackImage = data!.sprites?.front_default

  const stats = data!.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }))

  return (
    <>
      <Header />
      <main className={`px-6 py-4 lg:px-16 lg:py-8 xl:px-32 xl:py-16`}>
        <div
          id="gridContainer"
          className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr,3fr] lg:gap-8 [&>*]:rounded-xl
            [&>*]:bg-base-300"
        >
          <PokeDetailsCard
            name={name}
            image={image ?? fallbackImage}
            types={types}
          />
          <div
            id="stats"
            className="grid grid-cols-[auto_1fr_auto] justify-between items-center w-full px-4 py-2
              gap-x-4 gap-y-4 lg:gap-y-0"
          >
            {stats.map((stat) => (
              <PokeStats key={stat.name} name={stat.name} value={stat.value} />
            ))}
          </div>
          <PokeEvolutions evolutionData={evolutionData} pokemonId={pokemonId} />
        </div>
      </main>
    </>
  )
}

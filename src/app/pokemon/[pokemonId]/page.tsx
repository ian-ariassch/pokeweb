"use client"
import Link from "next/link"
import { useQuery } from "react-query"
import { PokeDetailsCard } from "./details-card"
import { PokeStats } from "./stats"
import { PokeEvolutions } from "./evolutions"

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

export default function PokeDetails(props: PokeDetailsParams) {
  const { pokemonId } = props.params

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

  if (isLoading || speciesIsLoading) {
    return (
      <>
        <header className="flex items-center justify-start header bg-accent h-16 px-8">
          <h1 className="text-3xl font-bold text-secondary m-0">
            <Link href="/">PokeWeb</Link>
          </h1>
        </header>
        <div>Loading...</div>
      </>
    )
  }

  if (isError || speciesIsError) {
    return <div>Error</div>
  }

  const chainId = speciesData?.evolution_chain.url.split("/")[6]

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
      <header className="flex items-center justify-start header bg-accent h-16 px-8 w-screen">
        <h1 className="text-3xl font-bold m-0">
          <Link className="text-base-content" href="/">
            PokeWeb
          </Link>
        </h1>
      </header>
      <main className="px-6 py-4 lg:px-16 lg:py-8 xl:px-32 xl:py-16">
        <div
          id="gridContainer"
          className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr,3fr] lg:gap-8 [&>*]:rounded-xl"
        >
          <PokeDetailsCard
            name={name}
            image={image ?? fallbackImage}
            types={types}
          />
          <div
            id="stats"
            className="bg-base-300 grid grid-cols-[auto_1fr_auto] justify-between items-center w-full
              px-4 py-2 gap-x-4 gap-y-4 lg:gap-y-0"
          >
            {stats.map((stat) => (
              <PokeStats key={stat.name} name={stat.name} value={stat.value} />
            ))}
          </div>
          <PokeEvolutions chainId={chainId} />
        </div>
      </main>
    </>
  )
}

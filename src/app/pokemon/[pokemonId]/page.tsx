"use client"
import Image from "next/image"
import { useQuery } from "react-query"

interface PokeDetailsProps {
  pokemonId: number
}

interface PokeDetailsParams {
  params: PokeDetailsProps
}

interface PokeDetailsResponse {
  name: string
  sprites: {
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string
          }
        }
      }
    }
  }
}

export default function PokeDetails(props: PokeDetailsParams) {
  const { pokemonId } = props.params

  const { data, isLoading, isError } = useQuery<PokeDetailsResponse>([
    "/pokemon/" + pokemonId,
  ])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <>
      <header className="flex items-center justify-center header bg-accent h-16 px-8" />
      <div>
        <h1>Pokemon Details</h1>
        <p>{data!.name}</p>
        <Image
          src={
            data!.sprites.versions["generation-v"]["black-white"].animated
              .front_default
          }
          alt={data!.name}
          width={200}
          height={200}
        />
      </div>
    </>
  )
}

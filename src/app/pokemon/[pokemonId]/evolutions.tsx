import { useQuery } from "react-query"
import { Fade } from "react-awesome-reveal"
import { PokeCircular } from "@/components/circular"

interface PokeEvolutionsProps {
  chainId: string | undefined
  pokemonId: number
}

interface PokeEvolutionChainResponse {
  chain: object
}

const extractNamesFromChain = (chain: any) => {
  const evolutionChain: any[] = []

  while (chain) {
    evolutionChain.push({
      name: chain.species.name,
      id: chain.species.url.split("/")[6],
    })

    chain = chain.evolves_to[0]
  }

  return evolutionChain
}

export function PokeEvolutions(props: PokeEvolutionsProps) {
  const { chainId, pokemonId } = props

  const {
    data: evolutionData,
    isLoading: evolutionIsLoading,
    isError: evolutionIsError,
  } = useQuery<PokeEvolutionChainResponse>({
    queryKey: ["/evolution-chain/" + chainId],
    enabled: !!chainId,
  })

  if (evolutionIsLoading) {
    return <div>Loading...</div>
  }

  if (evolutionIsError) {
    return <div>Error</div>
  }

  const chain = evolutionData?.chain

  const evolutionChains = extractNamesFromChain(chain)

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 lg:gap-32
        xl:gap-64 lg:col-span-2 px-4 py-2"
    >
      <Fade direction="left" triggerOnce cascade damping={0.2} className="">
        {evolutionChains.map((evolutionChain, index) => (
          <PokeCircular
            key={index}
            pokemonName={evolutionChain.name}
            pokemonId={evolutionChain.id}
            isCurrentPokemon={pokemonId === evolutionChain.id}
          />
        ))}
      </Fade>
    </div>
  )
}

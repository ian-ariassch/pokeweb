import { useQuery } from "react-query"
import Image from "next/image"

interface PokeEvolutionsProps {
  chainId: string | undefined
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
  const { chainId } = props

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

  console.log(chain)

  const evolutionChains = extractNamesFromChain(chain)

  const evolutionImages = evolutionChains.map((evolutionChain) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.id}.png`
  })

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {evolutionChains.map((evolutionChain, index) => (
        <div key={index} className="flex items-center justify-center gap-4">
          <span>{evolutionChain.name}</span>
          <Image
            src={evolutionImages[index]}
            alt={evolutionChain.name}
            width={100}
            height={100}
          />
          <span>{">"}</span>
        </div>
      ))}
    </div>
  )
}

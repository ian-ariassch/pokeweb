import { Fade } from "react-awesome-reveal"
import { EvolutionLevel } from "./evolution-level"

interface PokeEvolutionsProps {
  evolutionData: PokeEvolutionChainResponse | undefined
  pokemonId: number
}

export interface PokeEvolutionChainResponse {
  chain: object
}

const extractNamesFromChain = (chain: any) => {
  const evolutionTree: any[] = []

  let treeDepth = 0

  const traverse = (chain: any) => {
    evolutionTree.push({
      name: chain.species.name,
      id: chain.species.url.split("/")[6],
      depth: treeDepth,
    })

    if (chain.evolves_to.length > 0) {
      treeDepth += 1

      chain.evolves_to.forEach((evolution: any) => {
        traverse(evolution)
      })
    }
  }

  traverse(chain)

  return evolutionTree
}

const convertTreeToLevelsArray = (tree: any) => {
  const evolutionLevelsArray: any[] = []

  tree.forEach((evolution: any) => {
    const { depth } = evolution

    if (!evolutionLevelsArray[depth]) {
      evolutionLevelsArray[depth] = []
    }

    delete evolution.depth

    evolutionLevelsArray[depth].push(evolution)
  })

  return evolutionLevelsArray
}

export function PokeEvolutions(props: PokeEvolutionsProps) {
  const { evolutionData, pokemonId } = props

  const chain = evolutionData?.chain

  const evolutionChains = extractNamesFromChain(chain)

  const evolutionLevelsArray = convertTreeToLevelsArray(evolutionChains)

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 lg:gap-32
        xl:gap-64 lg:col-span-2 px-4 py-2 w-full"
    >
      <Fade
        direction="left"
        triggerOnce
        cascade
        damping={0.2}
        className="w-full"
      >
        {evolutionLevelsArray.map((evolutionChain, index) => (
          <EvolutionLevel
            key={index}
            evolutionChain={evolutionChain}
            pokemonId={pokemonId}
          />
        ))}
      </Fade>
    </div>
  )
}

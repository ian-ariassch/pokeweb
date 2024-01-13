import { useTheme } from "@/hooks/use-theme"
import { humanizeName } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import { useMedia } from "react-use"

interface PokeCircularProps {
  pokemonId: number
  pokemonName: string
  isCurrentPokemon?: boolean
}

export function PokeCircular(props: PokeCircularProps) {
  const { pokemonId, pokemonName, isCurrentPokemon } = props

  const { screens } = useTheme()

  const isSmWidth = useMedia(`(min-width: ${screens.sm})`)

  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

  const backgroundColor = isCurrentPokemon ? "bg-accent" : "bg-base-400"

  const hasHoverEffect = isCurrentPokemon
    ? ""
    : "group hover:scale-90 transition-all duration-200 ease-in-out hover:bg-base-200"

  const ContainerComponent = isCurrentPokemon ? "div" : Link

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-6">
      <ContainerComponent
        href={`/pokemon/${pokemonId}`}
        className={`rounded-full ${backgroundColor} flex items-center justify-center p-2
          ${hasHoverEffect}`}
      >
        <div
          className="rounded-full bg-base-400 flex items-center justify-center p-2
            group-hover:bg-base-200 transition-all duration-200 ease-in-out"
        >
          <div
            className={`rounded-full bg-base-300 flex items-center justify-center p-2
              group-hover:bg-base-400 transition-all duration-200 ease-in-out`}
          >
            <div
              className="rounded-full bg-base-200 flex items-center justify-center
                group-hover:bg-base-400 transition-all duration-200 ease-in-out"
            >
              {isSmWidth ? (
                <Image
                  src={pokemonImage}
                  alt={pokemonName}
                  width={200}
                  height={200}
                />
              ) : (
                <Image
                  src={pokemonImage}
                  alt={pokemonName}
                  width={150}
                  height={150}
                />
              )}
            </div>
          </div>
        </div>
      </ContainerComponent>

      <span className="text-lg lg:text-2xl font-bold">
        {humanizeName(pokemonName)}
      </span>
    </div>
  )
}

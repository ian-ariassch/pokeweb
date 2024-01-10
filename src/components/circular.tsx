import { useTheme } from "@/hooks/use-theme"
import { humanizeName } from "@/utils"
import Image from "next/image"
import { useMedia } from "react-use"

interface PokeCircularProps {
  pokemonId: number
  pokemonName: string
}

export function PokeCircular(props: PokeCircularProps) {
  const { pokemonId, pokemonName } = props

  const { screens } = useTheme()

  const isSmWidth = useMedia(`(min-width: ${screens.sm})`)

  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

  return (
    <div className="flex flex-col items-center justify-center">
      {isSmWidth ? (
        <Image src={pokemonImage} alt={pokemonName} width={200} height={200} />
      ) : (
        <Image src={pokemonImage} alt={pokemonName} width={150} height={150} />
      )}
      <span className="text-lg lg:text-2xl font-bold">
        {humanizeName(pokemonName)}
      </span>
    </div>
  )
}

import { useTheme } from "@/hooks/use-theme"
import { firstUppercase } from "@/utils"
import { specialPokemonNames } from "@/utils/constants"
import Image from "next/image"
import Link from "next/link"

interface CardProps {
  pokemonName: string
  pokemonId: number
  onClick?: () => void
}

export function PokeCard(props: CardProps) {
  const { pokemonId, pokemonName, onClick } = props

  const theme = useTheme()

  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

  const backgroundColor = theme === "dark" ? "bg-base-300" : "bg-base-200"

  const parsedPokemonName = specialPokemonNames[pokemonName] || pokemonName

  return (
    <Link href={`/pokemon/${pokemonId}`}>
      <div
        className={`card card-compact w-48 shadow-xl rounded-xl overflow-hidden ${backgroundColor}
          hover:scale-95 transition-all duration-200 ease-in-out hover:bg-base-400`}
        onClick={onClick}
      >
        <figure>
          <Image
            sizes="100vw"
            src={pokemonImage}
            alt={pokemonName}
            style={{
              width: "100%",
              height: "auto",
            }}
            width={1}
            height={1}
          ></Image>
        </figure>
        <div className="card-body bg-primary">
          <h2 className="card-title justify-center">
            {firstUppercase(parsedPokemonName)}
          </h2>
        </div>
      </div>
    </Link>
  )
}

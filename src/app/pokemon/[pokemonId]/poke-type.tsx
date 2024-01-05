interface PokeTypeProps {
  type: string
}

export function PokeType(props: PokeTypeProps) {
  const { type } = props

  const pokemonTypeBgColors: Record<string, string> = {
    bug: "bg-bug",
    dark: "bg-dark",
    dragon: "bg-dragon",
    electric: "bg-electric",
    fairy: "bg-fairy",
    fighting: "bg-fighting",
    fire: "bg-fire",
    flying: "bg-flying",
    ghost: "bg-ghost",
    grass: "bg-grass",
    ground: "bg-ground",
    ice: "bg-ice",
    normal: "bg-normal",
    poison: "bg-poison",
    psychic: "bg-psychic",
    rock: "bg-rock",
    steel: "bg-steel",
    water: "bg-water",
  }

  return (
    <div
      className={`flex justify-center w-full px-4 py-1 rounded-lg ${pokemonTypeBgColors[type]}`}
    >
      <span className="text-gray-900 text-lg font-semibold">
        {type.toUpperCase()}
      </span>
    </div>
  )
}

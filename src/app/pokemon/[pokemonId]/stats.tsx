import { ProgressBar } from "@/components/progress-bar"

interface PokeStatsProps {
  name: string
  value: number
}

const pokemonStatsNames: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
}

const pokemonStatsColors: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-yellow-500",
  defense: "bg-green-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-indigo-500",
  speed: "bg-purple-500",
}

export function PokeStats(props: PokeStatsProps) {
  const { name, value } = props

  const displayName = pokemonStatsNames[name]

  const displayColor = pokemonStatsColors[name]

  return (
    <>
      <span className="text-base-content text-lg font-semibold text-center">
        {displayName}
      </span>
      <ProgressBar value={value} max={255} color={displayColor} />
      <span className="text-base-content text-lg font-semibold text-center">
        {value}
      </span>
    </>
  )
}

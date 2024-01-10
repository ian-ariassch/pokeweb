import { specialPokemonNames } from "./constants"

export function firstUppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function humanizeName(name: string) {
  const pokemonName = specialPokemonNames[name] || name

  return firstUppercase(pokemonName)
}

import Image from "next/image"
import { PokeType } from "./poke-type"
import { humanizeName } from "@/utils"

interface PokeDetailsCardProps {
  name: string
  types: string[]
  image: string
}

export function PokeDetailsCard(props: PokeDetailsCardProps) {
  const { name, types, image } = props

  const isDualType = types.length > 1

  const amountOfColumns = isDualType ? "grid-cols-2" : "grid-cols-1"

  return (
    <div
      id="photoAndTypes"
      className="flex flex-col items-center justify-between gap-8 h-fit py-6"
    >
      <div id="nameContainer" className="flex flex-col items-center h-fit">
        <span className="text-3xl font-bold text-base-content">
          {humanizeName(name)}
        </span>
      </div>
      <div id="imageContainer" className="relative h-fit px-8">
        <Image src={image} alt={name} width={200} height={200} />
      </div>
      <div
        id="typesContainer"
        className={`h-fit grid ${amountOfColumns} gap-2 w-full px-4`}
      >
        {types.map((type) => (
          <PokeType key={type} type={type} />
        ))}
      </div>
    </div>
  )
}

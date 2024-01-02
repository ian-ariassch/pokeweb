interface SearchBarProps {
  onSearchChange: (e: any) => void
}

interface HeaderProps {
  onSearchChange: (e: any) => void
}

function SearchBar(props: SearchBarProps) {
  const { onSearchChange } = props

  return (
    <div className="flex flex-col justify-center input bg-white rounded-xl text-neutral-800 w-full">
      <input type="text" onChange={onSearchChange} />
    </div>
  )
}

export function Header(props: HeaderProps) {
  const { onSearchChange } = props

  return (
    <header className="flex items-center justify-center header bg-primary h-20 px-10">
      <SearchBar onSearchChange={onSearchChange} />
    </header>
  )
}

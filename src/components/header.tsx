interface HeaderProps {
  onSearchChange: (e: any) => void
}
export function Header(props: HeaderProps) {
  const { onSearchChange } = props

  return (
    <header className="flex items-center justify-center header bg-primary h-20 px-8">
      <input
        type="text"
        placeholder="Search for a pokemon..."
        className="input input-bordered w-full bg-base-300"
        onChange={onSearchChange}
      />
    </header>
  )
}

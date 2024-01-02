"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./home"
import { Header } from "@/components/header"
import { useState } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      queryFn: async ({ queryKey: [url] }) => {
        try {
          const data = await fetch(`https://pokeapi.co/api/v2${url}`).then(
            (res) => res.json()
          )

          return data
        } catch (err) {
          console.log(err)
        }
      },
    },
  },
})

export default function App() {
  const [term, setTerm] = useState("")

  function onSearchBarChange(e: any) {
    console.log(e.target.value)

    setTerm(e.target.value)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header onSearchChange={onSearchBarChange} />
      <main>
        <Home term={term} />
      </main>
    </QueryClientProvider>
  )
}

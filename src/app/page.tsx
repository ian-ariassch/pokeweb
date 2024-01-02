"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./home"

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
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Home />
      </main>
    </QueryClientProvider>
  )
}

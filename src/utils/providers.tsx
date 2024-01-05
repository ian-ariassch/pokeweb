"use client"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      queryFn: async ({ queryKey: [url] }) => {
        try {
          const data = await fetch(`https://pokeapi.co/api/v2${url}`).then(
            (res) => res.json(),
          )

          return data
        } catch (err) {
          console.log(err)
        }
      },
    },
  },
})

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers(props: ProvidersProps) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

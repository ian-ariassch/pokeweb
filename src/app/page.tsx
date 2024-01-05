"use client"
import Home from "./home"
import { Header } from "@/components/header"
import { useState } from "react"

export default function App() {
  const [term, setTerm] = useState("")

  function onSearchBarChange(e: any) {
    setTerm(e.target.value)
  }

  return (
    <>
      <Header onSearchChange={onSearchBarChange} />
      <main>
        <Home term={term} />
      </main>
    </>
  )
}

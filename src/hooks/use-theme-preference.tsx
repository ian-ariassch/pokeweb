import { useEffect, useState } from "react"

export function useThemePreference() {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches

  const [theme, setTheme] = useState<"dark" | "light">(
    isDarkTheme ? "dark" : "light",
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return theme
}

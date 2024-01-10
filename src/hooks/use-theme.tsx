import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../tailwind.config"

export function useTheme() {
  const fullConfig = resolveConfig(tailwindConfig)

  return fullConfig.theme
}

import { CSSProperties } from "react"

interface ProgressBarProps {
  value: number
  max: number
  color?: string
}

export function ProgressBar(props: ProgressBarProps) {
  const { value, max, color } = props
  const percentage = (value * 100) / max
  const progressColor = color ? color : "bg-primary"
  return (
    <div className="relative w-full h-2 bg-base-200 rounded-full">
      <div
        className={`absolute top-0 left-0 h-2 rounded-full ${progressColor} animate-width-from-zero`}
        style={{ "--progress": `${percentage}%` } as CSSProperties}
      ></div>
    </div>
  )
}

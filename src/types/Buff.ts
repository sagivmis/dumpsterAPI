export interface Buff {
  name: string
  timeStart: number
  timeEnd: number
  description: string[]
  duration: number //in seconds
  onStart?: () => void
  onEnd?: () => void
  effect: () => void
}

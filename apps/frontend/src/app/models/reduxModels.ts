export interface Player {
  status: null | 'loading' | 'idle',
  id: string | null,
  playerName: string | null,
  points: number | null,
  error?: string
}

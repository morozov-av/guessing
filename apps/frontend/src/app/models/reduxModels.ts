export interface Player {
  status: null | 'loading' | 'idle',
  id: string | null,
  playerName: string | null,
  points: number | null
}

export interface PlayerState {
  currentPlayer: Player,
  allPlayers: {
    status: null | 'loading' | 'idle',
    players: Player[]
  }
}

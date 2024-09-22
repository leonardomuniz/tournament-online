import type { TournamentDto } from './tournamentDto'

export interface MatchsDto {
	id: string
	round: number
	tournamentId: string
	tournament?: TournamentDto
	matchs: Match[]
	createdAt?: Date
	updateAt?: Date
}

export interface Match {
	player: number
	challenger: number
	winner: number | null
}

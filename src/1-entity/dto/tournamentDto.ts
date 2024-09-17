import type { UserDto } from './userDto'

export interface TournamentDto {
	name: string
	id: string
	players: PlayerDto[]
	matchs: MatchsDto[]
	rounds: number
	owner: UserDto
	dateAndHour: Date
	createdAt?: Date
	updateAt?: Date
}

export interface PlayerDto {
	id: number
	name: string
	victory: number
	lose: number
	draw: number
	drop: boolean
}

export interface MatchsDto {
	round: number
	matchs: Match[]
}

interface Match {
	player: number
	challenger: number
	winner: number | null
}

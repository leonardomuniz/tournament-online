import type { UserDto } from './userDto'

export interface TournamentDto {
	name: string
	id: string
	players: UserDto[]
	matchs: MatchsDto[]
	rounds: number
	owner: UserDto
	active: boolean
	dateAndHour: Date
	createdAt?: Date
	updateAt?: Date
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

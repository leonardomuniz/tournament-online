import type { UserDto } from './userDto'

export interface TournamentDto {
	id: string
	name: string
	players: UserDto[]
	matchs?: MatchsDto[]
	rounds: number
	active: boolean
	ownerId: string
	owner?: UserDto
	dateAndHour: Date
	createdAt?: Date
	updateAt?: Date
}

export interface MatchsDto {
	id: string
	round: number
	tournament: TournamentDto
	matchs: Match[]
	createdAt?: Date
	updateAt?: Date
}

export interface Match {
	player: number
	challenger: number
	winner: number | null
}

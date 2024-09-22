import type { MatchsDto } from './matchsDto'
import type { UserDto } from './userDto'

export interface TournamentDto {
	id: string
	name: string
	players?: Players[]
	matchs?: MatchsDto[]
	rounds: number
	active: boolean
	ownerId: string
	owner?: UserDto
	dateAndHour: Date
	createdAt?: Date
	updateAt?: Date
}

export interface Players {
	player: UserDto
	confirmed: boolean
}

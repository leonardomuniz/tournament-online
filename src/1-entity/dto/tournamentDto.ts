import type { MatchsDto } from './matchDto'
import type { UserDto } from './userDto'

export interface TournamentDto {
	id: string
	name: string
	players: TournamentPlayers[]
	matchs: MatchsDto[]
	rounds: number
	active: boolean
	ownerId: string
	owner?: UserDto
	dateAndHour: Date
	createdAt?: Date
	updateAt?: Date
}

export interface TournamentPlayers {
	player: Player
	confirmed: boolean
}

interface Player {
	id?: string
	name: string
}

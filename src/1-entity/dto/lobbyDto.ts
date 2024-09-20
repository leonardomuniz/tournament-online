import type { TournamentDto } from './tournamentDto'
import type { UserDto } from './userDto'

export interface LobbyDto {
	players?: UserDto[]
	tournamentId: string
	tournament?: TournamentDto
	createdAt?: Date
	updateAt?: Date
}

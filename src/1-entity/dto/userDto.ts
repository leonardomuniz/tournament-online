import type { TournamentDto } from './tournamentDto'

export interface UserDto {
	id?: string
	name: string
	email: string
	password: string
	tournaments?: TournamentDto[]
	createdAt?: Date
	updateAt?: Date
}

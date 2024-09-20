import type { TournamentDto } from '../dto/tournamentDto'

export interface iTournamentInterface {
	create(input: TournamentDto): Promise<TournamentDto>
	findAll(): Promise<TournamentDto[]>
	findOne(tournamentId: string | null): Promise<TournamentDto | null>
	update(tournamentId: string, input: TournamentDto): Promise<boolean>
	delete(tournamentId: string): Promise<boolean>
}

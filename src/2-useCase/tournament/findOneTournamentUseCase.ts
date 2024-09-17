import type { TournamentDto } from '../../1-entity/dto/tournamentDto'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'

export class findOneTournamentUseCase {
	constructor(private tournamentServoce: iTournamentInterface) {}

	async run(tournamentId: string): Promise<TournamentDto | null> {
		console.log('START findOneTournamentUseCase ::', tournamentId)
		try {
			const response = await this.tournamentServoce.findOne(tournamentId)
			console.log('findOneTournamentUseCase :: findOne ::', response)

			console.log('FINISH findOneTournamentUseCase')
			return response
		} catch (error) {
			console.log('findOneTournamentUseCase :: error ::', error)

			throw error
		}
	}
}

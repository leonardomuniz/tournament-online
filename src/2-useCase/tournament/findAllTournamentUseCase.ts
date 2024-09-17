import type { TournamentDto } from '../../1-entity/dto/tournamentDto'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'

export class findAllTournamentUseCase {
	constructor(private tournamentService: iTournamentInterface) {}

	async run(): Promise<TournamentDto[]> {
		console.log('START findAllTournamentUseCase')
		try {
			const response = await this.tournamentService.findAll()
			console.log('findAllTournamentUseCase :: findAll ::', response)

			console.log('FINISH findAllTournamentUseCase')
			return response
		} catch (error) {
			console.log('findAllTournamentUseCase :: error ::', error)

			throw error
		}
	}
}

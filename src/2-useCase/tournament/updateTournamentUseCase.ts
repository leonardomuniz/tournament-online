import type { TournamentDto } from '../../1-entity/dto/tournamentDto'
import { tournamentNotFound } from '../../1-entity/errors/tournament'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'

export class UpdateTournamentUseCase {
	constructor(private tournamentService: iTournamentInterface) {}

	async run(tournamentId: string, input: TournamentDto): Promise<boolean> {
		console.log('START UpdateTournamentUseCase ::', input)

		try {
			const tournamentExist = await this.tournamentService.findOne(tournamentId)
			console.log('UpdateTournamentUseCase :: findOne ::', tournamentExist)

			if (!tournamentExist) {
				console.log('UpdateTournamentUseCase :: error ::', tournamentNotFound)

				throw tournamentNotFound.message
			}

			const response = await this.tournamentService.update(tournamentId, input)
			console.log('UpdateTournamentUseCase :: update ::', response)

			console.log('FINISH UpdateTournamentUseCase')
			return true
		} catch (error) {
			console.log('UpdateTournamentUseCase :: error ::', error)

			throw error
		}
	}
}

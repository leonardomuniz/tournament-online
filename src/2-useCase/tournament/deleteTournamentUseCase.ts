import { tournamentNotFound } from '../../1-entity/errors/tournament'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'

export class deleteTournamentUseCase {
	constructor(private tournamentService: iTournamentInterface) {}

	async run(userId: string): Promise<boolean> {
		console.log('START deleteTournamentUseCase ::', userId)

		try {
			const torunamentExist = await this.tournamentService.findOne(userId)
			console.log('deleteTournamentUseCase :: findOne ::', torunamentExist)

			if (!torunamentExist) {
				console.log('deleteTournamentUseCase :: error ::', tournamentNotFound)

				throw tournamentNotFound.message
			}

			const response = await this.tournamentService.delete(userId)
			console.log('deleteTournamentUseCase :: delete ::', response)

			console.log('FINISH deleteTournamentUseCase')
			return true
		} catch (error) {
			console.log('deleteTournamentUseCase :: error ::', error)

			throw error
		}
	}
}

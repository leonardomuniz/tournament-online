import { tournamentNotFound } from '../../1-entity/errors/tournament'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'

export class deleteTournamentUseCase {
	constructor(private tournamentService: iTournamentInterface) {}

	async run(tournamentId: string): Promise<boolean> {
		console.log('START deleteTournamentUseCase ::', tournamentId)

		try {
			await this.checkIfTournamentNotExist(tournamentId)

			const response = await this.tournamentService.delete(tournamentId)
			console.log('deleteTournamentUseCase :: delete ::', response)

			console.log('FINISH deleteTournamentUseCase')
			return true
		} catch (error) {
			console.log('deleteTournamentUseCase :: error ::', error)

			throw error
		}
	}

	private async checkIfTournamentNotExist(tournamentId: string): Promise<boolean> {
		const torunamentExist = await this.tournamentService.findOne(tournamentId)
		console.log('deleteTournamentUseCase :: findOne ::', torunamentExist)

		if (!torunamentExist) {
			console.log('deleteTournamentUseCase :: error ::', tournamentNotFound)

			throw tournamentNotFound.message
		}

		return true
	}
}

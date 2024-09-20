import type { MatchsDto } from '../../../1-entity/dto/tournamentDto'
import { tournamentNotFound } from '../../../1-entity/errors/tournament'
import type { iMatchInterface } from '../../../1-entity/interfaces/iMatchService'
import type { iTournamentInterface } from '../../../1-entity/interfaces/iTournamentService'

export class CreateMatchUseCase {
	constructor(
		private tournamentService: iTournamentInterface,
		private matchService: iMatchInterface
	) {}

	async run(input: MatchsDto): Promise<boolean> {
		console.log('START CreateMatchUseCase ::', input)

		try {
			await this.validateTournament(input)

			const response = await this.matchService.create(input)
			console.log('CreateMatchUseCase :: create ::', response)

			console.log('FINISH CreateMatchUseCase')
			return true
		} catch (error) {
			console.log('CreateMatchUseCase :: error ::', error)

			throw error
		}
	}

	private async validateTournament(input: MatchsDto): Promise<void> {
		const tournamentExist = await this.tournamentService.findOne(input.id)
		console.log('CreateMatchUseCase :: find tournament ::', tournamentExist)

		if (!tournamentExist) {
			console.log('CreateMatchUseCase :: error ::', tournamentNotFound)

			throw tournamentNotFound.message
		}
	}
}

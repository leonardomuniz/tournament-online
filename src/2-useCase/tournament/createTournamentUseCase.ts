import type { TournamentDto } from '../../1-entity/dto/tournamentDto'
import { incorretNumberOfRounds, ownerNotFound } from '../../1-entity/errors/tournament'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class CreateTournamentUseCase {
	constructor(
		private tournamentService: iTournamentInterface,
		private userService: iUserInterface
	) {}

	async run(input: TournamentDto): Promise<boolean> {
		console.log('START CreateTournamentUseCase ::', input)

		try {
			const haveOwner = input.id ? input.id : null
			const userExist = await this.userService.findOne(haveOwner)
			console.log('CreateTournamentUseCase :: find owner ::', userExist)

			if (!userExist) {
				console.log('CreateTournamentUseCase :: error ::', ownerNotFound.message)

				throw ownerNotFound.message
			}

			if (input.rounds < 3 || input.rounds > 5) {
				console.log('CreateTournamentUseCase :: error ::', incorretNumberOfRounds)

				throw incorretNumberOfRounds.message
			}

			const response = await this.tournamentService.create({
				...input,
				owner: userExist,
				active: false
			})
			console.log('CreateTournamentUseCase :: create ::', response)

			console.log('FINISH CreateTournamentUseCase')
			return true
		} catch (error) {
			console.log('CreateTournamentUseCase :: error ::', error)

			throw error
		}
	}
}

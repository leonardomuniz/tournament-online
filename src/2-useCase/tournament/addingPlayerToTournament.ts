import { tournamentNotFound } from '../../1-entity/errors/tournament'
import { userNotFound } from '../../1-entity/errors/user'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class AddingPlayerToTournament {
	constructor(
		private tournamentService: iTournamentInterface,
		private userService: iUserInterface
	) {}

	async run(tournamentId: string, userId: string): Promise<boolean> {
		console.log('START AddingPlayerToTournament ::', tournamentId, userId)

		try {
			const tournamentExist = await this.tournamentService.findOne(tournamentId)
			console.log('AddingPlayerToTournament :: tournamentService :: findOne ::', tournamentExist)

			if (!tournamentExist) {
				console.log('AddingPlayerToTournament :: error ::', tournamentNotFound)

				throw tournamentNotFound.message
			}

			const userExist = await this.userService.findOne(userId)
			console.log('AddingPlayerToTournament :: userService :: findOne ::', userExist)

			if (!userExist) {
				console.log('AddingPlayerToTournament :: error ::', userNotFound)

				throw userNotFound.message
			}

			console.log('FINISH AddingPlayerToTournament')
			return true
		} catch (error) {
			console.log('AddingPlayerToTournament :: error ::', error)

			throw error
		}
	}
}

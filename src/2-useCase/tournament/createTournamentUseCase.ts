import type { TournamentDto } from '../../1-entity/dto/tournamentDto'
import type { UserDto } from '../../1-entity/dto/userDto'
import { incorretNumberOfRounds, ownerNotFound, tournamentNeedsOwner } from '../../1-entity/errors/tournament'
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
			const ownerInfo = await this.tournamentIsValid(input)

			const response = await this.tournamentService.create({
				...input,
				owner: ownerInfo,
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

	private async tournamentIsValid(input: TournamentDto): Promise<UserDto | undefined> {
		if (!input) {
			console.log('CreateTournamentUseCase :: error ::', tournamentNeedsOwner)

			throw tournamentNeedsOwner.message
		}

		const ownerFound = await this.userService.findOne(input.ownerId)
		console.log('CreateTournamentUseCase :: find owner ::', ownerFound)

		if (!ownerFound) {
			console.log('CreateTournamentUseCase :: error ::', ownerNotFound)

			throw ownerNotFound.message
		}

		if (input.rounds < 3 || input.rounds > 5) {
			console.log('CreateTournamentUseCase :: error ::', incorretNumberOfRounds)

			throw incorretNumberOfRounds.message
		}

		return ownerFound
	}
}

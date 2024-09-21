import type { TournamentDto } from '../../1-entity/dto/tournamentDto'
import { incorretNumberOfRounds, ownerNotFound, tournamentNeedsOwner } from '../../1-entity/errors/tournament'
import type { iLobbyInterface } from '../../1-entity/interfaces/iLobbyService'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class CreateTournamentUseCase {
	constructor(
		private tournamentService: iTournamentInterface,
		private userService: iUserInterface,
		private lobbyService: iLobbyInterface
	) {}

	async run(input: TournamentDto): Promise<boolean> {
		console.log('START CreateTournamentUseCase ::', input)

		try {
			await this.validateTournament(input)

			const tournamentResponse = await this.createTournament(input, false)

			await this.createLobby(tournamentResponse.id)

			console.log('FINISH CreateTournamentUseCase')
			return true
		} catch (error) {
			console.log('CreateTournamentUseCase :: error ::', error)

			throw error
		}
	}

	private async validateTournament(input: TournamentDto): Promise<boolean> {
		console.log('CreateTournamentUseCase :: validateTournament ::', input)

		const owner: string = input.ownerId
		if (!owner) {
			console.log('CreateTournamentUseCase :: error ::', tournamentNeedsOwner)

			throw tournamentNeedsOwner.message
		}

		const ownerFound = await this.userService.findOne(owner)
		console.log('CreateTournamentUseCase :: userService :: find owner ::', ownerFound)

		if (!ownerFound) {
			console.log('CreateTournamentUseCase :: error ::', ownerNotFound)

			throw ownerNotFound.message
		}

		if (input.rounds < 3 || input.rounds > 5) {
			console.log('CreateTournamentUseCase :: error ::', incorretNumberOfRounds)

			throw incorretNumberOfRounds.message
		}

		return true
	}

	private async createTournament(input: TournamentDto, active: boolean): Promise<TournamentDto> {
		const tournamentCreateResponse = await this.tournamentService.create({ ...input, active })
		console.log('CreateTournamentUseCase :: create ::', tournamentCreateResponse)

		return tournamentCreateResponse
	}

	private async createLobby(tournamentId: string): Promise<void> {
		const lobbyCreateResponse = await this.lobbyService.create({
			players: [],
			tournamentId: tournamentId
		})
		console.log('CreateTournamentUseCase :: lobbyService :: create ::', lobbyCreateResponse)
	}
}

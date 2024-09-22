import type { TournamentDto, TournamentPlayers } from '../../1-entity/dto/tournamentDto'
import type { UserDto } from '../../1-entity/dto/userDto'
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
			const tournament = await this.verifyTournament(tournamentId)
			const player = await this.verifyPlayer(userId)

			const normalizedData = await this.normalizedPlayersList(tournament, player)
			console.log('AddingPlayerToTournament :: normalizedPlayersList :: response ::', normalizedData)

			await this.tournamentService.update(tournamentId, normalizedData)
			console.log('FINISH AddingPlayerToTournament')
			return true
		} catch (error) {
			console.log('AddingPlayerToTournament :: error ::', error)

			throw error
		}
	}

	private async verifyTournament(tournamentId: string): Promise<TournamentDto> {
		const tournamentExist = await this.tournamentService.findOne(tournamentId)
		console.log('AddingPlayerToTournament :: tournamentService :: findOne ::', tournamentExist)

		if (!tournamentExist) {
			console.log('AddingPlayerToTournament :: error ::', tournamentNotFound)

			throw tournamentNotFound.message
		}

		return tournamentExist
	}

	private async verifyPlayer(userId: string): Promise<UserDto> {
		const userExist = await this.userService.findOne(userId)

		if (!userExist) {
			console.log('AddingPlayerToTournament :: error ::', userNotFound)

			throw userNotFound.message
		}

		return userExist
	}

	private normalizedPlayersList(tournamentInput: TournamentDto, playerInput: UserDto): TournamentDto {
		console.log('AddingPlayerToTournament :: normalizedPlayersList :: input ::', { tournamentInput, playerInput })
		const { id, name } = playerInput

		const playersList = tournamentInput.players
		const newPlayer: TournamentPlayers = {
			player: { id, name },
			confirmed: false
		}

		console.log('AddingPlayerToTournament :: normalizedPlayersList :: player ::', newPlayer)

		return {
			...tournamentInput,
			players: playersList ? [...playersList, newPlayer] : [newPlayer]
		}
	}
}

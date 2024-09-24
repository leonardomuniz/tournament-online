import type { TournamentDto } from '../../../1-entity/dto/tournamentDto'
import type { UserDto } from '../../../1-entity/dto/userDto'
import { tournamentNotFound } from '../../../1-entity/errors/tournament'
import { userNotFound } from '../../../1-entity/errors/user'
import type { iTournamentInterface } from '../../../1-entity/interfaces/iTournamentService'
import type { iUserInterface } from '../../../1-entity/interfaces/iUserService'

export class RemovePlayerFromTournamentUseCase {
	constructor(
		private tournamentService: iTournamentInterface,
		private userService: iUserInterface
	) {}

	async run(tournamentId: string, userId: string): Promise<boolean> {
		console.log('START RemovePlayerFromTournamentUseCase ::', { tournamentId, userId })

		try {
			const player = await this.getPlayerInfo(userId)
			const tournament = await this.getTournamentInfo(tournamentId)
			const playerIndex = this.checkIfPlayerIsInTheTournament(userId, tournament)

			const normalizedData = this.normalizedPlayersList(tournament, playerIndex)
			console.log('RemovePlayerFromTournamentUseCase :: normalizedPlayersList :: response ::', normalizedData)

			await this.tournamentService.update(tournamentId, normalizedData)
			console.log('FINISH RemovePlayerFromTournamentUseCase')
			return true
		} catch (error) {
			console.log('RemovePlayerFromTournamentUseCase :: error ::', error)

			throw error
		}
	}

	private async getPlayerInfo(userId: string): Promise<UserDto> {
		const userExist = await this.userService.findOne(userId)

		if (!userExist) {
			console.log('RemovePlayerFromTournamentUseCase :: error ::', userNotFound)

			throw userNotFound.message
		}

		return userExist
	}

	private async getTournamentInfo(tournamentId: string): Promise<TournamentDto> {
		const tournamentExist = await this.tournamentService.findOne(tournamentId)
		console.log('RemovePlayerFromTournamentUseCase :: tournamentService :: findOne ::', tournamentExist)

		if (!tournamentExist) {
			console.log('RemovePlayerFromTournamentUseCase :: error ::', tournamentNotFound)

			throw tournamentNotFound.message
		}

		return tournamentExist
	}

	private normalizedPlayersList(tournament: TournamentDto, playerIndex: number): TournamentDto {
		console.log('RemovePlayerFromTournamentUseCase :: normalizedPlayersList :: input ::', { tournament, playerIndex })

		const playerRemoved = tournament.players.splice(playerIndex, 1)
		console.log('RemovePlayerFromTournamentUseCase :: remove player ::', playerRemoved)

		return tournament
	}

	private checkIfPlayerIsInTheTournament(userId: string, tournament: TournamentDto): number {
		console.log('RemovePlayerFromTournamentUseCase :: checkIfPlayerIsInTheTournament :: input ::', { userId, tournament })
		const playersList = tournament.players
		const playerIndex = playersList.findIndex((player) => player.player.id === userId)
		// biome-ignore lint/complexity/noUselessTernary: <explanation>
		const findPlayer = playerIndex >= 1 ? true : false

		if (!findPlayer) {
			console.log('RemovePlayerFromTournamentUseCase :: error ::', userNotFound)

			throw userNotFound.message
		}

		return playerIndex
	}
}

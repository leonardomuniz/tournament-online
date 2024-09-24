import type { TournamentDto, TournamentPlayers } from '../../../1-entity/dto/tournamentDto'
import { tournamentNotFound } from '../../../1-entity/errors/tournament'
import { userNotFound } from '../../../1-entity/errors/user'
import type { iTournamentInterface } from '../../../1-entity/interfaces/iTournamentService'
import type { iUserInterface } from '../../../1-entity/interfaces/iUserService'

export class ConfirmPlayerInTournamentUseCase {
	constructor(
		private tournamentService: iTournamentInterface,
		private userService: iUserInterface
	) {}

	async run(tournamentId: string, userId: string): Promise<boolean> {
		console.log('START ConfirmPlayerInTournamentUseCase ::', { tournamentId, userId })

		try {
			const player = await this.checkIfPlayerExist(userId)
			console.log('ConfirmPlayerInTournamentUseCase :: checkIfPlayerExist :: ', player)

			const tournament = await this.getTournamentInfo(tournamentId)

			const normalizedData = this.normalizedPlayersList(tournament, userId)
			console.log('ConfirmPlayerInTournamentUseCase :: normalizedPlayersList :: response ::', normalizedData.players)

			//await this.tournamentService.update(tournamentId, normalizedData)
			console.log('FINISH ConfirmPlayerInTournamentUseCase')
			return true
		} catch (error) {
			console.log('ConfirmPlayerInTournamentUseCase :: error ::', error)

			throw error
		}
	}

	private async checkIfPlayerExist(userId: string): Promise<boolean> {
		console.log('ConfirmPlayerInTournamentUseCase :: checkIfPlayerExist :: input::', userId)
		const userExist = await this.userService.findOne(userId)

		if (!userExist) {
			console.log('ConfirmPlayerInTournamentUseCase :: error ::', userNotFound)

			throw userNotFound.message
		}

		return true
	}

	private async getTournamentInfo(tournamentId: string): Promise<TournamentDto> {
		const tournamentExist = await this.tournamentService.findOne(tournamentId)
		console.log('ConfirmPlayerInTournamentUseCase :: tournamentService :: findOne ::', tournamentExist)

		if (!tournamentExist) {
			console.log('ConfirmPlayerInTournamentUseCase :: error ::', tournamentNotFound)

			throw tournamentNotFound.message
		}

		return tournamentExist
	}

	private normalizedPlayersList(tournament: TournamentDto, userId: string): TournamentDto {
		console.log('ConfirmPlayerInTournamentUseCase :: normalizedPlayersList :: input ::', tournament)
		const playersList = tournament.players

		const playerIndex = this.checkIfPlayerIsInTheTournament(userId, playersList)
		console.log('ConfirmPlayerInTournamentUseCase :: checkIfPlayerIsInTheTournament :: playerIndex ::', playerIndex)

		const playerRemoved = playersList.splice(playerIndex, 1)
		console.log('ConfirmPlayerInTournamentUseCase :: remove duplicate ::', playerRemoved)

		const confirmedPlayer = {
			...playersList[playerIndex],
			confirmed: true
		}

		console.log('ConfirmPlayerInTournamentUseCase :: confirmed player ::', confirmedPlayer)

		return {
			...tournament,
			players: [...playersList, confirmedPlayer]
		}
	}

	private checkIfPlayerIsInTheTournament(userId: string, playersList: TournamentPlayers[]): number {
		console.log('ConfirmPlayerInTournamentUseCase :: checkIfPlayerIsInTheTournament :: input ::', { userId, playersList })
		const playerIndex = playersList.findIndex((player) => player.player.id === userId)

		// biome-ignore lint/complexity/noUselessTernary: <explanation>
		const isPlayerInTournament = playerIndex >= 1 ? true : false
		console.log('ConfirmPlayerInTournamentUseCase :: checkIfPlayerIsInTheTournament :: ', isPlayerInTournament)

		if (!isPlayerInTournament) {
			console.log('ConfirmPlayerInTournamentUseCase :: error ::', userNotFound)

			throw userNotFound.message
		}

		return playerIndex
	}
}

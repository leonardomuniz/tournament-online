import type { TournamentDto, TournamentPlayers } from '../../../1-entity/dto/tournamentDto'
import type { UserDto } from '../../../1-entity/dto/userDto'
import { playerHasAlreadyBeenRegistered, tournamentNotFound } from '../../../1-entity/errors/tournament'
import { userNotFound } from '../../../1-entity/errors/user'
import type { iTournamentInterface } from '../../../1-entity/interfaces/iTournamentService'
import type { iUserInterface } from '../../../1-entity/interfaces/iUserService'

export class AddPlayerInTournamentUseCase {
	constructor(
		private tournamentService: iTournamentInterface,
		private userService: iUserInterface
	) {}

	async run(tournamentId: string, userId: string): Promise<boolean> {
		console.log('START AddPlayerInTournamentUseCase ::', { tournamentId, userId })

		try {
			const tournament = await this.getTournamentInfo(tournamentId)
			const player = await this.getPlayerInfo(userId)

			const normalizedData = this.normalizePlayersList(tournament, player)
			console.log('AddPlayerInTournamentUseCase :: normalizePlayersList :: response ::', normalizedData)

			await this.tournamentService.update(tournamentId, normalizedData)
			console.log('FINISH AddPlayerInTournamentUseCase')
			return true
		} catch (error) {
			console.log('AddPlayerInTournamentUseCase :: error ::', error)

			throw error
		}
	}

	private async getTournamentInfo(tournamentId: string): Promise<TournamentDto> {
		const tournamentExist = await this.tournamentService.findOne(tournamentId)
		console.log('AddPlayerInTournamentUseCase :: tournamentService :: findOne ::', tournamentExist)

		if (!tournamentExist) {
			console.log('AddPlayerInTournamentUseCase :: error ::', tournamentNotFound)

			throw tournamentNotFound.message
		}

		return tournamentExist
	}

	private async getPlayerInfo(userId: string): Promise<UserDto> {
		const userExist = await this.userService.findOne(userId)

		if (!userExist) {
			console.log('AddPlayerInTournamentUseCase :: error ::', userNotFound)

			throw userNotFound.message
		}

		return userExist
	}

	private normalizePlayersList(tournament: TournamentDto, player: UserDto): TournamentDto {
		console.log('AddPlayerInTournamentUseCase :: normalizePlayersList :: input ::', { tournament, player })
		const { id, name } = player

		const isPlayerInTournament = this.checkIfPlayerIsInTheTournament(id, tournament)
		console.log('AddPlayerInTournamentUseCase :: checkIfPlayerIsInTheTournament :: ', isPlayerInTournament)

		const playersList = tournament.players
		const newPlayer: TournamentPlayers = {
			player: { id, name },
			confirmed: false
		}

		console.log('AddPlayerInTournamentUseCase :: normalizePlayersList :: player ::', newPlayer)

		return {
			...tournament,
			players: playersList ? [...playersList, newPlayer] : [newPlayer]
		}
	}

	private checkIfPlayerIsInTheTournament(userId: string | undefined, tournament: TournamentDto): boolean {
		console.log('AddPlayerInTournamentUseCase :: checkIfPlayerIsInTheTournament :: input ::', { userId, tournament })
		const playersList = tournament.players

		const playerIndex = playersList.findIndex((player) => player.player.id === userId)
		// biome-ignore lint/complexity/noUselessTernary: <explanation>
		const isPlayerInTournament = playerIndex >= 1 ? true : false
		console.log('AddPlayerInTournamentUseCase :: checkIfPlayerIsInTheTournament :: ', isPlayerInTournament)

		if (isPlayerInTournament) {
			console.log('AddPlayerInTournamentUseCase :: error ::', playerHasAlreadyBeenRegistered)

			throw playerHasAlreadyBeenRegistered.message
		}

		return true
	}
}

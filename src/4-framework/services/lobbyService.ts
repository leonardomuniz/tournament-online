import type { LobbyDto } from '../../1-entity/dto/lobbyDto'
import type { iLobbyInterface } from '../../1-entity/interfaces/iLobbyService'
import { AppDataSource } from '../database/data-source'
import { Lobbies } from '../database/entity/lobby'

export class LobbyService implements iLobbyInterface {
	private lobbyRepository = AppDataSource.getRepository(Lobbies)

	async create(input: LobbyDto): Promise<LobbyDto> {
		console.log('START LobbyService :: create ::', input)
		try {
			const tournament = this.lobbyRepository.create(input)
			console.log('LobbyService :: create ::', tournament)

			const response = await this.lobbyRepository.save(tournament)
			console.log('LobbyService :: save ::', response)

			console.log('FINISH LobbyService :: create')
			return response
		} catch (error) {
			console.log('LobbyService :: create ::', error)

			throw error
		}
	}

	async update(lobbyId: string, input: LobbyDto): Promise<boolean> {
		console.log('START LobbyService :: update ::', input)
		try {
			const response = await this.lobbyRepository.update({ id: lobbyId }, input)
			console.log('LobbyService :: update ::', response)

			console.log('FINISH LobbyService :: update')
			return true
		} catch (error) {
			console.log('LobbyService :: update ::', error)

			throw error
		}
	}
}

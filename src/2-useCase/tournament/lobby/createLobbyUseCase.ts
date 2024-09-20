import type { LobbyDto } from '../../../1-entity/dto/lobbyDto'
import type { iLobbyService } from '../../../1-entity/interfaces/iLobbyService'

export class CreateLobbyUseCase {
	constructor(private lobbyService: iLobbyService) {}

	async run(input: LobbyDto): Promise<boolean> {
		console.log('START CreateLobbyUseCase ::', input)

		try {
			const response = await this.lobbyService.create(input)
			console.log('CreateLobbyUseCase :: create ::', response)

			console.log('FINISH CreateLobbyUseCase')
			return true
		} catch (error) {
			console.log('CreateLobbyUseCase :: error ::', error)

			throw error
		}
	}
}

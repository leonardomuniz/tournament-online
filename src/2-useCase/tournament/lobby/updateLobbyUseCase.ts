import type { UserDto } from '../../../1-entity/dto/userDto'
import type { iLobbyInterface } from '../../../1-entity/interfaces/iLobbyService'

export class UpdateLobbyUseCase {
	constructor(private lobbyService: iLobbyInterface) {}

	async run(lobbyId: string, input: UserDto): Promise<boolean> {
		console.log('START UpdateLobbyUseCase ::', input)

		try {
			const response = await this.lobbyService.update(lobbyId, {
				players: [input]
			})
			console.log('UpdateLobbyUseCase :: update ::', response)

			console.log('FINISH UpdateLobbyUseCase')
			return true
		} catch (error) {
			console.log('UpdateLobbyUseCase :: error ::', error)

			throw error
		}
	}
}

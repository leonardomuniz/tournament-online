import type { UserDto } from '../../../1-entity/dto/userDto'
import type { iLobbyInterface } from '../../../1-entity/interfaces/iLobbyService'

export class AddingPlayerToLobby {
	constructor(private lobbyService: iLobbyInterface) {}

	async run(lobbyId: string, input: UserDto): Promise<boolean> {
		console.log('START AddingPlayerToLobby ::', input)

		try {
			const response = await this.lobbyService.update(lobbyId, {
				players: [input]
			})
			console.log('AddingPlayerToLobby :: update ::', response)

			console.log('FINISH AddingPlayerToLobby')
			return true
		} catch (error) {
			console.log('AddingPlayerToLobby :: error ::', error)

			throw error
		}
	}
}

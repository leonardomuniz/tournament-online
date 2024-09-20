import type { LobbyDto } from '../dto/lobbyDto'

export interface iLobbyInterface {
	create(input: LobbyDto): Promise<LobbyDto>
	update(lobbyId: string, input: LobbyDto): Promise<boolean>
}

import type { LobbyDto } from '../dto/lobbyDto'

export interface iLobbyService {
	create(input: LobbyDto): Promise<boolean>
}

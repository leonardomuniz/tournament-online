import Router, { type Request, type Response } from 'express'
import { UpdateLobbyUseCase } from '../../2-useCase/tournament/lobby/updateLobbyUseCase'
import { LobbyService } from '../services/lobbyService'

export const lobbyRouter = Router()

const lobbyService = new LobbyService()

const updateLobby = new UpdateLobbyUseCase(lobbyService)

lobbyRouter.put('/:lobbyId', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await updateLobby.run(request.params.lobbyId, request.body))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

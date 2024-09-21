import Router, { type Request, type Response } from 'express'
import { AddingPlayerToLobby } from '../../2-useCase/tournament/lobby/addingPlayerToLobby'
import { LobbyService } from '../services/lobbyService'

export const lobbyRouter = Router()

const lobbyService = new LobbyService()

const addingPlayerToLobby = new AddingPlayerToLobby(lobbyService)

lobbyRouter.put('/:lobbyId', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await addingPlayerToLobby.run(request.params.lobbyId, request.body))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

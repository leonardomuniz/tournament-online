import Router, { type Request, type Response } from 'express'
import { CreateTournamentUseCase } from '../../2-useCase/tournament/createTournamentUseCase'
import { deleteTournamentUseCase } from '../../2-useCase/tournament/deleteTournamentUseCase'
import { findAllTournamentUseCase } from '../../2-useCase/tournament/findAllTournamentUseCase'
import { findOneTournamentUseCase } from '../../2-useCase/tournament/findOneTournamentUseCase'
import { AddPlayerInTournamentUseCase } from '../../2-useCase/tournament/management/addPlayerInTournament'
import { RemovePlayerFromTournamentUseCase } from '../../2-useCase/tournament/management/removePlayerFromTournament'
import { UpdateTournamentUseCase } from '../../2-useCase/tournament/updateTournamentUseCase'
import { TournamentService } from '../services/tournamentService'
import { UserService } from '../services/userService'

export const tournamentRouter = Router()

const tournamentService = new TournamentService()
const userService = new UserService()

const createTournament = new CreateTournamentUseCase(tournamentService, userService)
const findAllTournament = new findAllTournamentUseCase(tournamentService)
const findOneTournament = new findOneTournamentUseCase(tournamentService)
const updateTournament = new UpdateTournamentUseCase(tournamentService)
const deleteTournament = new deleteTournamentUseCase(tournamentService)
const addingPlayerToTournament = new AddPlayerInTournamentUseCase(tournamentService, userService)
const removePlayerFromTournament = new RemovePlayerFromTournamentUseCase(tournamentService, userService)

tournamentRouter.post('/', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await createTournament.run(request.body))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

tournamentRouter.get('/', async (request: Request, response: Response): Promise<Response> => {
	return response.status(200).json(await findAllTournament.run())
})

tournamentRouter.get('/:tournamentId', async (request: Request, response: Response): Promise<Response> => {
	return response.status(200).json(await findOneTournament.run(request.params.tournamentId))
})

tournamentRouter.put('/:tournamentId', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await updateTournament.run(request.params.tournamentId, request.body))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

tournamentRouter.delete('/:tournamentId', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await deleteTournament.run(request.params.tournamentId))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

tournamentRouter.put('/:tournamentId/addUser/:userId', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await addingPlayerToTournament.run(request.params.tournamentId, request.params.userId))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

tournamentRouter.put('/:tournamentId/removeUser/:userId', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await removePlayerFromTournament.run(request.params.tournamentId, request.params.userId))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

import Router, { type Request, type Response } from 'express'
import { CreateMatchUseCase } from '../../2-useCase/tournament/match/createMatchUseCase'
import { MatchService } from '../services/matchService'
import { TournamentService } from '../services/tournamentService'

export const matchRouter = Router()

const tournamentService = new TournamentService()
const matchService = new MatchService()

const createMatch = new CreateMatchUseCase(tournamentService, matchService)

matchRouter.post('/', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await createMatch.run(request.body))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

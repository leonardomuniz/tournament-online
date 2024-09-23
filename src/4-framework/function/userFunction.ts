import Router, { type Request, type Response } from 'express'
import { CreateUserUseCase } from '../../2-useCase/user/createUserUseCase'
import { deleteUserUseCase } from '../../2-useCase/user/deleteUserUseCase'
import { findAllUserUseCase } from '../../2-useCase/user/findAllUserUseCase'
import { findOneUserUseCase } from '../../2-useCase/user/findOneUserUseCase'
import { UpdateUserUseCase } from '../../2-useCase/user/updateUserUseCase'
import { UserService } from '../services/userService'

export const userRouter = Router()

const service = new UserService()

const createUser = new CreateUserUseCase(service)
const findAllUser = new findAllUserUseCase(service)
const findOneUser = new findOneUserUseCase(service)
const updateUser = new UpdateUserUseCase(service)
const deleteUser = new deleteUserUseCase(service)

userRouter.post('/', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await createUser.run(request.body))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

userRouter.get('/', async (request: Request, response: Response): Promise<Response> => {
	return response.status(200).json(await findAllUser.run())
})

userRouter.get('/:userId', async (request: Request, response: Response): Promise<Response> => {
	return response.status(200).json(await findOneUser.run(request.params.userId))
})

userRouter.put('/:userId', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await updateUser.run(request.params.userId, request.body))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

userRouter.delete('/:userId', async (request: Request, response: Response): Promise<Response> => {
	try {
		return response.status(200).json(await deleteUser.run(request.params.userId))
	} catch (error) {
		return response.status(400).json({ message: error })
	}
})

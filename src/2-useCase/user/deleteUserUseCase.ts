import { userNotFound } from '../../1-entity/errors/user'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class deleteUserUseCase {
	constructor(private userService: iUserInterface) {}

	async run(userId: string): Promise<boolean> {
		console.log('START deleteUserUseCase ::', userId)

		try {
			const userExist = await this.userService.findOne(userId)
			console.log('deleteUserUseCase :: findOne ::', userExist)

			if (!userExist) {
				console.log('deleteUserUseCase :: error ::', userNotFound)

				throw userNotFound.message
			}

			const response = await this.userService.delete(userId)
			console.log('deleteUserUseCase :: delete ::', response)

			console.log('FINISH deleteUserUseCase')
			return true
		} catch (error) {
			console.log('deleteUserUseCase :: error ::', error)

			throw error
		}
	}
}

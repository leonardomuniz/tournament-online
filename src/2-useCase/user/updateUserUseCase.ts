import type { UserDto } from '../../1-entity/dto/userDto'
import { userNotFound } from '../../1-entity/errors/user'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class UpdateUserUseCase {
	constructor(private userService: iUserInterface) {}

	async run(userId: string, input: UserDto): Promise<boolean> {
		console.log('START UpdateUserUseCase ::', input)

		try {
			const userExist = await this.userService.findByEmail(input.email)
			console.log('UpdateUserUseCase :: findByEmail ::', userExist)

			if (!userExist) {
				console.log('UpdateUserUseCase :: error ::', userNotFound)

				throw userNotFound.message
			}

			const response = await this.userService.update(userId, input)
			console.log('UpdateUserUseCase :: update ::', response)

			console.log('FINISH UpdateUserUseCase')
			return true
		} catch (error) {
			console.log('UpdateUserUseCase :: error ::', error)

			throw error
		}
	}
}

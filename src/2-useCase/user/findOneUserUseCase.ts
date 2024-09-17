import type { UserDto } from '../../1-entity/dto/userDto'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class findOneUserUseCase {
	constructor(private userService: iUserInterface) {}

	async run(userId: string): Promise<UserDto | null> {
		console.log('START findOneUserUseCase ::', userId)
		try {
			const response = await this.userService.findOne(userId)
			console.log('findOneUserUseCase :: findOne ::', response)

			console.log('FINISH findOneUserUseCase')
			return response
		} catch (error) {
			console.log('findOneUserUseCase :: error ::', error)

			throw error
		}
	}
}

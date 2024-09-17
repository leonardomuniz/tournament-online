import type { UserDto } from '../../1-entity/dto/userDto'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class findByEmailUserUseCase {
	constructor(private userService: iUserInterface) {}

	async run(email: string): Promise<UserDto | null> {
		console.log('START findByEmailUserUseCase ::', email)

		try {
			const response = await this.userService.findByEmail(email)
			console.log('findByEmailUserUseCase :: findByEmail ::', response)

			console.log('FINISH findByEmailUserUseCase')
			return response
		} catch (error) {
			console.log('findByEmailUserUseCase :: error ::', error)

			throw error
		}
	}
}

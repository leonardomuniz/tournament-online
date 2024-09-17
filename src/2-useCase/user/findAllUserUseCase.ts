import type { UserDto } from '../../1-entity/dto/userDto'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class findAllUserUseCase {
	constructor(private userService: iUserInterface) {}

	async run(): Promise<UserDto[]> {
		console.log('START findAllUserUseCase')
		try {
			const response = await this.userService.findAll()
			console.log('findAllUserUseCase :: findAll ::', response)

			console.log('FINISH findAllUserUseCase')
			return response
		} catch (error) {
			console.log('findAllUserUseCase :: error ::', error)

			throw error
		}
	}
}

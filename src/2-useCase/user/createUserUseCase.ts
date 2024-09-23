import type { UserDto } from '../../1-entity/dto/userDto'
import { userAlredyExist } from '../../1-entity/errors/user'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'

export class CreateUserUseCase {
	constructor(private userService: iUserInterface) {}

	async run(input: UserDto): Promise<boolean> {
		console.log('START CreateUserUseCase ::', input)
		const { email } = input

		try {
			await this.checkIfUserExist(email)

			const response = await this.userService.create(input)
			console.log('CreateUserUseCase :: create ::', response)

			console.log('FINISH CreateUserUseCase')
			return true
		} catch (error) {
			console.log('CreateUserUseCase :: error ::', error)

			throw error
		}
	}
	private async checkIfUserExist(email: string): Promise<boolean> {
		const userExist = await this.userService.findByEmail(email)
		console.log('CreateUserUseCase :: findByEmail ::', userExist)

		if (userExist) {
			console.log('CreateUserUseCase :: error ::', userAlredyExist)

			throw userAlredyExist.message
		}

		return true
	}
}

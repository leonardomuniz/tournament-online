import type { UserDto } from '../../1-entity/dto/userDto'
import type { iUserInterface } from '../../1-entity/interfaces/iUserService'
import { AppDataSource } from '../database/data-source'
import { Users } from '../database/entity/user'

export class UserService implements iUserInterface {
	private userRepository = AppDataSource.getRepository(Users)

	async findAll(): Promise<UserDto[]> {
		console.log('START UserService :: findAll')

		const response = await this.userRepository.find({
			relations: { tournaments: true }
		})
		console.log('UserService :: find ::', response)

		console.log('FINISH UserService :: findAll')
		return response
	}

	async create(input: UserDto): Promise<boolean> {
		console.log('START UserService :: create ::', input)
		try {
			const user = this.userRepository.create(input)

			const response = await this.userRepository.save(user)
			console.log('UserService :: save ::', response)

			console.log('FINISH UserService :: create')
			return true
		} catch (error) {
			console.log('UserService :: create ::', error)

			throw error
		}
	}

	async findOne(userId: string): Promise<UserDto | null> {
		console.log('START UserService :: findOne ::', userId)

		try {
			const response = await this.userRepository.findOne({
				where: { id: userId },
				relations: { tournaments: true }
			})
			console.log('UserService :: findOne ::', response)

			console.log('FINISH UserService :: findOne')
			return response
		} catch (error) {
			console.log('UserService :: findOne ::', error)

			throw error
		}
	}

	async update(userId: string, input: UserDto): Promise<boolean> {
		console.log('START UserService :: update ::', input)
		try {
			const response = await this.userRepository.update({ id: userId }, input)
			console.log('UserService :: update ::', response)

			console.log('FINISH UserService :: update')
			return true
		} catch (error) {
			console.log('UserService :: update ::', error)

			throw error
		}
	}

	async delete(userId: string): Promise<boolean> {
		console.log('START UserService :: delete ::', userId)
		try {
			const response = await this.userRepository.delete({ id: userId })
			console.log('UserService :: delete ::', response)

			console.log('FINISH UserService :: delete')
			return true
		} catch (error) {
			console.log('UserService :: delete ::', error)

			throw error
		}
	}

	async findByEmail(email: string): Promise<UserDto | null> {
		console.log('START UserService :: findByEmail ::', email)
		try {
			const response = await this.userRepository.findOneBy({ email })

			console.log('FINISH UserService :: findByEmail ::', response)
			return response
		} catch (error) {
			console.log('UserService :: findByEmail ::', error)

			throw error
		}
	}
}

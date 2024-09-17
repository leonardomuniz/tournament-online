import type { UserDto } from '../dto/userDto'

export interface iUserInterface {
	create(input: UserDto): Promise<boolean>
	findAll(): Promise<UserDto[]>
	findOne(userId: string | null): Promise<UserDto | null>
	update(userId: string, input: UserDto): Promise<boolean>
	delete(userId: string): Promise<boolean>
	findByEmail(email: string): Promise<UserDto | null>
}

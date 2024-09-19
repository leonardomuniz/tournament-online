import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import type { UserDto } from '../../../1-entity/dto/userDto'
import { Matchs } from './match'
import { Users } from './user'

@Entity()
export class Tournaments {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ length: 100, nullable: false })
	name!: string

	@Column('jsonb')
	players!: UserDto[]

	@OneToMany(
		() => Matchs,
		(matchs) => matchs.tournament
	)
	matchs?: Matchs[]

	@Column({ nullable: false })
	rounds!: number

	@Column({ nullable: false })
	active!: boolean

	@ManyToOne(
		() => Users,
		(users) => users.tournaments
	)
	owner!: Users

	@Column({ nullable: false })
	dateAndHour!: Date

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}

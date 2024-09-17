import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import type { MatchsDto, PlayerDto } from '../../../1-entity/dto/tournamentDto'
import { User } from './user'

@Entity()
export class Tournament {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ length: 100, nullable: false })
	name!: string

	@Column('jsonb')
	players!: PlayerDto[]

	@Column('jsonb')
	matchs!: MatchsDto[]

	@Column({ nullable: false })
	rounds!: number

	@ManyToOne(
		() => User,
		(user) => user.tournaments
	)
	owner!: User

	@Column({ nullable: false })
	dateAndHour!: Date

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import type { UserDto } from '../../../1-entity/dto/userDto'
import { Tournaments } from './tournament'

@Entity()
export class Lobbies {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column('jsonb')
	players!: UserDto[]

	@Column({ nullable: false })
	tournamentId!: string

	@ManyToOne(
		() => Tournaments,
		(tournaments) => tournaments.players
	)
	tournament?: Tournaments

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}

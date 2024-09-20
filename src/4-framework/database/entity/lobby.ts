import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import type { UserDto } from '../../../1-entity/dto/userDto'
import { Tournaments } from './tournament'

@Entity()
export class Lobbies {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column('jsonb')
	players?: UserDto[]

	@Column({ nullable: false })
	tournamentId?: string

	@OneToOne(() => Tournaments)
	@JoinColumn()
	tournament?: Tournaments

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import type { Match } from '../../../1-entity/dto/tournamentDto'
import { Tournaments } from './tournament'

@Entity()
export class Matchs {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ nullable: false })
	round!: number

	@ManyToOne(
		() => Tournaments,
		(tournaments) => tournaments.matchs
	)
	tournament!: Tournaments

	@Column('jsonb')
	matchs!: Match[]

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}

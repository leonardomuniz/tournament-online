import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import type { MatchsDto } from '../../../1-entity/dto/matchDto'
import type { TournamentPlayers } from '../../../1-entity/dto/tournamentDto'
import { Users } from './user'

@Entity()
export class Tournaments {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ length: 100, nullable: false })
	name!: string

	@Column({ type: 'jsonb', nullable: true })
	players!: TournamentPlayers[]

	@Column({ type: 'jsonb', nullable: true })
	matchs!: MatchsDto[]

	@Column({ nullable: false })
	rounds!: number

	@Column({ default: false })
	active!: boolean

	@Column({ nullable: false })
	ownerId!: string

	@ManyToOne(
		() => Users,
		(users) => users.tournaments
	)
	owner?: Users

	@Column({ nullable: false })
	dateAndHour!: Date

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}

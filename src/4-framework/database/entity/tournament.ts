import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import type { LobbyDto } from '../../../1-entity/dto/lobbyDto'
import { Lobbies } from './lobby'
import { Matchs } from './match'
import { Users } from './user'

@Entity()
export class Tournaments {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ length: 100, nullable: false })
	name!: string

	@OneToOne(
		() => Lobbies,
		(lobby) => lobby.tournament
	)
	players?: LobbyDto

	@OneToMany(
		() => Matchs,
		(matchs) => matchs.tournament
	)
	matchs?: Matchs[]

	@Column({ nullable: false })
	rounds!: number

	@Column({ nullable: false })
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

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, type ValueTransformer } from 'typeorm'
import type { Players } from '../../../1-entity/dto/tournamentDto'
import { Matchs } from './match'
import { Users } from './user'

class PlayersTransformer implements ValueTransformer {
	to(value: Players[]): string {
		return JSON.stringify(value)
	}

	from(value: string): Players[] {
		return JSON.parse(value)
	}
}

@Entity()
export class Tournaments {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ length: 100, nullable: false })
	name!: string

	@Column({ type: 'json', transformer: new PlayersTransformer() })
	players?: Players[]

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

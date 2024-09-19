import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Tournaments } from './tournament'

@Entity()
export class Users {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ length: 100, nullable: false })
	name!: string

	@Column({ length: 100, nullable: false, unique: true })
	email!: string

	@Column({ length: 100, nullable: false })
	password!: string

	@OneToMany(
		() => Tournaments,
		(tournaments) => tournaments.owner
	)
	tournaments?: Tournaments[]

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}

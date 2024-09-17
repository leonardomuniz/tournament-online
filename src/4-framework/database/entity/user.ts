import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Tournament } from './tournament'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ length: 100, nullable: false })
	name!: string

	@Column({ length: 100, nullable: false, unique: true })
	email!: string

	@Column({ length: 100, nullable: false })
	password!: string

	@OneToMany(
		() => Tournament,
		(tournament) => tournament.owner
	)
	tournaments?: Tournament[]

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}

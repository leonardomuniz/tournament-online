import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { entityCollection } from './entity/collection'
import { migrationsColletction } from './migrations/collection'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'teste123',
	database: 'tournament_online',
	synchronize: true,
	logging: false,
	entities: entityCollection,
	migrations: migrationsColletction,
	subscribers: []
})

import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreateTournamentTable1725460170521 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'tournaments',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid'
					},
					{
						name: 'name',
						type: 'varchar',
						length: '100',
						isNullable: false
					},
					{
						name: 'players',
						type: 'jsonb',
						isNullable: false
					},
					{
						name: 'matchs',
						type: 'jsonb',
						isNullable: false
					},
					{
						name: 'rounds',
						type: 'int',
						isNullable: false
					},
					{
						name: 'dateAndHour',
						type: 'timestamp',
						isNullable: false
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tournaments')
	}
}

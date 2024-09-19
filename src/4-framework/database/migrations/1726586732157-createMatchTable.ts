import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreateMatchTable1726586732157 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'matchs',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid'
					},
					{
						name: 'matchs',
						type: 'jsonb',
						isNullable: false
					},
					{
						name: 'round',
						type: 'int',
						isNullable: false
					},
					{
						name: 'tournament',
						type: 'varchar',
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

		await queryRunner.query(`
            ALTER TABLE "matchs" 
            ADD CONSTRAINT "FK_Match_Tournament"
            FOREIGN KEY ("tournament") REFERENCES "tournaments" ("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('matchs')
	}
}

import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreatingLobbyTable1726840471023 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'lobbies',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid'
					},
					{
						name: 'players',
						type: 'jsonb',
						isNullable: false
					},
					{
						name: 'tournamentId',
						type: 'uuid',
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
            ALTER TABLE "lobbies" 
            ADD CONSTRAINT "FK_Tournament_Lobbies"
            FOREIGN KEY ("tournamentId") REFERENCES "tournaments" ("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('lobbies')
	}
}

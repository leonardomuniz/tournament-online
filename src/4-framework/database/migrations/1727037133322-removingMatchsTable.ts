import type { MigrationInterface, QueryRunner } from 'typeorm'

export class RemovingMatchsAndLobbyTables1727037133322 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE matchs')
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}

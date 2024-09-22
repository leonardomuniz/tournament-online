import type { MigrationInterface, QueryRunner } from 'typeorm'

export class RemovingLobbiesTable1727037713407 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE lobbies')
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}

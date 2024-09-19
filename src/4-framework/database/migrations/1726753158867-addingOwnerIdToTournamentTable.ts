import type { MigrationInterface, QueryRunner } from 'typeorm'

export class AddingOwnerToTournamentTable1726753158867 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "tournaments"
            ADD COLUMN "owner" jsonb;
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "tournaments" DROP COLUMN "owner"
			ON DELETE NO ACTION ON UPDATE NO ACTION;
       `)
	}
}

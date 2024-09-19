import type { MigrationInterface, QueryRunner } from 'typeorm'

export class AddActiveInTournamentsTable1726580733410 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "tournaments"
            ADD COLUMN "active" boolean;
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "tournaments" DROP COLUMN "active"
			ON DELETE CASCADE ON UPDATE CASCADE;
       `)
	}
}

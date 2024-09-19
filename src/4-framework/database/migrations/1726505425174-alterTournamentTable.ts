import type { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTournamentTable1726505425174 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "tournaments"
            ADD COLUMN "ownerId" varchar;
        `)

		await queryRunner.query(`
            ALTER TABLE "tournaments" 
            ADD CONSTRAINT "FK_Tournament_User"
            FOREIGN KEY ("ownerId") REFERENCES "users" ("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "tournaments" DROP CONSTRAINT "FK_Tournament_User";
        `)

		await queryRunner.query(`
             ALTER TABLE "tournaments" DROP COLUMN "ownerId";
        `)
	}
}

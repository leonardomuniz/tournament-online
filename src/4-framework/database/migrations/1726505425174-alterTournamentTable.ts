import type { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTournamentTable1726505425174 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "tournaments"
            ADD COLUMN "owner" varchar;
        `)

		await queryRunner.query(`
            ALTER TABLE "tournaments" 
            ADD CONSTRAINT "FK_Tournament_User"
            FOREIGN KEY ("owner") REFERENCES "users" ("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "tournaments" DROP CONSTRAINT "FK_Tournament_User";
        `)

		await queryRunner.query(`
             ALTER TABLE "tournaments" DROP COLUMN "owner";
        `)
	}
}

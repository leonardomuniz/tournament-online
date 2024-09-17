import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreateUserTable1725482766342 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
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
						name: 'email',
						type: 'varchar',
						length: '100',
						isUnique: true,
						isNullable: false
					},
					{
						name: 'password',
						type: 'varchar',
						length: '100',
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
		await queryRunner.dropTable('users')
	}
}

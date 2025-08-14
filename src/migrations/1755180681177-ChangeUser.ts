import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUser1755180681177 implements MigrationInterface {
    name = 'ChangeUser1755180681177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('user', 'customer', 'admin') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}

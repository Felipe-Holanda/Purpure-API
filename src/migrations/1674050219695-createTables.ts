import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1674050219695 implements MigrationInterface {
    name = 'createTables1674050219695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Clients" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Clients" DROP COLUMN "createdAt"`);
    }

}

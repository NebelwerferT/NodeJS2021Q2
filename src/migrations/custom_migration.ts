import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomMigration implements MigrationInterface {
    name = 'CustomMigration'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" varchar(255) NOT NULL, "order" integer NOT NULL, "boardId" uuid DEFAULT uuid_generate_v4(), CONSTRAINT "PK_columns_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" varchar(255), CONSTRAINT "PK_board_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" varchar(255) NOT NULL, "order" integer NOT NULL, "description" varchar(255) NOT NULL, "userId" varchar(255), "boardId" varchar(255), "columnId" varchar(255), CONSTRAINT "PK_task_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" varchar(64) NOT NULL, "login" varchar(64) NOT NULL, "password" varchar(64) NOT NULL, CONSTRAINT "PK_user_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_columns_boardId__board_id" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_columns_boardId__board_id"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "columns"`);
    }

}
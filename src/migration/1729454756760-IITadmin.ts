import { MigrationInterface, QueryRunner } from 'typeorm';

export class IITadmin1729454756760 implements MigrationInterface {
  name = 'IITadmin1729454756760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."ii_tadmin_office_enum" AS ENUM('programs', 'head of studies', 'director', 'student affair')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ii_tadmin" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "office" "public"."ii_tadmin_office_enum" NOT NULL DEFAULT 'programs', CONSTRAINT "PK_2d9445efa9eeb8f5b98dd868516" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ii_tadmin"`);
    await queryRunner.query(`DROP TYPE "public"."ii_tadmin_office_enum"`);
  }
}

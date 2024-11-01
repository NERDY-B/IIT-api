import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1730489590884 implements MigrationInterface {
  name = 'Migration1730489590884';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ii_tadmin" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ii_tadmin" DROP COLUMN "password"`);
  }
}

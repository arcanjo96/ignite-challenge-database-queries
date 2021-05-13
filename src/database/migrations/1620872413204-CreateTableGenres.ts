import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableGenres1620872413204 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "genres",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "description",
            type: "varchar",
          }
        ]
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("genres");
  }

}

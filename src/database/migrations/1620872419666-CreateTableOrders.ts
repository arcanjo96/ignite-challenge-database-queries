import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableOrders1620872419666 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "game_id",
            type: "uuid",
            isArray: true
          }
        ]
      }));

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['game_id'],
        referencedTableName: 'games',
        referencedColumnNames: ['id']
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }

}

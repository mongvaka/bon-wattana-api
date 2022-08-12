import {BeforeInsert, Column, Connection, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, ViewColumn, ViewEntity} from "typeorm";
import {BasicData} from "../shared/entities/basic-data";
@Entity('USERS')
export class User extends BasicData {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;
  @Column({ nullable: true, length: 65})
  username: string;

  @Column({ nullable: true})
  password: string;
  @Column({ nullable: true})
  token: string;
  @Column({ nullable: true})
  firstname?:string;
  @Column({nullable: true})
  lastname?:string;
}
@ViewEntity({
  name:'user_dropdown',
  expression: (connection: Connection) => connection.createQueryBuilder()
  .select("user.id", "value")
  .addSelect("CONCAT(user.firstname , '[' , user.lastname, ']')", "label")
      .from(User, "user")
})
export class VwUserDropdown {

  @ViewColumn()
    value: number;

    @ViewColumn()
    label: string;
}

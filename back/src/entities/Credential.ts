import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true, nullable:false })
  username: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt?: Date

  @CreateDateColumn()
  updateAt?: Date

  @OneToOne(() => User, (user) => user.credential)
  user: User;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User"; // Importa la entidad User
import { Status } from "../interfaces/IAppointment"; // Enum Status

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "varchar", length: 5, nullable:false })
  time: string;

  @Column({ type: "varchar", length: 10, nullable: false, default: Status.Active })
  state: Status;

  
  @ManyToOne(() => User, (user) => user.appointments, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt?: Date

  @CreateDateColumn()
  updateAt?: Date
}

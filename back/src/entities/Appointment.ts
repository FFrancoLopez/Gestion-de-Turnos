import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User"; // Importa la entidad User
import { Status } from "../interfaces/IAppointment"; // Enum Status

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  state: Status;

  
  @ManyToOne(() => User, (user) => user.appointments, { onDelete: "CASCADE" })
  user: User;
}

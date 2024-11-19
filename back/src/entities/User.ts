import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length:100, nullable: false })
    name: string

    @Column({ type: "varchar", length:100, unique:true, nullable: false })
    email: string

    @Column({type: "date", unique: true, nullable: false})
    birthdate: Date

    @Column( {type: "integer", nullable: false, unique: true})
    DNI: number

    @CreateDateColumn()
  createdAt?: Date

  @CreateDateColumn()
  updateAt?: Date

    // Releacion de 1 a varios (1:N)
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];
    
    // Releacion de 1 a 1 (1:1)
    @OneToOne(() => Credential, (credential) => credential.user, { cascade: true })
  @JoinColumn() // Necesario para establecer la relación en la base de datos
  credential: Credential;


}
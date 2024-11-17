import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length:100
    })
    name: string

    @Column()
    email: string

    @Column({type: "date", unique: true})
    birthdate: Date

    @Column("integer")
    DNI: number

    // Releacion de 1 a varios (1:N)
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];
    
    // Releacion de 1 a 1 (1:1)
    @OneToOne(() => Credential, (credential) => credential.user, { cascade: true })
  @JoinColumn() // Necesario para establecer la relación en la base de datos
  credential: Credential;


}
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({

    validateAllAppointment: function(date: Date, hour:string): void{
        
        const [hours, minutes] = hour.split(':').map(Number)//[11:11]

        const appointmentDate = new Date(date)
        appointmentDate.setHours(hours, minutes, 0)
        const appointmentDateArg = new Date (appointmentDate.getTime() - 3 * 60 * 60 * 1000)
        const dateNowArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)

        if(appointmentDateArg < dateNowArg){
            throw new Error("No se pueden agendar turnos a fechaas pasadas")
        }

        const diffMilliSeconds = new Date().getTime() - appointmentDate.getTime()
        const diffInHours = diffMilliSeconds / (1000 * 60 * 60)

        if(diffInHours > 24){
            throw new Error("No se pueden agendar turnos con menos de 24 horas de antelación")
        }


        const dayOfWeek = appointmentDateArg.getUTCDay()

        if(dayOfWeek === 5 || dayOfWeek === 6){
            throw new Error("No se pueden agendar turnos los findes de semana")
        }



        if(hours < 9 || hours > 21){
            throw new Error("Los turnos no se pueden agendar fuera del horario de atención de 9am - 21pm")
        }
        
    },

    

})
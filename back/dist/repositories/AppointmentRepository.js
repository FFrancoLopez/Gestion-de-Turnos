"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const data_source_1 = require("../config/data-source");
const Appointment_1 = require("../entities/Appointment");
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).extend({
    validateAllAppointment: function (date, hour) {
        const [hours, minutes] = hour.split(':').map(Number); //[11:11]
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const appointmentDateArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const dateNowArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);
        if (appointmentDateArg < dateNowArg) {
            throw new Error("No se pueden agendar turnos a fechaas pasadas");
        }
        const diffMilliSeconds = new Date().getTime() - appointmentDate.getTime();
        const diffInHours = diffMilliSeconds / (1000 * 60 * 60);
        if (diffInHours > 24) {
            throw new Error("No se pueden agendar turnos con menos de 24 horas de antelación");
        }
        const dayOfWeek = appointmentDateArg.getUTCDay();
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            throw new Error("No se pueden agendar turnos los findes de semana");
        }
        if (hours < 9 || hours > 21) {
            throw new Error("Los turnos no se pueden agendar fuera del horario de atención de 9am - 21pm");
        }
    },
});

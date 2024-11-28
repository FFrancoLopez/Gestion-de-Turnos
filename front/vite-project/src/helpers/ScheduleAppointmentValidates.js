
const isValidTime = (time) => {
    const [hour, minutes] = time.split(':').map(Number);
    const totalMinutes = hour * 60 + minutes
    const startTime = 9 * 60
    const endTime = 21 * 60

    return totalMinutes >= startTime && totalMinutes < endTime
}


export const dateTimeValidates = (input, userAppointments = []) => {
    const errors = {};
    const { date, time } = input;

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    if (!date) errors.date = "La fecha es requerida";
    else if (selectedDateTime < now) errors.date = "No puedes agendar turnos en fechas pasadas";
    else if (selectedDateTime < twentyFourHoursLater) errors.date = "Debes seleccionar una fecha con por lo menos 24 horas de antelación";
    else if (selectedDateTime.getDay() === 6 || selectedDateTime.getDay() === 0)
        errors.date = "No puedes agendar turnos los fines de semana";

    if (!time) errors.time = "La hora es requerida";
    else if (!isValidTime(time)) errors.time = "La hora debe ser entre 09:00 y 21:00";

    // Validación para turnos duplicados
    const isDuplicate = userAppointments.some(
        (appointment) =>
            appointment.date === date && 
            appointment.time === time &&
            appointment.state === "Active"
    );

    if (isDuplicate) {
        errors.time = "Ya tienes un turno reservado en este horario.";
    }

    return errors;
};
   


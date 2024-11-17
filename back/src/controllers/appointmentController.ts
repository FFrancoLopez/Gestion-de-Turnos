import { Request, Response } from 'express';
import {getAllAppointmentsService, getAppointmentByIdService, createAppointmentService, cancelAppointmentService} from "../services/appointmentsService";
import { AppointmentScheduleDto } from '../dto/AppointmentDto';


// Obtenemos el listado de todos los turnos.
export const getAppointments = async(req: Request, res: Response): Promise<void> => {
  try {
    const appointments = getAllAppointmentsService();
    res.json(appointments);

  }catch(error){
    console.error('Error al obtener los turnos:', error);
    res.status(500).json({ message: 'No se pudieron obtener los turnos. Por favor, inténtelo más tarde.' });
  }
};

// Obtenemos los detalles de un turno especifico.
export const getAppointment = async(req: Request <{id: string}>, res: Response): Promise<void> => {
  const appointmentId = parseInt(req.params.id);
  if (isNaN(appointmentId)) {
    res.status(400).json({ message: 'El ID del turno debe ser un número válido.' });
    return;
  }
  try{
    const appointment = await getAppointmentByIdService(appointmentId);

    if (!appointment) {
      res.status(404).json({ message: 'Turno no encontrado.' });
      return;
    }
    res.json(appointment);

  } catch (error) {
    console.error(`Error al obtener el turno con ID ${appointmentId}:`, error);
    res.status(500).json({ message: 'No se pudo obtener el turno. Por favor, inténtelo más tarde.' });
  }
};

// Agendamos un nuevo turno.
export const scheduleAppointment = async(req: Request < unknown, unknown, AppointmentScheduleDto>, res: Response): Promise<void> => {
  const {date, hour, userId} = req.body;

  if(!date || !hour || !userId) {

    res.status(400).json({message: 'Faltan datos para agendar el turno.'});
    return
  }
  try {
    const newAppointment = createAppointmentService (req.body);
    res.status(201).json(newAppointment);

  }catch(error) {
    console.error('Error al agendar el turno:', error);
    res.status(500).json({message: 'No se pudo agendar el turno. Por favor, inténtelo más tarde.'})
  }
};

// Cambiamos el estado de un turno a “cancelled”.
export const cancelAppointmentById = async(req: Request <{id: string}>, res: Response): Promise<void> => {
  const appointmentId = parseInt(req.body.id);

  if (isNaN(appointmentId)) {
    res.status(400).json({ message: 'El ID del turno debe ser un número válido.' });
    return;
  }
  try{
    const appointmentSuccess = await cancelAppointmentService(appointmentId);
    if (appointmentSuccess) {
      res.json({message: 'Turno cancelado exitosamente.'});

    }else{
      res.status(404).json({message: 'Turno no encontrado'});
    }

  }catch (error) {
    console.error(`Error al cancelar el turno con ID ${appointmentId}:`, error);
    res.status(500).json({ message: 'No se pudo cancelar el turno. Por favor, inténtelo más tarde.' });
  }

};

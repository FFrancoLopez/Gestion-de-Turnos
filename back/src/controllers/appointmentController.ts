import { Request, Response } from 'express';
import {getAllAppointments, getAppointmentById, createAppointment, cancelAppointment} from "../services/appointmentsService";


// Obtenemos el listado de todos los turnos.
export const getAppointments = (req: Request, res: Response): void => {
  const appointments = getAllAppointments();
  res.json(appointments);
};

// Obtenemos los detalles de un turno especifico.
export const getAppointment = (req: Request, res: Response): void => {
  const appointmentId = parseInt(req.params.id);
  const appointment = getAppointmentById(appointmentId);
  if (appointment) {

    res.json(appointment);
  }else{

    res.status(404).json({message: 'Turno no encontrado.'});
  }
};

// Agendamos un nuevo turno.
export const scheduleAppointment = (req: Request, res: Response): void => {
  const {date, hour, userId} = req.body;
  if(!date || !hour || !userId) {

    res.status(400).json({message: 'Faltan datos para agendar el turno.'});
  }
  const newAppointment = createAppointment (new Date(date), hour, userId);
  res.status(201).json(newAppointment);
};

// Cambiamos el estado de un turno a “cancelled”.
export const cancelAppointmentById = (req: Request, res: Response): void => {
  const appointmentId = parseInt(req.body.id);
  const appointment = cancelAppointment(appointmentId);
  if (appointment) {

    res.json({message: 'Turno cancelado.'});
  }else{
    res.status(404).json({message: 'Turno no encontrado'});
  }
};

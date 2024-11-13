import { Request, Response } from 'express';

export const getAllAppointments = (req: Request, res: Response) => {
  res.send('Listado de todos los turnos');
};

export const getAppointmentById = (req: Request, res: Response) => {
  res.send(`Detalle del turno con ID ${req.params.id}`);
};

export const scheduleAppointment = (req: Request, res: Response) => {
  res.send('Agendar un nuevo turno');
};

export const cancelAppointment = (req: Request, res: Response) => {
  res.send('Cancelar un turno');
};

import { Request, Response } from 'express';
import {getAllAppointmentsService, getAppointmentByIdService, createAppointmentService, cancelAppointmentService} from "../services/appointmentsService";
import { AppointmentScheduleDto } from '../dto/AppointmentDto';


// Obtenemos el listado de todos los turnos.
export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    // Esperar la respuesta del servicio
    const appointments = await getAllAppointmentsService();
    res.status(200).json(appointments); // Enviar los turnos con un estado 200 OK
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al obtener los turnos:', error.message);
      res.status(404).json({ message: 'No se pudieron obtener los turnos. Por favor, inténtelo más tarde.' });
    } else {
      console.error('Error desconocido al obtener los turnos:', error);
      res.status(404).json({ message: 'Ocurrió un error inesperado. Por favor, inténtelo más tarde.' });
    }
  }
};


// Obtenemos los detalles de un turno especifico.
export const getAppointmentById = async(req: Request <{id: string}>, res: Response): Promise<void> => {
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

export const scheduleAppointment = async ( req: Request<unknown, unknown, AppointmentScheduleDto>, res: Response): Promise<void> => {
  try {
    const { description, date, hour, userId } = req.body;

    // Validación inicial de datos
    if ( !description || !date || !hour || !userId) {
      res.status(400).json({ message: 'Faltan datos para agendar el turno.' });
      return;
    }

    // Llamar al servicio para crear el turno
    const appointment = await createAppointmentService(req.body);
    res.status(201).json({ message: 'Turno creado exitosamente.', appointment });

  } catch (error) {
    // Manejar errores específicos
    const err = error as Error;
    if (err.message.includes('usuario con ID')) {
      res.status(404).json({ message: err.message });
    } else if (err.message.includes('Faltan datos')) {
      res.status(400).json({ message: err.message });
    } else {
      // Errores generales del servidor
      console.error('Error interno al agendar el turno:', error);
      res.status(500).json({ message: 'No se pudo agendar el turno. Por favor, inténtelo más tarde.' });
    }
  }
};

// CANCELACIÓN DE TURNO: Cambiamos el estado de un turno a “cancelled”.
export const cancelAppointmentById = async ( req: Request<{ id: string }>, res: Response): Promise<void> => {
  const appointmentId = parseInt(req.body.id); // Usar params en lugar de body para ID

  if (!appointmentId) {    

    res.status(400).json({ message: 'El ID del turno debe ser un número válido.' });
    return;
  }

  try {
    const appointmentSuccess = await cancelAppointmentService(appointmentId);

    if (appointmentSuccess) {
      res.status(200).json({ message: 'Turno cancelado exitosamente.' });

    } else {

      res.status(404).json({ message: 'No se pudo cancelar el turno porque no se encontró.' });
    }
  } catch (error) {
    if (error instanceof Error) {

      // Manejamos errores lanzados desde el servicio
      if (error.message.includes('No se encontró un turno')) {

        res.status(404).json({ message: error.message });

      } else {

        res.status(404).json({ message: error.message });
      }
    } else {
      // Manejamos errores desconocidos
      console.error(`Error desconocido al cancelar el turno con ID ${appointmentId}:`, error);
      res.status(500).json({ message: 'Error desconocido. Por favor, inténtelo más tarde.' });
    }
  }
};


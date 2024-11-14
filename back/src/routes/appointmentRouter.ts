import express, { Request, Response } from 'express';
import { getAppointments, getAppointment, scheduleAppointment, cancelAppointmentById } from '../controllers/appointmentController';
import { AppointmentScheduleDto } from '../dto/AppointmentDto';

const router = express.Router();

router.get('/', (req: Request, res: Response) => getAppointments(req, res));
router.get('/:id', (req: Request <{id: string}>, res: Response) =>  getAppointment(req, res));
router.post('/schedule', (req: Request < unknown, unknown, AppointmentScheduleDto>, res: Response) =>  scheduleAppointment(req, res));
router.put('/cancel', (req: Request <{id: string}>, res: Response) =>  cancelAppointmentById(req, res));

export default router;

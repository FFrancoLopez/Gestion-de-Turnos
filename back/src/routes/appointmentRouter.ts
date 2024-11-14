import express from 'express';
import { getAppointments, getAppointment, scheduleAppointment, cancelAppointmentById } from '../controllers/appointmentController';

const router = express.Router();

router.get('/', getAppointments);
router.get('/:id', getAppointment);
router.post('/schedule', scheduleAppointment);
router.put('/cancel', cancelAppointmentById);

export default router;

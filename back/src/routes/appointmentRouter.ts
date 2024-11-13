import express from 'express';
import { getAllAppointments, getAppointmentById, scheduleAppointment, cancelAppointment } from '../controllers/appointmentController';

const router = express.Router();

router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);
router.post('/schedule', scheduleAppointment);
router.put('/cancel', cancelAppointment);

export default router;

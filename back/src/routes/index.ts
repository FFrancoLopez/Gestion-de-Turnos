// Exporta todas las rutas.

import { Router } from "express";
import userRouter from "./usersRouter";
import appointmentRoutes from "./appointmentRouter";

const router: Router = Router();


router.use('/users', userRouter);
router.use('/appointments', appointmentRoutes);

export default router;

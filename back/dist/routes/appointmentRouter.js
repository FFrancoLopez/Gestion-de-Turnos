"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentController_1 = require("../controllers/appointmentController");
const router = express_1.default.Router();
router.get('/', (req, res) => (0, appointmentController_1.getAppointments)(req, res));
router.get('/:id', (req, res) => (0, appointmentController_1.getAppointmentById)(req, res));
router.post('/schedule', (req, res) => (0, appointmentController_1.scheduleAppointment)(req, res));
router.put('/cancel/:id', (req, res) => (0, appointmentController_1.cancelAppointmentById)(req, res));
exports.default = router;

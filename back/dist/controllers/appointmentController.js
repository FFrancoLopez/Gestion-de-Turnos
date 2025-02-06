"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentById = exports.scheduleAppointment = exports.getAppointmentById = exports.getAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
// Obtenemos el listado de todos los turnos.
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Esperar la respuesta del servicio
        const appointments = yield (0, appointmentsService_1.getAllAppointmentsService)();
        res.status(200).json(appointments); // Enviar los turnos con un estado 200 OK
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los turnos:', error.message);
            res.status(404).json({ message: 'No se pudieron obtener los turnos. Por favor, inténtelo más tarde.' });
        }
        else {
            console.error('Error desconocido al obtener los turnos:', error);
            res.status(404).json({ message: 'Ocurrió un error inesperado. Por favor, inténtelo más tarde.' });
        }
    }
});
exports.getAppointments = getAppointments;
// Obtenemos los detalles de un turno especifico.
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = parseInt(req.params.id);
    if (isNaN(appointmentId)) {
        res.status(400).json({ message: 'El ID del turno debe ser un número válido.' });
        return;
    }
    try {
        const appointment = yield (0, appointmentsService_1.getAppointmentByIdService)(appointmentId);
        if (!appointment) {
            res.status(404).json({ message: 'Turno no encontrado.' });
            return;
        }
        res.json(appointment);
    }
    catch (error) {
        console.error(`Error al obtener el turno con ID ${appointmentId}:`, error);
        res.status(500).json({ message: 'No se pudo obtener el turno. Por favor, inténtelo más tarde.' });
    }
});
exports.getAppointmentById = getAppointmentById;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, userId } = req.body;
        if (!date || !time || !userId) {
            res.status(400).json({ message: "Faltan datos para agendar el turno." });
            return;
        }
        // Llamar al servicio para crear el turno
        const appointment = yield (0, appointmentsService_1.createAppointmentService)(req.body);
        res.status(201).json({ message: "Turno creado exitosamente.", appointment });
    }
    catch (error) {
        const err = error;
        if (err.message.includes("Ya tienes un turno reservado")) {
            res.status(400).json({ message: err.message }); // Turno duplicado
        }
        else if (err.message.includes("usuario con ID")) {
            res.status(404).json({ message: err.message }); // Usuario no encontrado
        }
        else {
            console.error("Error interno al agendar el turno:", error);
            res.status(500).json({
                message: "No se pudo agendar el turno. Por favor, inténtelo más tarde.",
            });
        }
    }
});
exports.scheduleAppointment = scheduleAppointment;
// CANCELACIÓN DE TURNO: Cambiamos el estado de un turno a “cancelled”.
const cancelAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = parseInt(req.params.id); // Usar params en lugar de body para ID
    if (!appointmentId) {
        res.status(400).json({ message: 'El ID del turno debe ser un número válido.' });
        return;
    }
    try {
        const appointmentSuccess = yield (0, appointmentsService_1.cancelAppointmentService)(appointmentId);
        if (appointmentSuccess) {
            res.status(200).json({ message: 'Turno cancelado exitosamente.' });
        }
        else {
            res.status(404).json({ message: 'No se pudo cancelar el turno porque no se encontró.' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            // Manejamos errores lanzados desde el servicio
            if (error.message.includes('No se encontró un turno')) {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(404).json({ message: error.message });
            }
        }
        else {
            // Manejamos errores desconocidos
            console.error(`Error desconocido al cancelar el turno con ID ${appointmentId}:`, error);
            res.status(500).json({ message: 'Error desconocido. Por favor, inténtelo más tarde.' });
        }
    }
});
exports.cancelAppointmentById = cancelAppointmentById;

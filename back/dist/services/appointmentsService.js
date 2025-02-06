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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
const IAppointment_1 = require("../interfaces/IAppointment");
// Obtenemos todos los turnos con sus relaciones.
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscamos los turnos junto con la relación "user"
        const appointments = yield data_source_1.AppointmentModel.find({
            relations: ['user'], // Incluimos las relaciones necesarias
        });
        return appointments;
    }
    catch (error) {
        if (error instanceof Error) {
            // Manejo de errores conocidos
            console.error('Error al obtener turnos:', error.message);
            throw new Error('No se pudieron obtener los turnos. Por favor, inténtelo más tarde.');
        }
        else {
            // Manejo de errores desconocidos
            console.error('Error desconocido al obtener turnos:', error);
            throw new Error('Ocurrió un error inesperado al intentar obtener los turnos.');
        }
    }
});
exports.getAllAppointmentsService = getAllAppointmentsService;
// Obtenemos un turno por ID.
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield data_source_1.AppointmentModel.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!appointment) {
            throw new Error(`Turno con ID ${id} no encontrado.`);
        }
        return appointment;
    }
    catch (error) {
        console.error(`Error al obtener turno con ID ${id}:`, error);
        throw new Error(`No se pudo obtener el turno con ID ${id}.`);
    }
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (appointmentDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = appointmentDto;
    // Validamos datos de entrada
    if (!date || !time || !userId) {
        throw new Error("Faltan datos obligatorios para crear el turno.");
    }
    try {
        // Verifica si el usuario existe
        const user = yield data_source_1.UserModel.findOneBy({ id: userId });
        if (!user) {
            throw new Error(`El usuario con ID ${userId} no existe.`);
        }
        // Validación: Verificar si ya existe un turno en el mismo horario
        const existingAppointment = yield data_source_1.AppointmentModel.findOne({
            where: {
                user: { id: userId },
                date,
                time,
                state: IAppointment_1.Status.Active, // Solo busca turnos activos
            },
        });
        if (existingAppointment) {
            throw new Error("Ya tienes un turno reservado en esta fecha y hora.");
        }
        // Crear y guardar el turno
        const newAppointment = data_source_1.AppointmentModel.create({
            date,
            time,
            state: IAppointment_1.Status.Active,
            user,
        });
        return yield data_source_1.AppointmentModel.save(newAppointment);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error("Ocurrió un error desconocido al intentar crear el turno.");
        }
    }
});
exports.createAppointmentService = createAppointmentService;
// Cancelamos un turno por ID (cambiamos su estado a "Cancelled").
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscar el turno por ID
        const appointment = yield (0, exports.getAppointmentByIdService)(id);
        if ((appointment === null || appointment === void 0 ? void 0 : appointment.state) === IAppointment_1.Status.Cancelled) {
            throw new Error(`El turno con el ID ${id} ya fue cancelado`);
        }
        if (!appointment) {
            throw new Error(`No se encontró un turno con ID ${id}.`);
        }
        // Actualizamos el estado del turno
        appointment.state = IAppointment_1.Status.Cancelled;
        yield data_source_1.AppointmentModel.save(appointment);
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error al cancelar el turno con ID ${id}:`, error.message);
            throw new Error(error.message);
        }
        else {
            console.error(`Error desconocido al cancelar el turno con ID ${id}:`, error);
            throw new Error('Ocurrió un error inesperado al intentar cancelar el turno.');
        }
    }
});
exports.cancelAppointmentService = cancelAppointmentService;

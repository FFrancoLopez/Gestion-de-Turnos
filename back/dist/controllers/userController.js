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
exports.loginUser = exports.registerUser = exports.getUserById = exports.getAllUsers = void 0;
const usersService_1 = require("../services/usersService");
const credentialsService_1 = require("../services/credentialsService");
// Obtemos el listado de todos los usuarios.
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (_a) {
        res.status(404).json({ message: 'Usuarios no encontrados.' });
    }
});
exports.getAllUsers = getAllUsers;
// Obtenemos los detalles de un usuario especifico.
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const user = yield (0, usersService_1.getUserByIdService)(userId);
        res.status(200).json(user);
    }
    catch (_a) {
        res.status(404).json({ message: `Usuario con ID ${userId} no encontrado.` });
        return;
    }
});
exports.getUserById = getUserById;
// Registramos un nuevo usuario.
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, usersService_1.createUserService)(req.body);
        res.status(201).json(newUser);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error al registrar el usuario.",
            details: err.field ? [{ field: err.field, message: err.message }] : [{ field: "general", message: "Error desconocido." }],
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Validamos las credenciales
        const credential = yield (0, credentialsService_1.validateCredentialService)(username, password);
        if (credential !== null) {
            res.status(200).json({
                login: true,
                user: {
                    id: credential.user.id,
                    name: credential.user.name,
                    email: credential.user.email,
                    birthdate: credential.user.birthdate,
                    nDni: credential.user.DNI,
                },
            });
        }
        else {
            // Si las credenciales no son válidas, lanzar un error genérico
            throw { field: "username", message: "Usuario o contraseña incorrectos" };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        if (error.message.includes("incorrecta")) {
            res.status(400).json({
                field: "password",
                message: "La contraseña es incorrecta",
            });
        }
        else if (error.message.includes("no fue encontrado")) {
            res.status(400).json({
                field: "username",
                message: "El usuario no fue encontrado",
            });
        }
        else {
            // En caso de un error inesperado
            res.status(500).json({
                field: "general",
                message: "Ocurrió un error inesperado. Inténtelo nuevamente más tarde.",
            });
        }
    }
});
exports.loginUser = loginUser;

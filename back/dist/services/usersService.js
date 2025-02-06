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
exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const credentialsService_1 = require("./credentialsService");
const Credential_1 = require("../entities/Credential");
//  Obtienemos todos los usuarios con sus relaciones.
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield data_source_1.UserModel.find({
            relations: ['credential', 'appointments'], // Cargamos las relaciones que necesitamos.
        });
        return users;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('No se pudieron obtener los usuarios. Por favor, inténtelo más tarde.');
    }
});
exports.getAllUsersService = getAllUsersService;
// Obtienemos un usuario por ID, con sus relaciones.
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield data_source_1.UserModel.findOne({
            where: { id },
            relations: ['appointments'],
        });
        if (!user) {
            throw new Error(`Usuario con ID ${id} no encontrado.`);
        }
        return user;
    }
    catch (error) {
        console.error(`Error al obtener usuario con ID ${id}:`, error);
        throw new Error(`No se pudo obtener el usuario con ID ${id}.`);
    }
});
exports.getUserByIdService = getUserByIdService;
// Creamos un nuevo usuario y asociamos su credencial
const createUserService = (userDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, nDni } = userDto;
    // Validaciones previas para evitar duplicados
    const existingEmail = yield data_source_1.UserModel.findOne({ where: { email } });
    if (existingEmail) {
        throw { field: "email", message: "El email ya está en uso." };
    }
    const existingUsername = yield data_source_1.AppDataSource.getRepository(Credential_1.Credential).findOne({ where: { username } });
    if (existingUsername) {
        throw { field: "username", message: "El nombre de usuario ya está en uso." };
    }
    const existingDni = yield data_source_1.UserModel.findOne({ where: { DNI: nDni } });
    if (existingDni) {
        throw { field: "nDni", message: "El DNI ya está en uso." };
    }
    // Transacción para crear usuario y asociar credenciales
    try {
        const result = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
            // Crear credenciales
            const userCredentials = yield (0, credentialsService_1.createCredentialService)(entityManager, username, userDto.password);
            // Crear usuario
            const newUser = entityManager.create(User_1.User, {
                name: userDto.name,
                email,
                birthdate: userDto.birthdate,
                DNI: nDni,
                credential: userCredentials,
            });
            return yield entityManager.save(newUser);
        }));
        return result;
    }
    catch (err) {
        console.error("Error al crear el usuario:", { userDto, err });
        throw { field: "general", message: "No se pudo crear el usuario. Verifique su fecha de nacimiento e intentelo nuevamente. " };
    }
});
exports.createUserService = createUserService;

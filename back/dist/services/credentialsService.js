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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialByIdService = exports.validateCredentialService = exports.createCredentialService = void 0;
const data_source_1 = require("../config/data-source");
const Credential_1 = require("../entities/Credential");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Función para cifrar la contraseña usando bcrypt.
const crypPass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10; // Puedes ajustar los rounds según tus necesidades
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
});
// Creamos una nueva credencial.
const createCredentialService = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username || !password) {
            throw new Error("El nombre de usuario y la contraseña son obligatorios.");
        }
        const passwordEncripted = yield crypPass(password);
        const credentials = entityManager.create(Credential_1.Credential, {
            username: username,
            password: passwordEncripted
        });
        // Guardamos nueva credencial
        return yield entityManager.save(credentials);
    }
    catch (error) {
        console.error("Error al crear la credencial:", error);
        throw new Error("No se pudo crear la credencial.");
    }
});
exports.createCredentialService = createCredentialService;
// Valida credenciales por nombre de usuario y contraseña.
const validateCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validaciones previas
        if (!username) {
            throw { field: "username", message: "El nombre de usuario es obligatorio." };
        }
        if (!password) {
            throw { field: "password", message: "La contraseña es obligatoria." };
        }
        // Buscamos la credencial por nombre de usuario.
        const credentialRepository = data_source_1.CredentialModel;
        const credential = yield credentialRepository.findOne({
            where: { username },
            relations: ["user"],
        });
        if (!credential) {
            throw { field: "username", message: `El usuario ${username} no fue encontrado.` };
        }
        // Comparamos la contraseña ingresada con la almacenada en la base de datos
        const passwordMatch = yield bcrypt_1.default.compare(password, credential.password);
        if (!passwordMatch) {
            throw { field: "password", message: "La contraseña es incorrecta." };
        }
        return credential; // Retornamos la credencial si las credenciales son correctas
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.error(`Error al validar credenciales para ${username}:`, error);
        if (error.field && error.message) {
            throw error;
        }
        else {
            // error inesperado:
            throw { field: "general", message: "No se pudo validar las credenciales. Intenta nuevamente." };
        }
    }
});
exports.validateCredentialService = validateCredentialService;
// Obtiene una credencial por ID.
const getCredentialByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentialRepository = data_source_1.CredentialModel;
        const credential = yield credentialRepository.findOneBy({ id });
        if (!credential) {
            throw new Error(`Credencial con ID ${id} no encontrada.`);
        }
        return credential;
    }
    catch (error) {
        console.error(`Error al obtener credencial con ID ${id}:`, error);
        throw new Error("No se pudo obtener la credencial.");
    }
});
exports.getCredentialByIdService = getCredentialByIdService;

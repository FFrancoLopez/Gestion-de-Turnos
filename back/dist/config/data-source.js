"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = exports.CredentialModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Appointment_1 = require("../entities/Appointment");
const Credential_1 = require("../entities/Credential");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: envs_1.DB_TYPE,
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: envs_1.DB_SYNC,
    dropSchema: envs_1.DB_DROP,
    logging: envs_1.DB_LOGGING,
    entities: envs_1.DB_ENTITIES,
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User);
exports.CredentialModel = exports.AppDataSource.getRepository(Credential_1.Credential);
exports.AppointmentModel = exports.AppDataSource.getRepository(Appointment_1.Appointment);

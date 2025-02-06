import { DataSource, Repository } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import { DB_DROP, DB_ENTITIES, DB_HOST, DB_LOGGING, DB_NAME, DB_PASSWORD, DB_PORT, DB_SYNC, DB_TYPE, DB_USERNAME } from "./envs";

console.log("🔍 Verificando variables de entorno:");
console.log("DB_TYPE:", DB_TYPE);
console.log("DB_HOST:", DB_HOST);
console.log("DB_PORT:", DB_PORT);
console.log("DB_USERNAME:", DB_USERNAME);
console.log("DB_PASSWORD:", DB_PASSWORD ? "✔️ Cargada" : "❌ No cargada");
console.log("DB_NAME:", DB_NAME);
console.log("DB_SYNC:", DB_SYNC);
console.log("DB_DROP:", DB_DROP);
console.log("DB_LOGGING:", DB_LOGGING);

export const AppDataSource = new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: DB_SYNC,
    dropSchema: DB_DROP,
    logging: DB_LOGGING,
    entities: DB_ENTITIES,
})

export const UserModel: Repository<User> = AppDataSource.getRepository(User)
export const CredentialModel: Repository<Credential> = AppDataSource.getRepository(Credential)
export const AppointmentModel: Repository<Appointment> = AppDataSource.getRepository(Appointment)

// import "dotenv/config";

// export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;


// // eslint-disable-next-line @typescript-eslint/prefer-as-const
// export const DB_TYPE: "postgres" = "postgres"

// export const DB_HOST: string | undefined = process.env.DB_HOST

// export const DB_PORT: number | undefined = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10): undefined

// export const DB_USERNAME: string | undefined = process.env.DB_USERNAME

// export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD

// export const DB_NAME: string |undefined = process.env.DB_NAME

// export const DB_SYNC: boolean = process.env.DB_SYNC ? process.env.DB_SYNC === "true" : true 

// export const DB_DROP: boolean = process.env.DB_DROP ? process.env.DB_DROP === "true" : true 

// export const DB_LOGGING: boolean = process.env.DB_LOGGING ? process.env.DB_LOGGING === "true" : true

import dotenv from "dotenv";
import path from "path";

// Cargar las variables de entorno explícitamente desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const PORT = process.env.PORT || 3000;
export const DB_TYPE = process.env.DB_TYPE as "postgres";  
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "demo_typeorm";
export const DB_SYNC = process.env.DB_SYNC === "true";
export const DB_DROP = process.env.DB_DROP === "true";
export const DB_LOGGING = process.env.DB_LOGGING === "true";
export const DB_ENTITIES: string[] = process.env.DB_ENTITIES ? process.env.DB_ENTITIES.split(',') : ["src/entities/**/*.ts"]

console.log("🔍 Verificando variables de entorno cargadas:");
console.log({ DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SYNC });


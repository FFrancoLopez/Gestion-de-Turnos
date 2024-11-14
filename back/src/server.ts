// Configuración y exportación del servidor Express:

import express, {Application} from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";

const server: Application = express();

server.use(express.json());

server.use(morgan("dev"));

server.use(cors());

server.use(routes);

export default server;
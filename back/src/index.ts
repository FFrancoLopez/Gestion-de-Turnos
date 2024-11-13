// Archivo principal que inicia la aplicación:

import server from "./server";
import { PORT } from "./config/envs";

server.listen(PORT, () =>{
  console.log(`Server listening on port ${PORT}`);
})

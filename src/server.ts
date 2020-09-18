import "reflect-metadata";

import { container } from "@config/container";
import App from "@config/express";

(async () => {
  const server = await new App(container).createApp();

  server.listen(process.env.PORT_SERVER || 3001, () => {
    console.log(`Server iniciando na porta ${process.env.PORT_SERVER || 3001}`);
  });
})();

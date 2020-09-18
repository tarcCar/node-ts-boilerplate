import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import path from "path";

import UsuarioLogadoProvider from "@middlewares/usuarioLogadoProvider";

import { bindings } from "../inversify.config";
import SwaggerConfig from "./swagger";

class App {
  private _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  private middlewares(expressApp: express.Application): void {
    expressApp.use(express.json());
    expressApp.use(cors());
    expressApp.use(helmet());
    expressApp.use(compression({ level: 9 }));
    new SwaggerConfig(expressApp);
    expressApp.use(express.static(path.join(__dirname, "..", "public")));
  }

  private async createContainer() {
    await this._container.loadAsync(bindings);
  }

  public async createApp(): Promise<express.Application> {
    await this.createContainer();
    const app = new InversifyExpressServer(
      this._container,
      null,
      null,
      null,
      UsuarioLogadoProvider
    );

    app.setConfig((expressApp) => {
      this.middlewares(expressApp);
    });

    return app.build();
  }
}

export default App;

/* eslint-disable global-require */
import { AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";

import { getDbConnection } from "@config/db";
import { Exemple } from "@models/exemple";
import { Usuario } from "@models/usuario";
import { ExempleService } from "@services/exempleService";
import { UsuarioService } from "@services/usuarioService";

import { TYPE_DI } from "./constants/typesInjecaoDependencia";
import getRepository from "./repositories/getRepository";

export const bindings = new AsyncContainerModule(async (bind) => {
  await getDbConnection();
  // Carrega todos os controller para as rotas ficarem disponiveis
  await require("@controllers/index");

  // API
  // bind<AxiosInstance>(TYPE_DI.CnpjaAPI)
  //   .toDynamicValue(() => {
  //     return getAxiosInstanceAPI();
  //   })
  //   .inSingletonScope();

  // Repositorios
  bind<Repository<Exemple>>(TYPE_DI.ExempleRepository)
    .toDynamicValue(() => {
      return getRepository<Exemple>(Exemple);
    })
    .inRequestScope();

  bind<Repository<Usuario>>(TYPE_DI.UsuarioRepository)
    .toDynamicValue(() => {
      return getRepository<Usuario>(Usuario);
    })
    .inRequestScope();
  // Services
  bind<ExempleService>(ExempleService).toSelf();
  bind<UsuarioService>(UsuarioService).toSelf();
});

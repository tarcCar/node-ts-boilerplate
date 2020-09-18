import * as express from "express";
import { Container } from "inversify";
import { Repository } from "typeorm";

import { container } from "@config/container";
import { TYPE_DI } from "@constants/typesInjecaoDependencia";
import { Usuario } from "@models/usuario";
import { getTokenFromHeader, verifyToken } from "@utils/token";

function authMiddlewareFactory(containerMiddleware: Container) {
  return (config?: { roles: string[] }) => {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const usuarioRepository = containerMiddleware.get<Repository<Usuario>>(
        TYPE_DI.UsuarioRepository
      );

      (async () => {
        // get email using auth token
        const header = req.headers.authorization as string;
        const token = getTokenFromHeader(header);

        if (token === null) {
          res.status(401).send("Token inválido");
        } else {
          try {
            const decoded = await verifyToken(token);
            const usuario = await usuarioRepository.findOneOrFail(decoded.id);

            if (!usuario.ativo) {
              res.status(401).send("Usuário não está ativo!");
            } else if (
              !config ||
              !config.roles ||
              config.roles.length === 0 ||
              (usuario.role && config.roles.indexOf(usuario.role) >= 0)
            ) {
              next();
            } else {
              res.status(403).send("Usuário não sem permissão");
            }
          } catch (error) {
            console.log(error);
            res.status(401).send("Token inválido");
          }
        }
      })();
    };
  };
}

const authMiddleware = authMiddlewareFactory(container);

export { authMiddleware };

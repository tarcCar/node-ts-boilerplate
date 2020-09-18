import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { interfaces } from "inversify-express-utils";

import { Principal } from "@type/Principal";
import { getTokenFromHeader, verifyToken, TokenData } from "@utils/token";

@injectable()
export default class UsuarioLogadoProvider implements interfaces.AuthProvider {
  public async getUser(
    req: Request,
    __: Response,
    _: NextFunction
  ): Promise<interfaces.Principal> {
    const header = req.headers.authorization as string;
    const token = getTokenFromHeader(header);
    let tokenData: TokenData = null;

    try {
      if (token) tokenData = await verifyToken(token);
    } catch (error) {
      console.log(error);
      tokenData = null;
    }

    const principal = new Principal(tokenData);
    return principal;
  }
}

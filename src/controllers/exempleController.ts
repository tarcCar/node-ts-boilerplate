import { controller, httpGet, interfaces } from "inversify-express-utils";

import { ROLES } from "@constants/roles";
import { authMiddleware } from "@middlewares/authMiddleware";
import { ExempleService } from "@services/exempleService";
import { Controller } from "@type/Controller";

@controller("/api/exemple", authMiddleware({ roles: [ROLES.ADMIN] }))
export class ExempleController extends Controller {
  public constructor(private readonly exempleService: ExempleService) {
    super();
  }

  /**
   * @swagger
   * /api/exemple:
   *   get:
   *     tags:
   *       - Exemple
   *       - Admin
   *     description: Endpoint de exemplo
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *          description: Exemplo
   *          schema:
   *                $ref: '#/definitions/Exemplo'
   *       401:
   *          description: Token inválido
   *       405:
   *          description: Token é válido porém sem permissão
   *     security:
   *       - api_key
   */
  @httpGet("/")
  public async get(): Promise<interfaces.IHttpActionResult> {
    try {
      return this.ok(await this.exempleService.listar());
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }
}

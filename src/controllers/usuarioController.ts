import { body, param } from "express-validator";
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  interfaces,
  httpPatch,
  requestParam,
} from "inversify-express-utils";

import { ROLES } from "@constants/roles";
import { authMiddleware } from "@middlewares/authMiddleware";
import { Usuario } from "@models/usuario";
import { UsuarioService } from "@services/usuarioService";
import { Controller } from "@type/Controller";

const postUsuarioValidator = [
  body("nome")
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({ min: 3 })
    .withMessage("Nome precisa pelo menos 3 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("E-mail é obrigatório")
    .isEmail()
    .withMessage("E-mail precisa ser um e-mail válido"),
  body("senha")
    .notEmpty()
    .withMessage("Senha é obrigatória")
    .isLength({ min: 6 })
    .withMessage("Nome precisa pelo menos 6 caracteres"),
];
const patchAtivoUsuarioValidator = [
  param("id")
    .notEmpty()
    .withMessage("Id do usuário é obrigatório")
    .bail()
    .isInt({
      min: 0,
    })
    .withMessage("Id do usuário precisar se maior que 0")
    .toInt(),
  param("ativo")
    .notEmpty()
    .withMessage("Ativo é obrigatório")
    .bail()
    .isBoolean()
    .withMessage("Ativo inválido")
    .toBoolean(),
];

@controller("/api/usuario", authMiddleware({ roles: [ROLES.ADMIN] }))
export class UsuarioController extends Controller {
  public constructor(private readonly usuarioService: UsuarioService) {
    super();
  }

  /**
   * @swagger
   * /api/usuario:
   *   get:
   *     tags:
   *       - Usuario
   *       - Admin
   *     description: Lista todos os usuarios
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *          description: Um array de usuarios
   *          schema:
   *                $ref: '#/definitions/Usuario'
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
      return this.ok(await this.usuarioService.listar());
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }

  /**
   * @swagger
   * /api/usuario:
   *   post:
   *     tags:
   *       - Usuario
   *       - Admin
   *     description: Salva um nova Usuario
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: usuario
   *         description: Usuario
   *         in: body
   *         required: true
   *         schema:
   *             $ref: '#/definitions/Usuario'
   *     responses:
   *       200:
   *         description: Novo Usuario
   *         schema:
   *           $ref: '#/definitions/Usuario'
   *       400:
   *          description: Algum erro de válidação
   *       401:
   *          description: Token inválido
   *       405:
   *          description: Token é válido porém sem permissão
   *     security:
   *       - api_key
   */

  @httpPost("/", ...postUsuarioValidator)
  public async post(
    @requestBody() usuario: Usuario
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this.usuarioService.salvar(usuario));
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }

  /**
   * @swagger
   * /api/usuario/{id}/ativo/{ativo}:
   *   patch:
   *     tags:
   *       - Usuario
   *       - Admin
   *     description: Alterar o status ativo de um Usuario
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: id do usuario
   *         in: path
   *         required: true
   *         schema:
   *             type: integer
   *             format: int64
   *       - name: ativo
   *         description: novo status do ativo do usuario
   *         in: path
   *         required: true
   *         schema:
   *             type: booelan
   *     responses:
   *       200:
   *         description: Reposta vazia indicando que deu certo
   *       400:
   *          description: Algum erro de válidação
   *       401:
   *          description: Token inválido
   *       404:
   *          description: Usuário não encontrado
   *       405:
   *          description: Token é válido porém sem permissão
   *     security:
   *       - api_key
   */
  @httpPatch("/{id}/ativo/{ativo}", ...patchAtivoUsuarioValidator)
  public async patch(
    @requestParam() id: number,
    @requestParam() ativo: boolean
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();

    if (errosValidacao) {
      return errosValidacao;
    }

    try {
      const usuario = await this.usuarioService.buscarPorId(id);

      if (!usuario) {
        return this.notFound();
      }

      if (usuario.ativo !== ativo) usuario.ativo = ativo;
      await this.usuarioService.salvar(usuario);

      return this.ok();
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }
}

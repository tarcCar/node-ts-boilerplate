import { injectable, inject } from "inversify";
import { Repository } from "typeorm";

import { TYPE_DI } from "@constants/typesInjecaoDependencia";
import { Usuario } from "@models/usuario";

@injectable()
export class UsuarioService {
  public constructor(
    @inject(TYPE_DI.UsuarioRepository)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  public async salvar(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(this.usuarioRepository.create(usuario));
  }

  public async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      select: ["id", "nome", "email", "createdDate", "updatedDate"],
    });
  }

  public async buscarPorId(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
  }
}

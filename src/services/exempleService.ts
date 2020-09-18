import { injectable, inject } from "inversify";
import { Repository } from "typeorm";

import { TYPE_DI } from "@constants/typesInjecaoDependencia";
import { Exemple } from "@models/exemple";

@injectable()
export class ExempleService {
  public constructor(
    @inject(TYPE_DI.ExempleRepository)
    private readonly exempleRepository: Repository<Exemple>
  ) {}

  public async listar(): Promise<Exemple[]> {
    return this.exempleRepository.find({
      select: ["id", "descricao"],
    });
  }
}

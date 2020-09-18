import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BasicModel {
  @CreateDateColumn({
    select: false,
  })
  createdDate: Date;

  @UpdateDateColumn({
    select: false,
  })
  updatedDate: Date;
}

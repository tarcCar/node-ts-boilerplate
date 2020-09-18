import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { BasicModel } from "./basicModel";

/**
 * @swagger
 * definitions:
 *   Exemple:
 *     properties:
 *       id:
 *         type: number
 *       descricao:
 *         type: string
 */
@Entity()
export class Exemple extends BasicModel {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    unique: true,
  })
  public descricao!: string;
}

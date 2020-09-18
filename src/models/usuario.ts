import crypto from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

import { BasicModel } from "./basicModel";
/**
 * @swagger
 * definitions:
 *   Usuario:
 *     properties:
 *       id:
 *         type: number
 *       nome:
 *         type: string
 *       senha:
 *         type: string
 *         writeOnly: true
 *       email:
 *         type: string
 *       ativo:
 *         type: boolean
 *       role:
 *          type: string
 */
@Entity()
export class Usuario extends BasicModel {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public nome!: string;

  @Column({
    nullable: false,
    length: 100,
    select: false,
  })
  public senha!: string;

  @Column({
    nullable: false,
    unique: true,
  })
  public email!: string;

  @Column({
    nullable: false,
    default: true,
  })
  public ativo!: boolean;

  @Column({
    nullable: false,
  })
  public role!: string;

  @BeforeInsert()
  criptografarSenha(): void {
    const hash = crypto.createHash("sha256").update(this.senha).digest("hex");
    this.senha = hash;
    console.log(this.senha);
  }
}

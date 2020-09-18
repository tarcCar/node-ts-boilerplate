import { createConnection, Connection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export async function getDbConnection(): Promise<Connection> {
  const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
  const DATABASE_USER = process.env.DATABASE_USER || "postgres";
  const DATABASE_PORT = 5432;
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "password";
  const DATABASE_DB = "database_name";

  const conn = await createConnection({
    type: "postgres",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities: ["src/models/*.ts"],
    synchronize: true,
    logging: process.env.NODE_ENV !== "PRODUCTION",
    namingStrategy: new SnakeNamingStrategy(),
  });

  return conn;
}

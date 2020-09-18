import express from "express";
import swaggerJSDoc from "swagger-jsdoc";

export default class SwaggerConfig {
  constructor(private readonly app: express.Application) {
    this.config();
  }

  private config() {
    const swaggerDefinition = {
      info: {
        title: "API do APP",
        description: "Documentação Da API",
        version: "0.1",
      },
      host: "localhost:3001",
      basePath: "/",
      securitySchemes: {
        api_key: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          bearerFormat: "Bearer {token}",
        },
      },
    };

    const options = {
      // import swaggerDefinitions
      swaggerDefinition,
      // path to the API docs
      apis: ["src/controllers/*.ts", "src/models/*.ts", "src/models/dtos/*.ts"],
    };

    const swaggerSpec = swaggerJSDoc(options);
    this.app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  }
}

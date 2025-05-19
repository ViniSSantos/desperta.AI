import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const configurarSwagger = (app: Express): void => {
  const opcoes = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Desperta.AI API',
        version: '1.0.0',
        description: 'API para um despertador inteligente que fornece informações personalizadas',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
          description: 'Servidor de Desenvolvimento',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/rotas/*.ts', './src/dtos/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(opcoes);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Endpoint para obter o arquivo JSON Swagger
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',  // OK
    info: {
      title: 'My API Documentation',
      version: '1.0.0',
      description: 'API dokumentacija',
    },
    servers: [
      {
        url: 'http://localhost:1001',
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
      { bearerAuth: [] },
    ],
  },
  apis: ['./swagger/*.js'],
};

module.exports = swaggerJsdoc(swaggerOptions);

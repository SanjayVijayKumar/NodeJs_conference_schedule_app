const http = require('http');
const express = require('express');
const { routes } = require('./route');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swagger = require('./swagger.json');

const app = express();
app.use(express.json());
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: "http://localhost:3000",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./route.js"],
  };
  
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));

http.createServer(app).listen(3000, ()=>{
    routes(app);
    console.log('server started at 3000');
});


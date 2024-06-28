import fastify, { type FastifyInstance } from "fastify";

const app: FastifyInstance = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

app.listen({
  host: "0.0.0.0",
  port: 3001,
});

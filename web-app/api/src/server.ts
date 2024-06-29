import fastify, { type FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes.js";

const app: FastifyInstance = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

app.register(userRoutes, { prefix: "/users" });

app.listen({
  host: "0.0.0.0",
  port: 3001,
});

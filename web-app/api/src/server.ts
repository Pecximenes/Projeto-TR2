import fastify, { type FastifyInstance } from "fastify";
import { userRoutes } from "./routes/index.js";

const app: FastifyInstance = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

try {
  app.register(userRoutes, { prefix: "/users" });

  await app.listen({
    host: "0.0.0.0",
    port: 3001,
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}

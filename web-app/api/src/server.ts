import fastify, { type FastifyInstance } from "fastify";
import { gatewayRoutes, tankRoutes, userRoutes } from "./routes/index.js";

const app: FastifyInstance = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

try {
  app.register(userRoutes, { prefix: "/users" });
  app.register(gatewayRoutes, { prefix: "/gateways" });
  app.register(tankRoutes, { prefix: "/tanks" });

  await app.listen({
    host: "0.0.0.0",
    port: 3001,
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}

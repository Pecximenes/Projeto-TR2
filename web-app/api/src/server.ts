import fastify, { type FastifyInstance } from "fastify";
import { gatewayRoutes, tankLevelRoutes, tankRoutes } from "./routes/index.js";

const app: FastifyInstance = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

try {
  app.register(gatewayRoutes, { prefix: "/gateways" });
  app.register(tankRoutes, { prefix: "/tanks" });
  app.register(tankLevelRoutes, { prefix: "/tanklevels" });

  await app.listen({
    host: "0.0.0.0",
    port: 3001,
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}

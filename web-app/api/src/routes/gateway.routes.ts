import { FastifyInstance } from "fastify";
import type {
  GatewayController,
  GatewayCreate,
  GatewayUpdateOne,
} from "../interfaces/gateway.interfaces.js";
import { GatewayControllerPrisma } from "../controllers/gateway.controllers.js";

export async function gatewayRoutes(fastify: FastifyInstance) {
  const gatewayController: GatewayController = new GatewayControllerPrisma();

  fastify.get("/index", async (request, reply) => {
    try {
      const data = await gatewayController.getAll();
      return reply.status(200).send(data);
    } catch (error) {
      return reply.status(400).send(error);
    }
  });
  fastify.get("/index/infoless", async (request, reply) => {
    try {
      const data = await gatewayController.getAllInfoless();
      return reply.status(200).send(data);
    } catch (error) {
      return reply.status(400).send(error);
    }
  });
  fastify.get<{ Params: { id: string } }>(
    "/show/:id",
    async (request, reply) => {
      try {
        const data = await gatewayController.getOneById(request.params.id);
        return reply.status(200).send(data);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
  fastify.post<{ Body: GatewayCreate }>("/create", async (request, reply) => {
    try {
      const data = await gatewayController.create(request.body);
      return reply.status(201).send(data);
    } catch (error) {
      return reply.status(400).send(error);
    }
  });
  fastify.patch<{ Body: GatewayUpdateOne; Params: { id: string } }>(
    "/update/:id",
    async (request, reply) => {
      try {
        const data = await gatewayController.updateOne(
          request.body,
          request.params.id
        );
        return reply.status(200).send(data);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
  fastify.delete<{ Params: { id: string } }>(
    "/delete/:id",
    async (request, reply) => {
      try {
        const data = await gatewayController.deleteOne(request.params.id);
        return reply.status(200).send(data);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
}

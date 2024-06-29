import { FastifyInstance } from "fastify";
import type {
  TankController,
  TankCreate,
  TankUpdateOne,
} from "../interfaces/tank.interfaces.js";
import { TankControllerPrisma } from "../controllers/tank.controllers.js";

export async function tankRoutes(fastify: FastifyInstance) {
  const tankController: TankController = new TankControllerPrisma();

  fastify.get<{ Params: { id: string } }>(
    "/show/:id",
    async (request, reply) => {
      try {
        const data = await tankController.getOneById(request.params.id);
        return reply.status(200).send(data);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
  fastify.post<{ Body: TankCreate }>("/create", async (request, reply) => {
    try {
      const data = await tankController.create(request.body);
      return reply.status(200).send(data);
    } catch (error) {
      return reply.status(400).send(error);
    }
  });
  fastify.patch<{ Body: TankUpdateOne; Params: { id: string } }>(
    "/update/:id",
    async (request, reply) => {
      try {
        const data = await tankController.updateOne(
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
        const data = await tankController.deleteOneById(request.params.id);
        return reply.status(200).send(data);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
}

import { type FastifyInstance } from "fastify";
import type {
  TankLevelController,
  TankLevelCreate,
} from "../interfaces/tankLevel.intefaces.js";
import { TankLevelControllerPrisma } from "../controllers/tankLevel.controller.js";

export async function tankLevelRoutes(fastify: FastifyInstance) {
  const tankLevelController: TankLevelController =
    new TankLevelControllerPrisma();

  fastify.post<{ Body: TankLevelCreate }>("/create", async (request, reply) => {
    try {
      const data = await tankLevelController.create(request.body);
      return reply.status(200).send(data);
    } catch (error) {
      return reply.status(400).send(error);
    }
  });
  fastify.delete<{ Params: { id: string } }>(
    "/delete:id",
    async (request, reply) => {
      try {
        const data = await tankLevelController.deleteOne(request.params.id);
        return reply.status(200).send(data);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
}

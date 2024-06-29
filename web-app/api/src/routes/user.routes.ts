import { type FastifyInstance } from "fastify";
import type {
  UserCreate,
  UserController,
} from "../interfaces/user.interfaces.js";
import { UserControllerPrisma } from "../controllers/user.controllers.js";

export async function userRoutes(fastify: FastifyInstance) {
  const userController: UserController = new UserControllerPrisma();

  fastify.post<{ Body: UserCreate }>("/create", async (request, reply) => {
    try {
      const data = await userController.create(request.body);
      return reply.status(200).send(data);
    } catch (error) {
      reply.status(400).send(error);
    }
  });
}

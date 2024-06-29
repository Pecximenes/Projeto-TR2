import {
  User,
  UserController,
  UserCreate,
} from "../interfaces/user.interfaces.js";
import db from "../lib/db.js";
import z from "zod";

export class UserControllerPrisma implements UserController {
  async create(data: UserCreate): Promise<User> {
    const useCreateSchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
    });
    useCreateSchema.parse(data);

    const user = await db.user.create({
      data,
      select: { id: true, name: true, email: true },
    });
    return user;
  }
}

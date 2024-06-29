import { z } from "zod";
import type {
  GatewayController,
  GatewayCreate,
  GatewayGetAll,
  GatewayGetOne,
  GatewayUpdateOne,
} from "../interfaces/gateway.interfaces.js";
import db from "../lib/db.js";

export class GatewayControllerPrisma implements GatewayController {
  async getAll(): Promise<GatewayGetAll> {
    const gateways = await db.gateway.findMany();
    return gateways;
  }
  async getAllInfoless(): Promise<{ id: string; name: string }[]> {
    const gateways = await db.gateway.findMany({
      select: { id: true, name: true },
    });
    return gateways;
  }
  async getOneById(id: string): Promise<GatewayGetOne | null> {
    const gateway = await db.gateway.findFirst({
      where: { id },
      include: {
        tanks: {
          select: {
            id: true,
            arduinoId: true,
            name: true,
            address: true,
            description: true,
          },
        },
      },
    });
    return gateway;
  }
  async create(data: GatewayCreate): Promise<GatewayGetOne> {
    const DataSchema = z.custom<GatewayCreate>(async (data) => {
      const existsTankWithThisArduinoId = await db.tank.count({
        where: { arduinoId: data.arduinoId },
      });
      return !existsTankWithThisArduinoId;
    });

    DataSchema.parse(data);

    const gatewayCreated = await db.gateway.create({
      data,
      include: {
        tanks: {
          select: {
            id: true,
            arduinoId: true,
            name: true,
            address: true,
            description: true,
          },
        },
      },
    });
    return gatewayCreated;
  }
  async updateOne(data: GatewayUpdateOne, id: string): Promise<GatewayGetOne> {
    const updatedGateway = await db.gateway.update({
      data,
      where: { id },
      include: {
        tanks: {
          select: {
            id: true,
            arduinoId: true,
            name: true,
            address: true,
            description: true,
          },
        },
      },
    });
    return updatedGateway;
  }
  async deleteOne(id: string): Promise<GatewayGetOne> {
    const deletedGateway = await db.gateway.delete({
      where: { id },
      include: {
        tanks: {
          select: {
            id: true,
            arduinoId: true,
            name: true,
            address: true,
            description: true,
          },
        },
      },
    });
    return deletedGateway;
  }
}

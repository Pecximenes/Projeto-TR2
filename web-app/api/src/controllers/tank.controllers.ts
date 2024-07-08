import { z } from "zod";
import type {
  TankController,
  TankCreate,
  TankGetOne,
  TankUpdateOne,
} from "../interfaces/tank.interfaces.js";
import db from "../lib/db.js";

export class TankControllerPrisma implements TankController {
  async getOneById(id: string): Promise<TankGetOne | null> {
    const tank = await db.tank.findFirst({
      where: { id },
      select: {
        id: true,
        address: true,
        arduinoId: true,
        description: true,
        name: true,
        gateway: {
          select: {
            id: true,
            name: true,
            arduinoId: true,
          },
        },
        levels: {
          select: {
            id: true,
            caughtAt: true,
            frequencyError: true,
            level: true,
            snr: true,
            rssi: true,
          },
        },
      },
    });
    return tank;
  }
  async create(data: TankCreate): Promise<TankGetOne> {
    const DataSchema = z.custom<TankCreate>().refine(async (data) => {
      const existsGatewayWithThisArduinoId = await db.gateway.count({
        where: { arduinoId: data.arduinoId },
      });

      return !existsGatewayWithThisArduinoId;
    });
    await DataSchema.parseAsync(data);

    const createdTank = await db.tank.create({
      data,
      select: {
        id: true,
        address: true,
        arduinoId: true,
        description: true,
        name: true,
        gateway: {
          select: {
            id: true,
            name: true,
            arduinoId: true,
          },
        },
        levels: {
          select: {
            id: true,
            caughtAt: true,
            frequencyError: true,
            level: true,
            snr: true,
            rssi: true,
          },
        },
      },
    });
    return createdTank;
  }
  async updateOne(data: TankUpdateOne, id: string): Promise<TankGetOne> {
    const DataSchema = z.custom<TankUpdateOne>().refine(async (data) => {
      if (data.arduinoId) {
        const existsGatewayWithThisArduinoId = await db.gateway.count({
          where: { arduinoId: data.arduinoId },
        });

        return !existsGatewayWithThisArduinoId;
      }
      return true;
    });
    await DataSchema.parseAsync(data);

    const updatedTank = await db.tank.update({
      data,
      where: { id },
      select: {
        id: true,
        address: true,
        arduinoId: true,
        description: true,
        name: true,
        gateway: {
          select: {
            id: true,
            name: true,
            arduinoId: true,
          },
        },
        levels: {
          select: {
            id: true,
            caughtAt: true,
            frequencyError: true,
            level: true,
            snr: true,
            rssi: true,
          },
        },
      },
    });
    return updatedTank;
  }
  async deleteOneById(id: string): Promise<TankGetOne> {
    const deletedTank = await db.tank.delete({
      where: { id },
      select: {
        id: true,
        address: true,
        arduinoId: true,
        description: true,
        name: true,
        gateway: {
          select: {
            id: true,
            name: true,
            arduinoId: true,
          },
        },
        levels: {
          select: {
            id: true,
            caughtAt: true,
            frequencyError: true,
            level: true,
            snr: true,
            rssi: true,
          },
        },
      },
    });
    return deletedTank;
  }
}

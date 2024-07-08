import { z } from "zod";
import type {
  TankLevel,
  TankLevelController,
  TankLevelCreate,
} from "../interfaces/tankLevel.intefaces.js";
import db from "../lib/db.js";

export class TankLevelControllerPrisma implements TankLevelController {
  async create(data: TankLevelCreate): Promise<TankLevel> {
    const DataSchema = z.custom<TankLevelCreate>();

    DataSchema.parse(data);

    const createdTankLevel = await db.tankLevel.create({
      data: {
        level: data.level,
        rssi: data.rssi,
        snr: data.snr,
        frequencyError: data.frequencyError,
        caughtAt: data.caughtAt,
        tank: {
          connectOrCreate: {
            where: {
              arduinoId: data.tank.arduinoId,
              gateway: { arduinoId: data.tank.gateway.arduinoId },
            },
            create: {
              arduinoId: data.tank.arduinoId,
              name: `Tanque ${data.tank.arduinoId}`,
              gateway: {
                connectOrCreate: {
                  where: { arduinoId: data.tank.gateway.arduinoId },
                  create: {
                    arduinoId: data.tank.gateway.arduinoId,
                    name: `Gateway ${data.tank.gateway.arduinoId}`,
                  },
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        level: true,
        rssi: true,
        snr: true,
        frequencyError: true,
        caughtAt: true,
      },
    });

    return createdTankLevel;
  }
  async deleteOne(id: string): Promise<TankLevel> {
    const deletedTankLevel = await db.tankLevel.delete({ where: { id } });

    return deletedTankLevel;
  }
}

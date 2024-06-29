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
        caughtAt: data.caughtAt,
        tank: {
          connect: data.tank,
        },
      },
      select: {
        id: true,
        level: true,
        caughtAt: true,
      },
    });

    // const createdTankLevel = await db.tankLevel.create({
    //   data: {
    //     level: data.level,
    //     caughtAt: data.caughtAt,
    //     tank: {
    //       connectOrCreate: {
    //         where: {
    //           arduinoId: data.tank.arduinoId,
    //           gateway: { arduinoId: data.tank.gateway.arduinoId },
    //         },
    //         create: {
    //           arduinoId: data.tank.arduinoId,
    //           name: `Tanque ${data.tank.arduinoId}`,
    //           gateway: {
    //             connectOrCreate: {
    //               where: { arduinoId: data.tank.gateway.arduinoId },
    //               create: {
    //                 arduinoId: data.tank.gateway.arduinoId,
    //                 name: `Gateway ${data.tank.gateway.arduinoId}`,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     }
    //   }
    // })

    return createdTankLevel;
  }
  async deleteOne(id: string): Promise<TankLevel> {
    const deletedTankLevel = await db.tankLevel.delete({ where: { id } });

    return deletedTankLevel;
  }
}

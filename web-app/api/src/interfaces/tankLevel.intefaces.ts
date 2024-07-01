type TankLevel = {
  id: string;
  level: number;
  caughtAt: Date;
};

type TankLevelCreate = {
  level: number;
  caughtAt: Date;
  tank: {
    arduinoId: number;
    gateway: {
      arduinoId: number;
    };
  };
};

type TankLevelController = {
  create(data: TankLevelCreate): Promise<TankLevel>;
  deleteOne(id: string): Promise<TankLevel>;
};

export type { TankLevel, TankLevelCreate, TankLevelController };

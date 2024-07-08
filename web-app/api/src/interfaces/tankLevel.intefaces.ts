type TankLevel = {
  id: string;
  level: number;
  rssi: number;
  snr: number | null;
  frequencyError: number | null;
  caughtAt: string;
};

type TankLevelCreate = {
  level: number;
  rssi: number;
  snr?: number;
  frequencyError?: number;
  caughtAt: string;
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

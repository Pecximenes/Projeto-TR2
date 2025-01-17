type TankGetOne = {
  id: string;
  arduinoId: number;
  name: string;
  address: string | null;
  description: string | null;
  fullLevel: number;
  alertLevel: number | null;
  gateway: {
    id: string;
    name: string;
    arduinoId: number;
  };
  levels: {
    id: string;
    level: number;
    rssi: number;
    snr: number | null;
    caughtAt: string;
  }[];
};

type TankCreate = {
  arduinoId: number;
  name: string;
  address?: string;
  description?: string;
  fullLevel: number;
  alertLevel?: number;
  gatewayId: string;
};

type TankUpdateOne = {
  arduinoId?: number;
  name?: string;
  address?: string;
  description?: string;
  fullLevel: number;
  alertLevel?: number;
  gatewayId?: string;
};

type TankController = {
  getOneById(id: string): Promise<TankGetOne | null>;
  create(data: TankCreate): Promise<TankGetOne>;
  updateOne(data: TankUpdateOne, id: string): Promise<TankGetOne>;
  deleteOneById(id: string): Promise<TankGetOne>;
};

export type { TankGetOne, TankCreate, TankUpdateOne, TankController };

type GatewayGetAll = {
  id: string;
  arduinoId: number;
  name: string;
  address: string | null;
  description: string | null;
}[];

type GatewayGetOne = {
  id: string;
  arduinoId: number;
  name: string;
  address: string | null;
  description: string | null;
  tanks: {
    id: string;
    arduinoId: number;
    name: string;
    address: string | null;
    description: string | null;
  }[];
};

type GatewayCreate = {
  arduinoId: number;
  name: string;
  address?: string;
  description?: string;
};

type GatewayUpdateOne = {
  arduinoId?: number;
  name?: string;
  address?: string;
  description?: string;
};

type GatewayGetAllInfoless = {
  id: string;
  name: string;
}[];

type GatewayController = {
  getAll(): Promise<GatewayGetAll>;
  getOneByArduinoId(arduinoId: number): Promise<GatewayGetOne>;
  create(data: GatewayCreate): Promise<GatewayGetOne>;
  updateOne(data: GatewayUpdateOne): Promise<GatewayGetOne>;
  deleteOneByArduinoId(arduinoId: number): Promise<GatewayGetOne>;
  getAllInfoless(): Promise<GatewayGetAllInfoless>;
};

export type {
  GatewayGetAll,
  GatewayGetOne,
  GatewayCreate,
  GatewayUpdateOne,
  GatewayController,
};

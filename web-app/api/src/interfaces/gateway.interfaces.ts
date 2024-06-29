type GatewayGetAll = {
  id: string;
  arduinoId: number;
  name: string;
  address: string | null;
  description: string | null;
}[];

type GatewayGetAllInfoless = {
  id: string;
  name: string;
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

type GatewayController = {
  getAll(): Promise<GatewayGetAll>;
  getAllInfoless(): Promise<GatewayGetAllInfoless>;
  getOneById(id: string): Promise<GatewayGetOne | null>;
  create(data: GatewayCreate): Promise<GatewayGetOne>;
  updateOne(data: GatewayUpdateOne, id: string): Promise<GatewayGetOne>;
  deleteOne(id: string): Promise<GatewayGetOne>;
};

export type {
  GatewayGetAll,
  GatewayGetOne,
  GatewayCreate,
  GatewayUpdateOne,
  GatewayController,
};

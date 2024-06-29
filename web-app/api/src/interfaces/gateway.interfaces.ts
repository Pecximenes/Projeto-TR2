type GatewayGetAll = {
  id: string;
  name: string;
  address: string | null;
  description: string | null;
}[];

type GatewayGetOne = {
  id: string;
  name: string;
  address: string | null;
  description: string | null;
  tanks: {
    id: string;
    name: string;
    address: string | null;
    description: string | null;
  }[];
};

type GatewayCreate = {
  name: string;
  address?: string;
  description?: string;
};

type GatewayUpdateOne = {
  name?: string;
  address?: string;
  description?: string;
};

type GatewayController = {
  getAll(): Promise<GatewayGetAll>;
  getOneById(id: string): Promise<GatewayGetOne>;
  create(data: GatewayCreate): Promise<GatewayGetOne>;
  updateOne(data: GatewayUpdateOne): Promise<GatewayGetOne>;
  deleteOneById(id: string): Promise<GatewayGetOne>;
};

export type {
  GatewayGetAll,
  GatewayGetOne,
  GatewayCreate,
  GatewayUpdateOne,
  GatewayController,
};

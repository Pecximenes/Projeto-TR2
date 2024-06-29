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
  tanks?: { id: string }[];
};

type GatewayUpdateOne = {
  name?: string;
  address?: string;
  description?: string;
  tanks?: { id: string }[];
};

type GatewayGetAll = {
  id: string;
  name: string;
  address: string | null;
  description: string | null;
}[];

type GatewayController = {
  getAll(): Promise<GatewayGetAll>;
  getOneById(id: string): Promise<GatewayGetOne>;
  create(data: GatewayCreate): Promise<GatewayGetOne>;
  updateOne(data: GatewayUpdateOne): Promise<GatewayGetOne>;
};

export type {
  GatewayGetOne,
  GatewayCreate,
  GatewayUpdateOne,
  GatewayController,
};

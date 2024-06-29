type Gateway = {
  id: string;
  name: string;
  address: string | null;
  description: string | null;
  tanks: {
    id: string;
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

type GatewayController = {
  getByName(name: string): Promise<Gateway>;
  create(data: GatewayCreate): Promise<Gateway>;
  updateOne(data: GatewayUpdateOne): Promise<Gateway>;
};

export type { Gateway, GatewayCreate, GatewayUpdateOne, GatewayController };

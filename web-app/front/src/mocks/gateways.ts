const mockGateways = [
  {
    id: "1",
    arduinoId: 101,
    name: "Gateway 1",
    address: "123 Main St",
    description: "First gateway",
  },
  {
    id: "2",
    arduinoId: 102,
    name: "Gateway 2",
    address: "456 Elm St",
    description: "Second gateway",
  },
];

const mockGateway = {
  id: "1",
  arduinoId: 101,
  name: "Gateway 1",
  address: "123 Main St",
  description: "First gateway",
  tanks: [
    {
      id: "1",
      arduinoId: 201,
      name: "Tank 1",
      address: "789 Oak St",
      description: "First tank",
    },
    {
      id: "2",
      arduinoId: 202,
      name: "Tank 2",
      address: "101 Pine St",
      description: "Second tank",
    },
  ],
};

const mockGatewayCreate = {
  arduinoId: 103,
  name: "Gateway 3",
  address: "111 Maple St",
  description: "Third gateway",
};

const mockGatewayUpdate = {
  name: "Updated Gateway 1",
  address: "123 Main St Updated",
  description: "Updated first gateway",
};

export { mockGateways, mockGateway, mockGatewayCreate, mockGatewayUpdate };

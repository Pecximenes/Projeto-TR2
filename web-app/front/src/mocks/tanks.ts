const mockTanks = [
  {
    id: "1",
    arduinoId: 201,
    name: "Tank 1",
    address: "789 Oak St",
    description: "First tank",
    gateway: {
      name: "Gateway 1",
      arduinoId: 101,
    },
    levels: [
      {
        id: "1",
        level: 50,
        caughtAt: new Date("2022-01-01T10:00:00Z"),
      },
      {
        id: "2",
        level: 60,
        caughtAt: new Date("2022-01-02T10:00:00Z"),
      },
    ],
  },
  {
    id: "2",
    arduinoId: 202,
    name: "Tank 2",
    address: "101 Pine St",
    description: "Second tank",
    gateway: {
      name: "Gateway 2",
      arduinoId: 102,
    },
    levels: [
      {
        id: "3",
        level: 70,
        caughtAt: new Date("2022-01-03T10:00:00Z"),
      },
      {
        id: "4",
        level: 80,
        caughtAt: new Date("2022-01-04T10:00:00Z"),
      },
    ],
  },
];

const mockTankCreate = {
  arduinoId: 203,
  name: "Tank 3",
  address: "202 Birch St",
  description: "Third tank",
  gatewayId: "3",
};

const mockTankUpdate = {
  name: "Updated Tank 1",
  address: "789 Oak St Updated",
  description: "Updated first tank",
  gatewayId: "1",
};

export { mockTanks, mockTankCreate, mockTankUpdate };

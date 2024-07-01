const mockTank = {
  id: "1",
  arduinoId: 201,
  name: "Tank 1",
  address: "789 Oak St",
  description: "First tank",
  gateway: {
    id: 1,
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
};

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

export { mockTank, mockTankCreate, mockTankUpdate };

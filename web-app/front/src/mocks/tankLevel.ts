const mockTankLevels = [
  {
    id: "1",
    level: 50,
    caughtAt: new Date("2022-01-01T10:00:00Z"),
    tank: {
      arduinoId: 201,
      gateway: {
        arduinoId: 101,
      },
    },
  },
  {
    id: "2",
    level: 60,
    caughtAt: new Date("2022-01-02T10:00:00Z"),
    tank: {
      arduinoId: 202,
      gateway: {
        arduinoId: 102,
      },
    },
  },
];

const mockTankLevelCreate = {
  level: 70,
  caughtAt: new Date("2022-01-03T10:00:00Z"),
  tank: {
    arduinoId: 203,
    gateway: {
      arduinoId: 103,
    },
  },
};

export { mockTankLevels, mockTankLevelCreate };

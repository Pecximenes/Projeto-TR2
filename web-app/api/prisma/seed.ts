import db from "../src/lib/db.js";

export async function seed() {
  await db.gateway.create({
    data: {
      name: "Gateway 1",
      arduinoId: 1,
      address: "STI",
      description: "Gateway localizado na STI",
    },
  });

  await db.tank.create({
    data: {
      name: "Tanque 2",
      arduinoId: 2,
      address: "PAT",
      description:
        "Tanque de combustivel localizado no Pavilhao Anision Teixeira",
      gateway: { connect: { arduinoId: 1 } },
    },
  });

  await db.tankLevel.create({
    data: {
      level: 100,
      rssi: -30,
      caughtAt: new Date("July 6, 2024 09:31:00"),
      tank: { connect: { arduinoId: 2 } },
    },
  });

  await db.tankLevel.create({
    data: {
      level: 99,
      rssi: -87,
      caughtAt: new Date("July 6, 2024 09:35:31"),
      tank: { connect: { arduinoId: 2 } },
    },
  });

  await db.tankLevel.create({
    data: {
      level: 96,
      rssi: -52,
      caughtAt: new Date("July 6, 2024 09:40:07"),
      tank: { connect: { arduinoId: 2 } },
    },
  });
}

seed();

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
      fullLevel: 357,
      alertLevel: 150,
      gateway: { connect: { arduinoId: 1 } },
    },
  });

  await db.tankLevel.create({
    data: {
      level: 100,
      rssi: -30,
      snr: 40.45,
      caughtAt: "2024-06-07, 09:10:35",
      tank: { connect: { arduinoId: 2 } },
    },
  });

  await db.tankLevel.create({
    data: {
      level: 99,
      rssi: -87,
      snr: 34.32,
      caughtAt: "2024-06-07, 09:11:37",
      tank: { connect: { arduinoId: 2 } },
    },
  });

  await db.tankLevel.create({
    data: {
      level: 96,
      rssi: -52,
      snr: 23,
      caughtAt: "2024-06-07, 09:12:42",
      tank: { connect: { arduinoId: 2 } },
    },
  });
}

seed();

"use server";

type TankCreate = {
  arduinoId: number;
  name: string;
  address?: string;
  description?: string;
  gatewayId: string;
};

type Tank = {
  id: string;
  arduinoId: number;
  name: string;
  address: string | null;
  description: string | null;
  gateway: {
    id: string;
    name: string;
    arduinoId: number;
  };
  levels: {
    id: string;
    level: number;
    caughtAt: Date;
  }[];
};

export async function createTank(data: TankCreate) {
  const res = await fetch("http://localhost:3001/tanks/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return new Error(
      "Verifique se passou um ID de arduino válido. Não foi possível criar o tanque",
    );
  }

  return res.json() as Promise<Tank>;
}

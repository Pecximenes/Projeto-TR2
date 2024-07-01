"use server";

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

export async function getTank(tankId: string) {
  const res = await fetch(`http://localhost:3001/tanks/show/${tankId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Error("Não foi possível pegar o tanque do banco de dados");
  }

  return res.json() as Promise<Tank>;
}

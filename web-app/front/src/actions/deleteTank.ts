"use server";

export type Tank = {
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

export async function deleteTank(tankId: string) {
  const res = await fetch(`http://localhost:3001/tanks/delete/${tankId}`, {
    method: "DELETE",
  });

  if (!res) return new Error("Erro ao deletar tanque");

  return res.json() as Promise<Tank>;
}

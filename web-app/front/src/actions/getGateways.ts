"use server";

type Gateways = {
  id: string;
  arduinoId: number;
  name: string;
  address: string;
  description: string;
}[];

export async function getAllGateways() {
  const res = await fetch("http://localhost:3001/gateways/index", {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Error("Não foi possível pegar os gateways do banco de dados");
  }

  return res.json() as Promise<Gateways>;
}

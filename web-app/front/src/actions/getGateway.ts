"use server";

type Gateway = {
  id: string;
  arduinoId: number;
  name: string;
  address: string | null;
  description: string | null;
  tanks: {
    id: string;
    arduinoId: number;
    name: string;
    address: string | null;
    description: string | null;
  }[];
};

export async function getGateway(gatewayId: string) {
  const res = await fetch(`http://localhost:3001/gateways/show/${gatewayId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Error("Não foi possível pegar o gateway do banco de dados");
  }

  return res.json() as Promise<Gateway>;
}

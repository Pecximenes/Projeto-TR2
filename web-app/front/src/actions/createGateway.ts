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

type GatewayCreate = {
  arduinoId: number;
  name: string;
  address?: string;
  description?: string;
};

export async function createGateway(data: GatewayCreate) {
  const res = await fetch("http://localhost:3001/gateways/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return Error(
      "Verifique se passou um ID de arduino válido. Não foi possível criar o gateway",
    );
  }

  return res.json() as Promise<Gateway>;
}

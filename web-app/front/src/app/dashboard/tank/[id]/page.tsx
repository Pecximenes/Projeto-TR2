import { buttonVariants } from "~/components/ui/button";
import { DataTable, columns } from "~/components/app";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { getTank } from "~/actions";
import { AlertLevel } from "./_components/alertLevel";

export default async function TankPage({ params }: { params: { id: string } }) {
  const tank = await getTank(params.id);

  if (tank instanceof Error || !tank) return null;

  return (
    <>
      <section className="my-8 flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href={`/dashboard/gateway/${tank.gateway.id}`}
            className={buttonVariants({
              variant: "secondary",
              className: "border-2 bg-transparent px-6 hover:bg-slate-600/10",
            })}
          >
            <MoveLeft className="size-4" />
          </Link>
          <h1 className="hidden font-light md:block">
            Informações Sobre o Tanque de{" "}
            <span className="font-semibold">ID {tank.arduinoId}</span> Para o
            Arduino
          </h1>
        </div>
      </section>
      <section>
        <h2 className="text-2xl">{tank.name}</h2>
        <p className="line-clamp-1">{tank.description}</p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Histórico de Medições</h2>
        <DataTable columns={columns} data={tank.levels} />
      </section>
      <section className="mt-8 flex justify-between">
        <h2 className="text-2xl">
          Nivel Total do Tanque:{" "}
          <span className="text-base font-light">{tank.fullLevel}</span>
        </h2>
        <AlertLevel currentLevel={tank.levels[tank.levels.length - 1]?.level}>
          {tank.alertLevel}
        </AlertLevel>
      </section>
      <section className="mt-8 flex gap-8">
        <h2 className="text-2xl">
          RSSI:{" "}
          <span className="text-base font-light">
            {tank.levels[tank.levels.length - 1]?.rssi} dBm
          </span>
        </h2>
        <h2 className="text-2xl">
          SNR:{" "}
          <span className="text-base font-light">
            {tank.levels[tank.levels.length - 1]?.snr} dB
          </span>
        </h2>
      </section>
    </>
  );
}

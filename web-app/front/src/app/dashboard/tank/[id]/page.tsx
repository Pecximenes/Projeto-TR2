import { buttonVariants } from "~/components/ui/button";
import { DataTable, columns } from "~/components/app";
import { mockTank } from "~/mocks/tanks";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function TankPage({ params }: { params: { id: string } }) {
  noStore();
  console.log(params);

  return (
    <>
      <section className="my-8 flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href={`/dashboard/gateway/${mockTank.gateway.id}`}
            className={buttonVariants({
              variant: "secondary",
              className: "border-2 bg-transparent px-6 hover:bg-slate-600/10",
            })}
          >
            <MoveLeft className="size-4" />
          </Link>
          <h1 className="hidden font-light md:block">
            Informações Sobre o Tanque de{" "}
            <span className="font-semibold">ID {mockTank.arduinoId}</span> Para
            o Arduino
          </h1>
        </div>
      </section>
      <section>
        <h2 className="text-2xl">{mockTank.name}</h2>
        <p className="line-clamp-1">{mockTank.description}</p>
      </section>
      <section className="my-8">
        <h2 className="text-2xl">Histórico de Medições</h2>
        <DataTable columns={columns} data={mockTank.levels} />
      </section>
    </>
  );
}

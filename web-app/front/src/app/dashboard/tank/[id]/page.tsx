import { mockTank } from "~/mocks/tanks";
import { DataTable } from "./_components/dataTable";
import { columns } from "./_components/dataTable/columns";
import { unstable_noStore as noStore } from "next/cache";

export default function TankPage({ params }: { params: { id: string } }) {
  noStore();
  console.log(params);

  return (
    <>
      <section className="my-8 flex w-full items-center justify-between">
        <h1 className="hidden font-light md:block">
          Informações Sobre o Tanque de{" "}
          <span className="font-semibold">ID {mockTank.arduinoId}</span> Para o
          Arduino
        </h1>
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

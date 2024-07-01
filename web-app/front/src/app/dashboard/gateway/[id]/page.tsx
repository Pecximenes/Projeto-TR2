import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FormCreateArduino, MyDialog } from "~/components/app";
import { MoveLeft } from "lucide-react";
import { getGateway } from "~/actions";
import { DeleteButton } from "~/components/app/deleteButton";
import { deleteTank } from "~/actions/deleteTank";

export default async function GatewayPage({
  params,
}: {
  params: { id: string };
}) {
  const gateway = await getGateway(params.id);

  if (gateway instanceof Error) return null;

  return (
    <>
      <section className="my-8 flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href={"/dashboard"}
            className={buttonVariants({
              variant: "secondary",
              className: "border-2 bg-transparent px-6 hover:bg-slate-600/10",
            })}
          >
            <MoveLeft className="size-4" />
          </Link>
          <h1 className="hidden font-light md:block">
            Informações Sobre o Gateway de{" "}
            <span className="font-semibold">ID {gateway.arduinoId}</span> Para o
            Arduino
          </h1>
        </div>
        <MyDialog.Root>
          <MyDialog.Trigger>Adicionar Tanque</MyDialog.Trigger>
          <MyDialog.Content>
            <MyDialog.Header>
              <MyDialog.Title>Adicione um Tanque</MyDialog.Title>
              <MyDialog.Description>
                Preencha o formulário abaixo para criar um tanque na plataforma,
                antes de configurá-lo no local desejado
              </MyDialog.Description>
            </MyDialog.Header>
            <FormCreateArduino type="tank" gatewayId={params.id} />
          </MyDialog.Content>
        </MyDialog.Root>
      </section>
      <section>
        <h2 className="text-2xl">{gateway.name}</h2>
        <p className="line-clamp-1">{gateway.description}</p>
      </section>
      <section className="my-8">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-2xl">Tanques</h2>
          <span className="text-base font-light">
            Quantidade total: {gateway.tanks.length}
          </span>
        </div>
        {!!gateway && (
          <div className="flex flex-col flex-wrap items-center justify-between md:flex-row md:items-start">
            {gateway.tanks.map((tank) => (
              <Card
                key={tank.id}
                className="mt-2 w-full shadow-md transition-shadow ease-in-out hover:shadow-lg md:w-[48%]"
              >
                <CardHeader>
                  <CardTitle>{tank.name}</CardTitle>
                  <CardDescription>{tank.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row md:gap-2">
                  <p className="line-clamp-2">
                    Arduino de ID {tank.arduinoId}, {tank.address}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link
                    href={`/dashboard/tank/${tank.id}`}
                    className={buttonVariants()}
                  >
                    Veja Mais
                  </Link>
                  <DeleteButton action={deleteTank} id={tank.id} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

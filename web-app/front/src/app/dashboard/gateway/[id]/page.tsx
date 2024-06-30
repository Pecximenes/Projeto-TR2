import { DialogContent } from "@radix-ui/react-dialog";
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
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { mockGateway } from "~/mocks/gateways";
import { FormCreateTank } from "./_components/formCreateTank";
import { MoveLeft } from "lucide-react";

export default function GatewayPage({ params }: { params: { id: string } }) {
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
            <span className="font-semibold">ID {mockGateway.arduinoId}</span>{" "}
            Para o Arduino
          </h1>
        </div>
        <Dialog key={2}>
          <DialogTrigger className={buttonVariants()}>
            Adicionar Tanque
          </DialogTrigger>
          <DialogOverlay
            key={2}
            className="flex items-center justify-center px-8"
          >
            <DialogContent className="rounded bg-white p-6 shadow">
              <DialogHeader className="mb-4">
                <DialogTitle>Adicione um Tanque</DialogTitle>
                <DialogDescription>
                  Preencha o formulário abaixo para criar um tanque na
                  plataforma, antes de configurá-lo no local desejado
                </DialogDescription>
              </DialogHeader>
              <FormCreateTank gatewayId={params.id} />
              <DialogFooter>
                <DialogClose
                  className={buttonVariants({
                    variant: "secondary",
                    className: "mt-4 border-2 px-6 hover:bg-slate-600/10",
                  })}
                >
                  Fechar
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogOverlay>
        </Dialog>
      </section>
      <section>
        <h2 className="text-2xl">{mockGateway.name}</h2>
        <p className="line-clamp-1">{mockGateway.description}</p>
      </section>
      <section className="my-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl">Tanques</h2>
          <span className="text-base font-light">
            Quantidade total: {mockGateway.tanks.length}
          </span>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-between md:flex-row md:items-start">
          {mockGateway.tanks.map((tank) => (
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
              <CardFooter>
                <Link
                  href={`/dashboard/tank/${tank.id}`}
                  className={buttonVariants()}
                >
                  Veja Mais
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

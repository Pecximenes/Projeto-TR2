import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { mockGateway } from "~/mocks/gateways";

export default function GatewayPage({ params }: { params: { id: string } }) {
  console.log(params);
  return (
    <>
      <section className="my-8 flex w-full items-center justify-between">
        <h1 className="hidden font-light md:block">
          Informações Sobre o Gateway de{" "}
          <span className="font-semibold">ID {mockGateway.arduinoId}</span> Para
          o Arduino
        </h1>
        <Button>Adicionar Tanque</Button>
      </section>
      <section>
        <h2 className="text-2xl">Nome: {mockGateway.name}</h2>
        <p className="line-clamp-1">{mockGateway.description}</p>
      </section>
      <section className="my-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl">Tanques</h2>
          <span className="ml-4 text-base font-light">
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

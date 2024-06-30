import { mockGateways } from "~/mocks/gateways";

import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <section className="my-8 flex w-full items-center justify-between">
        <span className="hidden font-light md:block">
          Veja os Gateways da UnB e Clique em um Para Ver Mais
        </span>
        <Button>Adicionar Gateway</Button>
      </section>
      {!mockGateways?.length && <span>Crie um Gateway...</span>}
      <div className="flex flex-col flex-wrap items-center justify-between md:flex-row md:items-start">
        {mockGateways?.map((gateway) => (
          <Card
            key={gateway.id}
            className="mt-2 w-full shadow-md transition-shadow ease-in-out hover:shadow-lg md:w-[48%]"
          >
            <CardHeader>
              <CardTitle>{gateway.name}</CardTitle>
              <CardDescription>{gateway.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row md:gap-2">
              <p className="line-clamp-2">
                Arduino de ID {gateway.arduinoId}, {gateway.address}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/dashboard/gateway/${gateway.id}`}
                className={buttonVariants()}
              >
                Veja Mais
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

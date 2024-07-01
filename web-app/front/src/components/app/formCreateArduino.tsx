"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createGateway, createTank, refresh } from "~/actions";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1),
  arduinoId: z.number(),
  description: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});

export function FormCreateArduino({
  type,
  gatewayId,
}: {
  type: "gateway" | "tank";
  gatewayId?: string;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      arduinoId: 0,
      description: "",
      address: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    if (type === "tank" && gatewayId) {
      console.log({ ...values, gatewayId });
      createTank({ ...values, gatewayId }).catch(() =>
        toast({
          title: "Erro ao criar tanque",
          description: "Verifique se passou um ID válido para o Arduino",
        }),
      );
      refresh(`/dashboard/gateway/${gatewayId}}`).catch((error) =>
        console.error(error),
      );
    }
    if (type === "gateway") {
      createGateway(values).catch(() =>
        toast({
          title: "Erro ao criar gateway",
          description: "Verifique se passou um ID válido para o Arduino",
        }),
      );
      refresh("/dashboard").catch((error) => console.error(error));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-1 sm:gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite um nome" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arduinoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Arduino</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Escolha um ID para o arduino"
                  type="number"
                  onChange={(value) =>
                    field.onChange(value.target.valueAsNumber)
                  }
                  min={0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="hidden sm:block">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Digite uma descrição para esclarecimetos"
                  className="max-h-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite o endereço do dispositivo"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Adicionar
        </Button>
      </form>
    </Form>
  );
}

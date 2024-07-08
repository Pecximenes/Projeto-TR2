"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "~/components/ui/use-toast";

export function AlertLevel({
  children,
  currentLevel = 0,
}: {
  currentLevel?: number;
  children: number | null;
}) {
  useEffect(() => {
    if (children && currentLevel < children) {
      toast({
        title: "Eita! Melhor Reabastecer o Tanque",
        description:
          "O tanque parece estar abaixo do nivel de alerta. Por favor, reabasteco-o",
        variant: "destructive",
      });
    }
  }, [currentLevel, children]);

  return (
    <h2 className="flex items-center gap-2 text-2xl text-red-500">
      <AlertCircle className="size-5" />
      <span>
        Nivel de Alerta:{" "}
        <span className="text-base font-light">{children}</span>
      </span>
    </h2>
  );
}

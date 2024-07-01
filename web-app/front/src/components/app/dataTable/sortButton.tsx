"use client";
import { type Column } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { type TankLevel } from "./columns";
import { ArrowUpDown } from "lucide-react";

export function SortButton({
  column,
}: React.PropsWithChildren<{ column: Column<TankLevel> }>) {
  return (
    <Button
      className="bg-transparent p-0 text-slate-600 hover:bg-transparent"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Captura
      <ArrowUpDown className="ml-2 size-4" />
    </Button>
  );
}

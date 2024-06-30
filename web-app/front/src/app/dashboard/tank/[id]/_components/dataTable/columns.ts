import { type ColumnDef } from "@tanstack/react-table";

type TankLevel = {
  id: string;
  level: number;
  caughtAt: Date;
};

export const columns: ColumnDef<TankLevel>[] = [
  {
    accessorKey: "level",
    header: "Nivel",
  },
  {
    accessorKey: "caughtAt",
    header: "Captura",
  },
];

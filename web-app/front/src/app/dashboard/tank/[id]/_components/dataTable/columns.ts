import { type ColumnDef } from "@tanstack/react-table";
import { SortButton } from "./sortButton";

export type TankLevel = {
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
    header: SortButton,
    invertSorting: true,
  },
];

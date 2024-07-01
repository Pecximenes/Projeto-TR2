import { type ColumnDef } from "@tanstack/react-table";
import { SortButton } from "./sortButton";

type TankLevel = {
  id: string;
  level: number;
  caughtAt: Date;
};

const columns: ColumnDef<TankLevel>[] = [
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

export { type TankLevel, columns };

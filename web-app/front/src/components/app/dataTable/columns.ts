import { type ColumnDef } from "@tanstack/react-table";
import { SortButton } from "./sortButton";

type TankLevel = {
  id: string;
  level: number;
  rssi: number;
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
  {
    accessorKey: "rssi",
    header: "Intensidade",
  },
];

export { type TankLevel, columns };

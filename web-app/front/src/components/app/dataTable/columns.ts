import { type ColumnDef } from "@tanstack/react-table";
import { SortButton } from "./sortButton";

type TankLevel = {
  id: string;
  level: number;
  rssi: number;
  snr: number;
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
    header: "RSSI (dBm)",
  },
  {
    accessorKey: "snr",
    header: "SNR (dB)",
  },
];

export { type TankLevel, columns };

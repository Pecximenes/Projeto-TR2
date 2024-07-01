"use client";
import { TrashIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export function DeleteButton({
  action,
  id,
}: {
  action: (id: string) => Promise<unknown>;
  id: string;
}) {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({
          variant: "destructive",
          className:
            "border-2 border-red-500 bg-red-400 bg-transparent text-red-500 hover:text-white",
        })}
      >
        <TrashIcon className="size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao continuar, você irá excluir permanentemente este dispositivo da
            plataforma
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-2">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: "destructive",
              className:
                "border-2 border-red-500 bg-red-400 bg-transparent text-red-500 hover:text-white",
            })}
            onClick={async () => {
              await action(id);
              router.refresh();
            }}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

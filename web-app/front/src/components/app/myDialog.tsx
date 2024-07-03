import { buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function Trigger({ children }: React.PropsWithChildren) {
  return (
    <DialogTrigger className={buttonVariants({ variant: "outline" })}>
      {children}
    </DialogTrigger>
  );
}

function Content({ children }: React.PropsWithChildren) {
  return (
    <DialogContent className="min-w-[45%] rounded bg-white p-6 shadow">
      {children}
      <DialogFooter>
        <DialogClose
          className={buttonVariants({
            variant: "secondary",
            className: "mt-4 border-2 px-6 hover:bg-slate-600/10",
          })}
        >
          Fechar
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

function Header({ children }: React.PropsWithChildren) {
  return <DialogHeader className="mb-4">{children}</DialogHeader>;
}

export const MyDialog = {
  Root: Dialog,
  Trigger,
  Content,
  Header,
  Title: DialogTitle,
  Description: DialogDescription,
};

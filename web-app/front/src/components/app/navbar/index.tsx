import Link from "next/link";
import { SignOutButton } from "./signOutButton";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { buttonVariants } from "~/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed z-20 flex h-14 w-screen items-center justify-between border-b-2 bg-white/90 px-16 shadow backdrop-blur sm:h-16">
      <div className="flex items-center border-r-2 border-black/15 pr-16">
        <Link href="/dashboard" className="flex gap-2 font-semibold">
          <Image
            src="/unb-logo.svg"
            alt="logo"
            width={35}
            height={35}
            className=""
          />
          Universidade de Brasília
        </Link>
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <Link
            href="https://github.com/Pecximenes/"
            className="flex items-center gap-2 text-black/75 hover:text-black"
            target="_blank"
          >
            <FaGithub className="size-5" />
            Pecximenes
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/pafev"
            className="flex items-center gap-2 text-black/75 hover:text-black"
            target="_blank"
          >
            <FaGithub className="size-5" />
            pafev
          </Link>
        </li>
        <li>
          <SignOutButton
            className={buttonVariants({
              variant: "secondary",
              className: "border-2 bg-transparent px-6 hover:bg-slate-600/10",
            })}
          >
            Sair
          </SignOutButton>
        </li>
      </ul>
    </nav>
  );
}

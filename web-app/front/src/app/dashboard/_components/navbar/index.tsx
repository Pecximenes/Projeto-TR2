import Link from "next/link";
import { SignOutButton } from "./signOutButton";
import { FaGithub } from "react-icons/fa";

export function Navbar() {
  return (
    <nav className="fixed z-20 flex h-14 w-screen items-center justify-between border-b-2 bg-white/90 px-16 shadow backdrop-blur sm:h-16">
      <div className="flex items-center border-r-2 border-black/15 pr-16">
        <Link href="/dashboard" className="font-semibold">
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
          <SignOutButton className="ml-2 rounded-md border-2 px-6 py-2 text-black/75 transition-all ease-in-out hover:bg-black/10 hover:text-black">
            Sair
          </SignOutButton>
        </li>
      </ul>
    </nav>
  );
}

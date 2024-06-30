import { SignInButton } from "./_components/signInButton";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black/15">
      <section className="flex h-[27rem] w-5/6 max-w-[26rem] flex-col items-center justify-between rounded-md bg-white/90 px-2 py-16 shadow-lg backdrop-blur">
        <div className="flex flex-col items-center">
          <h1 className="mt-2 text-lg font-semibold">Entre Com Sua Conta</h1>
          <h2 className="text-sm font-light sm:text-base">
            para navegar para o <span className="font-semibold">dashboard</span>
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <SignInButton
            className="flex max-w-64 items-center justify-center gap-2 rounded border-[1px] p-3 shadow transition-shadow ease-in-out hover:shadow-md"
            provider="google"
          >
            <FaGoogle className="fill-red-700" /> Entrar Com Google
          </SignInButton>
          <SignInButton
            className="flex max-w-64 items-center justify-center gap-2 rounded border-[1px] p-3 shadow transition-shadow ease-in-out hover:shadow-md"
            provider="discord"
          >
            <FaDiscord className="fill-sky-600" />
            Entrar Com Discord
          </SignInButton>
          <SignInButton
            className="flex max-w-64 items-center justify-center gap-2 rounded border-[1px] p-3 shadow transition-shadow ease-in-out hover:shadow-md"
            provider="github"
          >
            <FaGithub />
            Entrar Com GitHub
          </SignInButton>
        </div>
      </section>
    </main>
  );
}

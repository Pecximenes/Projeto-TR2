"use client";

import { signIn } from "next-auth/react";

export function SignInButton({
  children,
  provider,
  className,
}: React.PropsWithChildren<{
  provider: "google" | "discord" | "github";
  className?: string;
}>) {
  return (
    <button onClick={() => signIn(provider)} className={className}>
      {children}
    </button>
  );
}

"use client";

import { signOut } from "next-auth/react";

export function SignOutButton({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <button onClick={() => signOut()} className={className}>
      {children}
    </button>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

/** 공통 header */
export function Header({ children }: { children?: ReactNode }) {

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
      <Link href="/" className="text-2xl font-bold text-primary-600">
        Bloomix
      </Link>
      <div className="flex items-center gap-3">
        {children}
      </div>
    </header>
  );
}

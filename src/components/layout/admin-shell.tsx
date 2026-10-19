import type { ReactNode } from "react";
import { Footer } from "./footer";

type AdminShellProps = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

/** 관리자 화면 틀 (헤더 + 사이드바 + 본문 + 푸터) */
export function AdminShell({
  header,
  sidebar,
  children
}: AdminShellProps) {

  return (
    <div className="mx-auto flex h-screen min-h-160 max-w-app flex-col border-x border-line bg-surface">
      {header}
      <div className="flex min-h-0 flex-1">
        <aside className="w-55 shrink-0 overflow-y-auto border-r border-line">
          {sidebar}
        </aside>
        <main className="min-w-0 flex-1 overflow-y-auto bg-page px-4 py-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

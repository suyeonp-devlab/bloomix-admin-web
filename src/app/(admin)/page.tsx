import { MonitorCog } from "lucide-react";

/** 관리자 메인 */
export default function AdminHomePage() {

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 text-center">
      <MonitorCog className="size-24 text-primary-600" strokeWidth={1.25} aria-hidden />
      <div>
        <h1 className="text-2xl font-medium">환영합니다.</h1>
        <p className="mt-1.5 text-lg text-fg-secondary">Bloomix 관리자 페이지입니다.</p>
      </div>
    </div>
  );
}

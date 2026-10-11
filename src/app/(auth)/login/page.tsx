import type { Metadata } from "next";
import { GuestGuard } from "@/features/auth/components/guest-guard";
import { LoginForm } from "@/features/auth/components/login-form";
import { toSafeRedirect } from "@/lib/utils/redirect";

export const metadata: Metadata = { title: "로그인" };

/** 로그인 페이지 */
export default async function LoginPage({ searchParams }: PageProps<"/login">) {

  const { redirect } = await searchParams;
  const redirectTo = toSafeRedirect(redirect);

  return (
    <GuestGuard redirectTo={redirectTo}>
      <div className="w-full max-w-sm rounded-md border border-line bg-surface p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-xl font-bold text-primary-600">Bloomix</span>
          <span className="h-4 w-px bg-line-strong" aria-hidden />
          <h1 className="text-lg font-medium">로그인</h1>
        </div>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </GuestGuard>
  );
}

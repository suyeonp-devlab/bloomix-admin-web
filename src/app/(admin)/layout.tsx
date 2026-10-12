import { AuthGuard } from "@/features/auth/components/auth-guard";

export default function AdminLayout({ children }: LayoutProps<"/">) {

  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}

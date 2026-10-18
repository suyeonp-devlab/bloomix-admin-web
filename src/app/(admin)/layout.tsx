import { AdminShell } from "@/components/layout/admin-shell";
import { Header } from "@/components/layout/header";
import { AuthGuard } from "@/features/auth/components/auth-guard";
import { HeaderUser } from "@/features/auth/components/header-user";
import { AdminSidebar } from "@/features/menu/components/admin-sidebar";

export default function AdminLayout({ children }: LayoutProps<"/">) {

  return (
    <AuthGuard>
      <AdminShell
        header={<Header><HeaderUser /></Header>}
        sidebar={<AdminSidebar />}
      >
        {children}
      </AdminShell>
    </AuthGuard>
  );
}

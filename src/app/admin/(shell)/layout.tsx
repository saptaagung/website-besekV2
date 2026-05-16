import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileTopBar } from "@/components/admin/AdminMobileTopBar";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    redirect("/admin/login?error=config");
  }

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        <AdminMobileTopBar />
        <main className="flex-1 p-4 md:p-16 bg-surface-bright overflow-y-auto">
          <div className="max-w-[1280px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

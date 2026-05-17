import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-4 sm:p-6">
      <Suspense
        fallback={
          <div className="w-[min(100%,28rem)] rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 text-center font-serif text-primary">
            Memuat…
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}

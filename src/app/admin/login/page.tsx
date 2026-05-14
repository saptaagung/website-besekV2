import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-4">
      <Suspense fallback={<p className="font-serif text-olive">Memuat…</p>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}

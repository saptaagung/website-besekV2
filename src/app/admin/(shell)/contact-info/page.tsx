import { redirect } from "next/navigation";

export default function LegacyContactInfoRedirect() {
  redirect("/admin/pengaturan/kontak");
}

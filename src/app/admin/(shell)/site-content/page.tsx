import { redirect } from "next/navigation";

export default function LegacySiteContentRedirect() {
  redirect("/admin/pengaturan/beranda");
}

import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { getContactInfo } from "@/lib/data/queries";
import { waLink } from "@/lib/whatsapp";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contact = await getContactInfo();
  const waHref = waLink(
    contact.phone_whatsapp ?? "+6281234567890",
    "Halo Besek Artisanal, saya ingin bertanya tentang produk.",
  );

  return (
    <>
      <MarketingHeader />
      <main className="min-h-[60vh]">{children}</main>
      <SiteFooter />
      <WhatsAppFab href={waHref} />
    </>
  );
}

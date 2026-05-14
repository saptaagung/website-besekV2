import { getContactInfo, getSiteSections } from "@/lib/data/queries";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapRelief } from "@/components/contact/MapRelief";
import { WorkshopCard } from "@/components/contact/WorkshopCard";

export default async function ContactPage() {
  const sections = await getSiteSections("Contact");
  const intro = sections.get("Intro");
  const contact = await getContactInfo();

  return (
    <div className="bg-[#ebe9e4]">
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <h1 className="font-serif text-3xl text-olive md:text-5xl">
          {intro?.headline_text ?? "Hubungi Kami"}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {intro?.description_text ?? ""}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <WorkshopCard contact={contact} />
            <MapRelief mapData={contact.map_location_data} label={contact.address ?? ""} />
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

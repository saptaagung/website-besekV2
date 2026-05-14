import type { ContactInfoRow } from "@/lib/database.types";

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6.5 3h4l2 5-2.5 1.5a12 12 0 0 0 5.5 5.5L17 12l5 2v4a2 2 0 0 1-2 2h-1C9.6 21 3 14.4 3 6.5V5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l3 2" />
    </svg>
  );
}

export function WorkshopCard({ contact }: { contact: ContactInfoRow }) {
  const rows = [
    { icon: IconPin, title: "Alamat", body: contact.address },
    { icon: IconPhone, title: "Telepon / WhatsApp", body: contact.phone_whatsapp },
    { icon: IconMail, title: "Email", body: contact.email },
    { icon: IconClock, title: "Jam Operasional", body: contact.operational_hours },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
      <h2 className="font-serif text-2xl text-olive">Workshop Kami</h2>
      <ul className="mt-6 space-y-5">
        {rows.map(
          (r) =>
            r.body && (
              <li key={r.title} className="flex gap-3">
                <span className="mt-0.5 text-olive">
                  <r.icon />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    {r.title}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-sm text-neutral-800">{r.body}</p>
                </div>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

import { CONTACT_EMAIL } from "@/lib/config";

export function Contact() {
  if (CONTACT_EMAIL.startsWith("[")) return <mark className="placeholder">{CONTACT_EMAIL}</mark>;
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
      {CONTACT_EMAIL}
    </a>
  );
}

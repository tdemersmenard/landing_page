import { Contact } from "@/components/Contact";
import { BRAND } from "@/lib/config";
import { t } from "@/lib/text";

export function Footer({ className = "pb-40" }: { className?: string }) {
  return (
    <footer className={`border-t border-trait pt-12 text-doux ${className}`}>
      <div className="wrap">
        <p className="max-w-3xl">
          Les revenus ne sont pas garantis. Les résultats mentionnés sont ceux du fondateur. Les tiens vont dépendre de ton
          travail, de ton coin, de ton service et de la demande.
        </p>
        <nav aria-label="Liens légaux" className="mt-8 flex flex-col gap-x-8 gap-y-4 sm:flex-row sm:flex-wrap">
          {[
            ["/remboursement", "Politique de remboursement"],
            ["/confidentialite", "Politique de confidentialité"],
            ["/conditions", "Conditions"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="underline underline-offset-4">
              {label}
            </a>
          ))}
        </nav>
        <p className="mt-6">
          {t("Contact : ")}
          <Contact />
        </p>
        <p className="mt-8">© 2026 {BRAND}</p>
      </div>
    </footer>
  );
}

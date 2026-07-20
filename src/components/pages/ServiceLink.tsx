import Link from "next/link";
import { localePath, type Locale, type Service } from "@/content/site";

export function ServiceLink({
  locale,
  service,
  className,
  children,
}: {
  locale: Locale;
  service: Service;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={localePath(locale, `/services/${service.slug}`)} className={className} data-reveal>
      {children}
    </Link>
  );
}

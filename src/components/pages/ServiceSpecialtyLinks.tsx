import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { specialtiesFor, specialtyPath } from "@/content/service-specialties";
import { localePath, type Locale, type Service } from "@/content/site";
import s from "./ServicePortfolio.module.css";

export function ServiceSpecialtyLinks({ service, locale }: { service: Service; locale: Locale }) {
  return (
    <ul className={s.specialtyLinks} aria-label={service.title}>
      {specialtiesFor(service.slug).map(item => (
        <li key={item.slug}><Link href={localePath(locale, specialtyPath(item))}>{item[locale].title}<ArrowIcon /></Link></li>
      ))}
    </ul>
  );
}

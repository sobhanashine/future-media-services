import Link from "next/link";
import { copy, formatNumber } from "@/content/site";

export default function NotFound() {
  return <section className="state-page"><span>{formatNumber(404, "fa")}</span><h1>{copy.fa.common.notFound}</h1><p>{copy.fa.common.notFoundBody}</p><Link className="button" href="/">{copy.fa.common.home}</Link></section>;
}

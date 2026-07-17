import Link from "next/link";
import { copy } from "@/content/site";

export default function NotFound() {
  return <section className="state-page"><span>404</span><h1>{copy.fa.common.notFound}</h1><p>{copy.fa.common.notFoundBody}</p><Link className="button" href="/">{copy.fa.common.home}</Link></section>;
}

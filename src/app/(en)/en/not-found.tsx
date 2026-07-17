import Link from "next/link";
import { copy } from "@/content/site";

export default function NotFound() {
  return <section className="state-page"><span>404</span><h1>{copy.en.common.notFound}</h1><p>{copy.en.common.notFoundBody}</p><Link className="button" href="/en">{copy.en.common.home}</Link></section>;
}

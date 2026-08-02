import Image from "next/image";
import brandMark from "@/app/brand-mark.webp";

export function BrandIdentity({ descriptor = false }: { descriptor?: boolean }) {
  return (
    <>
      <span className="brand-symbol" aria-hidden="true">
        <Image
          src={brandMark}
          alt=""
          className="brand-symbol__image"
          unoptimized
        />
      </span>
      <span className="brand-wordmark">FMS</span>
      {descriptor && <small>Future Media Services</small>}
    </>
  );
}

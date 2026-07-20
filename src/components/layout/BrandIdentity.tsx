import Image from "next/image";
import favicon from "@/app/icon.png";

export function BrandIdentity({ descriptor = false }: { descriptor?: boolean }) {
  return (
    <>
      <span className="brand-symbol" aria-hidden="true">
        <Image
          src={favicon}
          alt=""
          className="brand-symbol__image"
          sizes="64px"
        />
      </span>
      <span className="brand-wordmark">FMS</span>
      {descriptor && <small>Future Media Services</small>}
    </>
  );
}

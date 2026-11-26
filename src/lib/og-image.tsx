import { ImageResponse } from "next/og";
export const ogImageSize = { width: 1200, height: 630 };

export function createOgImage(locale: "fa" | "en" | "it" = "fa") {
  const copy = {
    fa: ["FMS", "Strategy · Design · Technology", "Build what your brand becomes next."],
    en: ["Future Media Services", "Design & development", "Websites, online shops and Instagram content."],
    it: ["Future Media Services", "Design e sviluppo", "Siti web, e-commerce e contenuti Instagram."],
  }[locale];
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#fbfbfa", color: "#161519", padding: "72px", position: "relative", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "30px", fontWeight: 800 }}>
          <span style={{ width: "18px", height: "18px", borderRadius: "50% 50% 50% 0", background: "#d90a2c", transform: "rotate(-45deg)" }} />
          {copy[0]}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ color: "#d90a2c", fontSize: "24px", letterSpacing: "3px" }}>{copy[1]}</div>
          <div style={{ maxWidth: "940px", marginTop: "24px", fontSize: "78px", fontWeight: 800, letterSpacing: "-5px", lineHeight: 1 }}>{copy[2]}</div>
        </div>
      </div>
      <div style={{ position: "absolute", right: "70px", top: "60px", width: "330px", height: "330px", border: "3px solid #d90a2c", borderRadius: "50%", opacity: 0.25 }} />
    </div>,
    ogImageSize,
  );
}

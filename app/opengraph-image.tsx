import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#101110",
          color: "#F3EFE7",
          border: "2px solid rgba(198, 161, 91, 0.4)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "0.3em",
              color: "#C6A15B",
              fontWeight: 600,
            }}
          >
            CUFFKINGS
          </div>
          <div
            style={{
              fontSize: "16px",
              letterSpacing: "0.2em",
              color: "rgba(243, 239, 231, 0.6)",
              textTransform: "uppercase",
            }}
          >
            Peshawar, Pakistan
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              lineHeight: "1.1",
              color: "#F3EFE7",
              fontWeight: 400,
            }}
          >
            The detail changes everything.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(243, 239, 231, 0.8)",
              maxWidth: "800px",
              lineHeight: "1.5",
              fontFamily: "sans-serif",
            }}
          >
            Cufflinks built around polished metal, considered patterns and the
            details of formal dressing.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "1px",
              background: "#C6A15B",
            }}
          />
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              color: "#C6A15B",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Noir Atelier Luxury Collection
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

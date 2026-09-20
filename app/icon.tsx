import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#101110",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C6A15B",
          border: "1px solid rgba(198, 161, 91, 0.6)",
          fontWeight: 700,
          letterSpacing: "1px",
          fontFamily: "serif",
        }}
      >
        CK
      </div>
    ),
    {
      ...size,
    }
  );
}

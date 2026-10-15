import { ImageResponse } from "next/og";

export const alt = "Junior Wolff Tattoo — realismo, arte e identidade";
export const size = { width: 1200, height: 630 };
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
          justifyContent: "flex-end",
          background: "#090909",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#C5A36A",
            fontSize: 22,
            letterSpacing: 6,
          }}
        >
          WOLFF TATTOO STUDIO
        </div>
        <div
          style={{
            display: "flex",
            color: "#E8E5E0",
            fontSize: 74,
            lineHeight: 1,
            marginTop: 20,
          }}
        >
          Tatuagens que
        </div>
        <div
          style={{
            display: "flex",
            color: "#C5A36A",
            fontSize: 74,
            lineHeight: 1,
          }}
        >
          contam histórias
        </div>
        <div
          style={{
            display: "flex",
            color: "#E8E5E0",
            fontSize: 26,
            marginTop: 28,
            opacity: 0.8,
          }}
        >
          Siqueira Campos, Paraná
        </div>
      </div>
    ),
    { ...size },
  );
}

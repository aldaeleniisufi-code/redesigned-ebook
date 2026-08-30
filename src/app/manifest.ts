import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kidleido — Μαγικοί Κόσμοι",
    short_name: "Kidleido",
    description:
      "Παραμύθια, ζωγραφιές και παιχνίδια για παιδιά — ασφαλή και πολύχρωμα.",
    start_url: "/app",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fff7e8",
    theme_color: "#173f73",
    categories: ["education", "kids", "entertainment"],
    lang: "el",
    icons: [
      {
        src: "/kidleido-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/kidleido-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/kidleido-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

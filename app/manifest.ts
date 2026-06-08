import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Panchal Interior & Furniture Solutions",
    short_name: "Panchal Interior",
    description: "Premium Custom Furniture, Modular Kitchens, and Turnkey Home Interior Design Solutions in Ahmedabad.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#a17a4c",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}

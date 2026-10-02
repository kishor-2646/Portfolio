import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GreenWave Engineering Case Study — From Siren to Spring Boot",
  description:
    "Deep-dive engineering case study: how Team Omnipotence re-engineered a 24-hour hackathon MVP into an enterprise Spring Boot + PostGIS geospatial engine for emergency ambulance corridor management.",
  openGraph: {
    title: "GreenWave Engineering Case Study — Kishor Kumar S",
    description:
      "Transitioning from a Firebase BaaS hackathon prototype to an enterprise Spring Boot + PostGIS distributed backend for real-time ambulance green corridors.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenWave: From Siren to Spring Boot",
    description:
      "Engineering case study on re-architecting a hackathon-winning emergency traffic system into a production-grade geospatial engine.",
  },
};

export default function GreenWaveCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

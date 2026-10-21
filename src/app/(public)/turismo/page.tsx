import { Metadata } from "next";
import { TourismService } from "@/services/tourism.service";
import TurismoClient from "@/components/public/TurismoClient";

export const metadata: Metadata = {
  title: "Calendario de Fiestas y Turismo en Jauja | VDN Noticias",
  description:
    "Guía turística y calendario dinámico de fiestas, danzas patrimoniales (Tunantada, Huaconada) y costumbres del Valle del Mantaro, Junín y el Perú.",
  openGraph: {
    title: "Calendario de Fiestas y Turismo en Jauja | VDN Noticias",
    description:
      "Explora las tradiciones, gastronomía típica y destinos turísticos de Jauja, Primera Capital Histórica del Perú.",
    type: "website",
  },
};

export default async function TurismoPage() {
  const [festivities, attractions] = await Promise.all([
    TourismService.getAllFestivities(),
    Promise.resolve(TourismService.getAttractions()),
  ]);

  return (
    <TurismoClient
      initialFestivities={festivities}
      attractions={attractions}
    />
  );
}

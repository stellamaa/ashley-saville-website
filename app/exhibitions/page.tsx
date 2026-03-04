import type { Metadata } from "next";
import { getCurrentExhibition } from "@/sanity/sanity-utils";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Exhibitions | Ashley Saville",
  description: "Current and past exhibitions at Ashley Saville. Contemporary art gallery in London.",
};

export default async function ExhibitionsPage() {
  const currentExhibition = await getCurrentExhibition();

  if (currentExhibition?.slug) {
    redirect(`/exhibitions/${currentExhibition.slug}`);
  }

  return (
    <div className="min-h-screen bg-neutral-100 pt-24 px-8 pb-8">
      <p className="text-neutral-500">No current exhibition</p>
     
    </div>
  );
}

import type { Metadata } from "next";
import { getCurrentFair } from "@/sanity/sanity-utils";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Fairs | Ashley Saville",
  description: "Art fairs featuring Ashley Saville. Contemporary art gallery in London.",
};

export default async function FairsPage() {
  const currentFair = await getCurrentFair();

  if (currentFair?.slug) {
    redirect(`/fairs/${currentFair.slug}`);
  }

  return (
    <div className="min-h-screen bg-neutral-100 pt-24 px-8 pb-8">
      <p className="text-neutral-500">No current fair</p>
     
    </div>
  );
}

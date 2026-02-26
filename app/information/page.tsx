import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import NewsletterForm from "@/app/components/NewsletterForm";
import { getInformation } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

export default async function InformationPage() {
  const information = await getInformation();

  return (
    <div className="min-h-screen bg-white pt-23 px-5 md:px-10 md:pb-0 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <Reveal>
          <h1 className="text-1xl font-medium text-neutral-800 text-center mb-10 ">
            Information
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-16 mb-10">
          <Reveal delay={0}>
            <div className="text-neutral-900 text-md leading-snug text-justify [&_p]:mb-1">
              {information?.informationText && information.informationText.length > 0 ? (
                <PortableText value={information.informationText} />
              ) : (
                <p>
                  The gallery is located on the corner of Fleet Street and Chancery
                  Lane. The entrance is on Chancery Lane. On arrival, please ring
                  the bell to be let in. Kindly note that the gallery is on the
                  first floor and is accessible via stairs only.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="text-md font-medium text-neutral-900 mb-0">
                Newsletter
              </h2>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-16 mb-36 mt-5 font-medium">
          <Reveal className="order-1 lg:order-2 col-span-2 lg:col-span-1">
            <div>
              <h2 className="text-md text-neutral-900 mb-1 text-start">Address</h2>
              <p className="text-neutral-900 text-md leading-relaxed mb-0 mt-4 text-start lg:text-start">
                193 Fleet Street, EC4A 2AH, London
              </p>
              <Link
                href="https://www.google.com/maps/place/193+Fleet+St,+Greater,+Temple,+London+EC4A+2AH/@51.5139068,-0.1161117,17z/data=!3m1!4b1!4m6!3m5!1s0x487604b35ebcb6ef:0x638f3b4b5a6d1513!8m2!3d51.5139036!4d-0.1112408!16s%2Fg%2F11q2vvrxg2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-start mb-5 underline text-neutral-700 hover:text-neutral-900 block mt-2"
              >
                Google maps.
              </Link>
              <Image
                src="/building.jpg"
                alt="Map"
                width={500}
                height={300}
                className="mt-4 mx-auto lg:mx-0"
              />
            </div>
          </Reveal>
          <Reveal delay={50} className="order-2 lg:order-1">
            <div>
              <h2 className="text-md mt-7 lg:mt-0 text-neutral-900 mb-2 text-start">
                Opening Hours
              </h2>
              <div className="text-neutral-900 text-md leading-snug text-start [&_p]:mb-1">
                {information?.openingHours && information.openingHours.length > 0 ? (
                  <PortableText value={information.openingHours} />
                ) : (
                  <p>
                    Wednesday - Saturday <br />
                    10am - 6pm <br />
                    and by appointment
                  </p>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="order-3 lg:order-3">
            <div>
              <h2 className="text-md text-neutral-900 mb-2 text-start mt-4 lg:mt-0">
                Contact
              </h2>
              <div className="space-y-2 text-md text-neutral-900 text-start">
                <p>
                  {information?.contactName ?? "Ashley Saville, Director"}
                  <br />
                  <a
                    href={`mailto:${information?.contactEmail ?? "ashley@ashleysaville.com"}`}
                    className="hover:text-neutral-900 mt-2"
                  >
                    {information?.contactEmail ?? "ashley@ashleysaville.com"}
                  </a>
                  <br />
                  <a
                    href={`tel:${(information?.contactPhone ?? "+44 (0)752033690").replace(/\D/g, "")}`}
                    className="hover:text-neutral-900"
                  >
                    {information?.contactPhone ?? "+44 (0)752033690"}
                  </a>
                  <br />
                  <a
                    href={
                      (information?.contactInstagram ?? "@ashleysavilleworld").startsWith("http")
                        ? (information?.contactInstagram ?? "https://www.instagram.com/ashleysavilleworld/")
                        : `https://www.instagram.com/${(information?.contactInstagram ?? "ashleysavilleworld").replace("@", "")}/`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-900"
                  >
                    {information?.contactInstagram ?? "@ashleysavilleworld"}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <footer className="mt-auto font-medium text-xs lg:text-xs text-neutral-800">
            <div className="flex justify-center items-end gap-3 text-center">
              <Link
                href="https://stellamathioudakis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-700"
              >
                Site credit: Stella Mathioudakis
              </Link>
              <span className="text-neutral-500">★ </span>
              <Link href="/information/privacypolicy" className="hover:text-neutral-700">
                Privacy Policy
              </Link>
              <span className="text-neutral-500">★ </span>
              <span> © - 2026 Ashley Saville. All rights reserved.</span>
            </div>
          </footer>
        </Reveal>
      </div>
    </div>
  );
}

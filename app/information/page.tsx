import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import NewsletterForm from "@/app/components/NewsletterForm";

export default function InformationPage() {
  return (
    <div className="min-h-screen bg-white pt-23 px-5 md:px-10 md:pb-0 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
       <Reveal>
        <h1 className="text-1xl font-medium text-neutral-800 text-center mb-10 ">
          Information
        </h1>
        </Reveal> 

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-16 mb-10">
          <Reveal delay={50}>
          <div>
            <p className="text-neutral-900 text-md leading-snug text-justify">
              The gallery is located on the corner of Fleet Street and Chancery
              Lane. The entrance is on Chancery Lane. On arrival, please ring
              the bell to be let in. Kindly note that the gallery is on the
              first floor and is accessible via stairs only.
            </p>
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
        <Reveal>
          <div>
            {/* <h2 className="text-md text-neutral-900 mb-1">Address</h2> */}
            <h2 className="text-md text-neutral-900 mb-1 text-start">Address</h2>
            <Image
              src="/building.jpg"
              alt="Map"
              width={500}
              height={300}
              className="mt-4 mx-auto"
            />
            <p className="text-neutral-900 text-md text-center leading-relaxed mb-0">
              193 Fleet Street, EC4A 2AH, London
            </p>
            <Link
              href="https://www.google.com/maps/place/193+Fleet+St,+Greater,+Temple,+London+EC4A+2AH/@51.5139068,-0.1161117,17z/data=!3m1!4b1!4m6!3m5!1s0x487604b35ebcb6ef:0x638f3b4b5a6d1513!8m2!3d51.5139036!4d-0.1112408!16s%2Fg%2F11q2vvrxg2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-start mb-5 underline text-neutral-700 hover:text-neutral-900"
            >
              Google maps.
            </Link>
          </div>
          </Reveal>
          <div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-16 mb-36 mt-5 font-medium">
          <Reveal>
          <div>
            <h2 className="text-md mt-5 text-neutral-900 mb-2 text-start">Opening Hours</h2>
            <p className="text-neutral-900 text-md leading-snug text-start ">
              Wednesday - Saturday <br />
              10am - 6pm <br />
              and by appointment
            </p>
          </div>
          </Reveal>



          <Reveal>
          <div>
            <h2 className="text-md text-neutral-900 mb-2 text-start mt-4 lg:mt-0 ">Contact</h2>
            <div className="space-y-2 text-md text-neutral-900 text-start">
              <p>
                Ashley Saville, Director
                <br />
                <a
                  href="mailto:ashley@ashleysaville.com"
                  className="hover:text-neutral-900 mt-2"
                >
                  ashley@ashleysaville.com
                </a>
                <br />
                <a
                  href="tel:0752033690"
                  className="hover:text-neutral-900"
                >
                  +44 (0)752033690
                </a>
                <br />
                <a
                  href="https://www.instagram.com/ashleysaville.art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900"
                >
                  @ashleysaville.art
                </a>
              </p>
            </div>
          </div>
          </Reveal>
        </div>
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


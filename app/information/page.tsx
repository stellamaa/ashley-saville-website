import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";

export default function InformationPage() {
  return (
    <div className="min-h-screen bg-white pt-44 px-6 md:px-10 md:pb-10 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1">
        <Reveal>
        <h1 className="text-1xl font-medium text-neutral-800 text-center mb-14 ">
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
            <form className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="flex-1 min-w-[120px] bg-transparent border-b border-neutral-300 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="flex-1 min-w-[120px] bg-transparent border-b border-neutral-300 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 min-w-[120px] bg-transparent border-b border-neutral-300 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                />
              </div>
              <button
                type="submit"
                className="text-md font-medium text-neutral-900 hover:text-neutral-900"
              >
                Subscribe
              </button>
            </form>
          </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-16 mb-16 font-medium">
          <Reveal>
          <div>
            <h2 className="text-md text-neutral-900 mb-2">Opening Hours:</h2>
            <p className="text-neutral-900 text-md leading-snug">
              Wednesday - Saturday <br />
              10am - 6pm <br />
              and by appointment
            </p>
          </div>
          </Reveal>

          <Reveal>
          <div>
            <h2 className="text-md text-neutral-900 mb-1">Address:</h2>
            <Image
              src="/building.jpg"
              alt="Map"
              width={300}
              height={300}
              className="mt-4 mx-left"
            />
            <p className="text-neutral-900 text-md leading-relaxed mb-0">
              193 Fleet Street, EC4A 2AH, London
            </p>
            <Link
              href="https://www.google.com/maps/place/193+Fleet+St,+Greater,+Temple,+London+EC4A+2AH/@51.5139068,-0.1161117,17z/data=!3m1!4b1!4m6!3m5!1s0x487604b35ebcb6ef:0x638f3b4b5a6d1513!8m2!3d51.5139036!4d-0.1112408!16s%2Fg%2F11q2vvrxg2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline text-neutral-700 hover:text-neutral-900"
            >
              Google maps.
            </Link>
          </div>
          </Reveal>

          <Reveal>
          <div>
            <h2 className="text-md text-neutral-900 mb-2">Contact:</h2>
            <div className="space-y-2 text-md text-neutral-900 mb-8">
              <p>
                Ashley Saville, Director
                <br />
                <br />
                <a
                  href="mailto:ashley@ashleysaville.com"
                  className="hover:text-neutral-900"
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

        <Reveal>
        <footer className="pt-4 font-medium text-xs lg:text-xs text-neutral-900">
          <div className="flex justify-center items-center gap-3 text-center">
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


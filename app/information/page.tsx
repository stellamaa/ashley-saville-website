import Link from "next/link";

export default function InformationPage() {
  return (
    <div className="min-h-screen bg-white pt-24 px-6 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-medium text-neutral-600 text-center mb-14">Information</h1>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-16 mb-10">
          <div>
          
            <p className="text-neutral-600 font-medium text-sm leading-relaxed">
            The gallery is located on the corner of Fleet Street and Chancery Lane. The entrance is on Chancery Lane. On arrival, please ring the bell to be let in. Kindly note that the gallery is on the first floor and is accessible via stairs only.            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-neutral-600 mb-0">
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
                className="text-sm font-medium text-neutral-600 hover:text-neutral-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-16 mb-16 font-medium ">
          <div>
            <h2 className="text-sm text-neutral-900 mb-1">
              Address:
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-0">
            193 Fleet Street, London, EC4A 2AH, United Kingdom
            </p>
            <Link
              href="https://www.google.com/maps/place/193+Fleet+St,+Greater,+Temple,+London+EC4A+2AH/@51.5139068,-0.1161117,17z/data=!3m1!4b1!4m6!3m5!1s0x487604b35ebcb6ef:0x638f3b4b5a6d1513!8m2!3d51.5139036!4d-0.1112408!16s%2Fg%2F11q2vvrxg2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline text-neutral-600 hover:text-neutral-900"
            >
              Google maps.
            </Link>
          </div>
          <div>
            <h2 className="text-sm text-neutral-900 mb-2">
              Opening Hours:
            </h2>
            <p className="text-neutral-600 text-sm">
          
Wednesday - Saturday <br />
 10am - 6pm <br />
and by appointment
            </p>
          </div>
          <div>
            <h2 className="text-sm  text-neutral-900 mb-2">
              Contact:
            </h2>
            <div className="space-y-2 text-sm text-neutral-600 mb-8">
              <p>

              Ashley Saville, Director <br /> <br />
<a href="mailto:ashley@ashleysaville.com" className="hover:text-neutral-900">ashley@ashleysaville.com</a> <br />
<a href="tel:0752033690" className="hover:text-neutral-900">+44 (0)752033690</a> <br />
<a href="https://instagram.com/ashleysaville.gallery" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">@ashleysaville.gallery</a>
              
              </p>
            </div>
           
          </div>
        </div>

        <footer className=" fixed bottom-1  pt-12 text-center font-medium text-xs lg:text-xs text-neutral-600 grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-1 lg:gap-4">
          Design and Development: Stella Mathioudakis{" "}
          <Link href="/information/privacypolicy" className="underline hover:text-neutral-700">
            Privacy Policy
          </Link>
           2026 Ashley Saville
        </footer>
      </div>
    </div>
  );
}

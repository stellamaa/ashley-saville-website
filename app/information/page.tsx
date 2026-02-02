import Link from "next/link";

export default function InformationPage() {
  return (
    <div className="min-h-screen bg-white pt-24 px-6 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-medium text-center mb-16">Information</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <div>
            <h2 className="text-sm font-medium text-neutral-900 mb-4">
              Text about gallery
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-neutral-900 mb-4">
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
                className="text-sm underline text-neutral-900 hover:text-neutral-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <div>
            <h2 className="text-sm font-medium text-neutral-900 mb-4">
              Address
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              href="#"
              className="text-sm underline text-neutral-600 hover:text-neutral-900"
            >
              Google maps.
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-medium text-neutral-900 mb-4">
              Contact
            </h2>
            <div className="space-y-2 text-sm text-neutral-600 mb-8">
              <p>
                Email{" "}
                <a
                  href="mailto:Ashley@ashley.com"
                  className="underline hover:text-neutral-900"
                >
                  Ashley@ashley.com
                </a>
              </p>
              <p>
                Telephone{" "}
                <a
                  href="tel:07637263736"
                  className="underline hover:text-neutral-900"
                >
                  07637263736
                </a>
              </p>
              <p>
                Instagram{" "}
                <a
                  href="https://instagram.com/Ashley.Saville"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-neutral-900"
                >
                  Ashley.Saville
                </a>
              </p>
            </div>
            <h2 className="text-sm font-medium text-neutral-900 mb-4">
              Opening Hours
            </h2>
            <p className="text-neutral-600 text-sm">
              Wednesday-Saturday
              <br />
              12-6pm
            </p>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-neutral-200 text-center text-sm text-neutral-500">
          Design and Development: Stella Mathioudakis,{" "}
          <Link href="#" className="underline hover:text-neutral-700">
            Privacy Policy
          </Link>
          , 2026 Ashley Saville
        </footer>
      </div>
    </div>
  );
}

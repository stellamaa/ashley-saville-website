import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-white pt-24 px-6 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-1xl text-neutral-800 font-medium text-center mt-0 sm:mt-20 mb-16">Privacy Policy</h1>

        <div className="text-neutral-900 text-md leading-relaxed space-y-6">
          <p>
            <strong className="text-neutral-900 text-md font-medium">Ashley Saville Art Advisor Ltd (&quot;Ashley Saville&quot;) Privacy Policy</strong>
          </p>
          <p>
            This policy applies to information held about clients and prospective clients, suppliers and prospective suppliers, artists, contacts and all other persons about whom Ashley Saville Art Advisor Ltd (trading as Ashley Saville) holds information. Ashley Saville Art Advisor Ltd is a company registered in England and Wales with No. 16662251. The registered office address is Harrison House Sheep Walk, Langford Road, Biggleswade, Bedfordshire, England, SG18 9RB.
          </p>
          <p>
            This privacy policy was last updated on 4 February 2026.
          </p>
          <p>
            In this policy: &quot;we&quot;, &quot;us&quot; and &quot;our&quot; means Ashley Saville (the &quot;Gallery&quot;); &quot;you&quot; means the individual whose data we collect or process. This privacy policy explains how we collect, use, store, share and protect your personal information when you interact with us — including via our website, in person at events, through email, and through other communications.
          </p>

          <h2 className="text-sm font-medium text-neutral-900 mt-8 mb-2">
            1. Information We Collect
          </h2>
          <p>
            We may collect and process the following personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name and contact details (such as email address, telephone number, postal address);</li>
            <li>Any information you provide when you contact us, register for newsletters, submit forms, or otherwise interact with us;</li>
            <li>Details of purchases, enquiries or bookings you make;</li>
            <li>Information relating to your attendance at exhibitions, events or fairs;</li>
            <li>Payment information where relevant (e.g., for purchases), which may be processed by a third-party payment provider.</li>
          </ul>

          <h2 className="text-sm font-medium text-neutral-900 mt-8 mb-2">
            2. How We Collect Your Information
          </h2>
          <p>
            We collect personal information when you:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use or register on our website;</li>
            <li>Sign up to receive communications from us;</li>
            <li>Contact us by email, phone, social media or in person;</li>
            <li>Make a purchase or enquire about artwork, services or events;</li>
            <li>Attend exhibitions, private views, or other Gallery events.</li>
          </ul>
        </div>

        <p className="mt-12 text-sm">
          <Link href="/information" className="text-neutral-900 hover:text-neutral-600">
            Back to Information
          </Link>
        </p>
      </div>
    </div>
  );
}

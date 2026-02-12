"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "sanity";
import { useState } from "react";

type Props = {
  content: PortableTextBlock[];
};

export default function ReadMore({ content }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!content || content.length === 0) return null;

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="mb-4">{children}</p>,
    },
  };

  return (
    <div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-none" : "max-h-[5.5rem]"
        }`}
      >
        <div className="prose prose-neutral max-w-none text-neutral-900 text-md">
          <PortableText value={content} components={components} />
        </div>
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-md underline text-neutral-900 hover:text-neutral-600"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

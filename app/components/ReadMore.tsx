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

  // Find the index of the readMoreBreak marker block
  const breakIndex = content.findIndex(
    (block: any) => block._type === "readMoreBreak"
  );
  
  // Split content: everything before the marker is visible, everything after is hidden
  const visibleBlocks =
    breakIndex === -1 ? content : content.slice(0, breakIndex);
  
  const hiddenBlocks =
    breakIndex === -1 ? [] : content.slice(breakIndex + 1);

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="mb-1">{children}</p>,
    },
  };

  const handleToggle = () => {
    if (expanded) {
      // When collapsing (Read less), scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="prose prose-neutral max-w-none text-neutral-900 text-md">
        {/* Always show the visible part */}
        <PortableText value={visibleBlocks} components={components} />
  
        {/* Only show the hidden part when expanded */}
        {expanded && hiddenBlocks.length > 0 && (
          <PortableText value={hiddenBlocks} components={components} />
        )}
      </div>
  
      {/* Only show the button if there actually is a hidden part */}
      {hiddenBlocks.length > 0 && (
        <button
          onClick={handleToggle}
          className="mt-0 underline underline decoration-1 underline underline-offset-2 text-neutral-900 hover:text-neutral-600 text-sm md:text-base"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

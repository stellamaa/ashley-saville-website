"use client";

interface FairDocumentsProps {
  download?: string;
  pressRelease?: string;
  pressLinks?: Array<{ label: string; url: string }>;
}

export default function FairDocuments({
  download,
  pressRelease,
  pressLinks,
}: FairDocumentsProps) {
  return (
    <div className="flex flex-col gap-2">
      {download && (
        <a
          href={download}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-900 hover:text-neutral-600"
        >
          Download
        </a>
      )}
      {pressRelease && (
        <a
          href={pressRelease}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-900 hover:text-neutral-600"
        >
          Press Release
        </a>
      )}
      {pressLinks && pressLinks.length > 0 && (
        <div className="flex flex-col gap-2">
          {pressLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-900 hover:text-neutral-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

type Props = {
  CV?: string;
  press?: string;
  pressLinks?: { label?: string; url: string }[];
};

export default function ArtistDocuments({ CV, press, pressLinks }: Props) {
  // Check if there are any valid press links
  const hasPressLinks = pressLinks && pressLinks.some((link) => link.url);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-0">
      {/* Left column: CV and Press Release */}
      <div className="flex flex-col items-start justify-end lg:items-end gap-0 leading-tight">
        {press && (
          <a
            href={press}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 hover:text-neutral-900 order-1 lg:order-2"
          >
            Download Press Release
          </a>
        )}
        {CV && (
          <a
            href={CV}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 hover:text-neutral-900 order-2 lg:order-1"
          >
            Download CV
          </a>
        )}
      </div>
      
      {/* Right column: Press label and links - only show if there are press links */}
      {hasPressLinks && (
        <div className="flex flex-col items-end text-right lg:items-end">
          <p className="text-sm font-bold text-neutral-600 mt-2 lg:mt-2">Press</p>
          {pressLinks?.map(
            (link, idx) =>
              link.url && (
                <a
                  key={link.url + idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 hover:text-neutral-900 mt-0"
                >
                  {link.label || "Press link"}
                </a>
              ),
          )}
        </div>
      )}
    </div>
  );
}

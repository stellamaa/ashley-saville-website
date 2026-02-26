type Props = {
  pressLinks?: { label?: string; url: string }[];
};

export default function ArtistDocuments({ pressLinks }: Props) {
  // Check if there are any valid press links
  const hasPressLinks = pressLinks && pressLinks.some((link) => link.url);

  if (!hasPressLinks) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-0">
      {/* Press label and links */}
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

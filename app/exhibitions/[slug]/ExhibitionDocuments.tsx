type Props = {
  download?: string;
  pressRelease?: string;
  pressLinks?: { label?: string; url: string }[];
};

export default function ExhibitionDocuments({ download, pressRelease, pressLinks }: Props) {
  // Check if there are any valid press links
  const hasPressLinks = pressLinks && pressLinks.some((link) => link.url);
  const hasDownloadOrPressRelease = download || pressRelease;

  // Don't render if there's nothing to show
  if (!hasDownloadOrPressRelease && !hasPressLinks) {
    return null;
  }

  return (
    <div className="flex flex-col items-start lg:items-end gap-0 leading-tight">
      {/* Download and Press Release stacked vertically */}
      {hasDownloadOrPressRelease && (
        <div className="flex flex-col items-start lg:items-end gap-0">
          {download && (
            <a
              href={download}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-900 lg:mt-6"
            >
              Download Press Release
            </a>
          )}
          {pressRelease && (
            <a
              href={pressRelease}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Download Press Release
            </a>
          )}
        </div>
      )}
      
      {/* Press label and links - only show if there are press links */}
      {hasPressLinks && (
        <div className="flex flex-col items-start lg:items-end text-right mt-2">
          <p className="text-sm font-bold text-neutral-600">Press</p>
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

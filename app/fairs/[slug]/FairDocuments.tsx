type Props = {
  pressLinks?: { label?: string; url: string }[];
};

export default function FairDocuments({ pressLinks }: Props) {
  const hasPressLinks = pressLinks && pressLinks.some((link) => link.url);
  if (!hasPressLinks) return null;

  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-col items-end text-right">
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
    </div>
  );
}

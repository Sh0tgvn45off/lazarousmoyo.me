import { Reveal } from "./reveal";

/** Numbered section header: "01 / Selected work", a title, and an optional right-hand note. */
export function SectionHead({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-center justify-between gap-4 border-b border-dashed pb-4">
        <p className="label">
          <span className="text-accent">{index}</span> / {label}
        </p>
        {aside && <div className="label hidden sm:block">{aside}</div>}
      </div>
      <h2 className="mt-8 max-w-3xl text-display-md font-semibold text-balance">{title}</h2>
    </Reveal>
  );
}

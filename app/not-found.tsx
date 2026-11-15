import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[75vh] place-items-center px-5 pt-24 text-center">
      <div className="font-mono">
        <p className="label text-accent">404</p>
        <p className="mt-6 text-lg text-ink-2">
          <span className="text-accent">$</span> cd this-page
        </p>
        <p className="mt-2 text-ink-3">no such file or directory</p>
        <Link href="/" className="mt-8 inline-block rounded-xl bg-accent px-5 py-3 font-sans text-[15px] font-medium text-accent-ink">
          Back home
        </Link>
      </div>
    </section>
  );
}

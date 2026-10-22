import Image from "next/image";

export default function HeroLogoBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Image src="/project-logo-outline.svg" alt="" width={815} height={516} sizes="100vw" className="absolute left-1/2 top-[24%] h-auto w-[98%] max-w-[1600px] -translate-x-1/2 opacity-20" />
    </div>
  );
}

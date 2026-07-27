import Workflow from "@/components/Workflow";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Our Workflow | 3M tech",
  description:
    "See how 3M tech combines creativity, strategy, and technology to deliver software solutions that drive measurable results.",
};

export default function WorkflowPage() {
  return (
    <>
      <section className="relative min-h-[120px] w-full bg-[#302451]">
        <div className="absolute right-0 top-0 z-0 pointer-events-none overflow-hidden opacity-40 md:opacity-70 lg:opacity-100">
          <Image
            src="/rectangles.png"
            alt=""
            width={850}
            height={600}
            className="h-auto w-[250px] sm:w-[350px] md:w-[480px] lg:w-[680px] xl:w-[820px] object-contain translate-x-8 sm:translate-x-0"
          />
        </div>
        <div className="relative z-50 flex items-center justify-between px-5 pt-2 sm:hidden w-full">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="3M Logo"
              width={80}
              height={50}
              className="h-[32px] w-auto object-contain"
            />
          </Link>
          <Link
            href="/contact"
            className="flex h-[32px] items-center justify-center whitespace-nowrap rounded-[150px] bg-white px-5 text-[12px] font-bold text-[#302451] shadow-md"
          >
            Contact
          </Link>
        </div>
        <Navbar />
      </section>
      <Workflow />
    </>
  );
}

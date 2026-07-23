import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about 3M - our mission, story, and the team behind our success.",
  openGraph: {
    title: "About Us | 3M",
    description: "Learn about 3M - our mission, story, and the team behind our success.",
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | 3M",
    description: "Learn about 3M - our mission, story, and the team behind our success.",
  },
};

const values = [
  {
    title: "Excellence",
    description: "We hold ourselves to the highest standards in everything we deliver.",
  },
  {
    title: "Innovation",
    description: "We embrace new ideas and technologies to solve complex business challenges.",
  },
  {
    title: "Integrity",
    description: "We build trust through transparency and honest partnerships.",
  },
  {
    title: "Collaboration",
    description: "We believe the best results come from working together with our clients.",
  },
];

const team = [
  { name: "Alex Morgan", role: "CEO & Founder" },
  { name: "Jordan Lee", role: "Head of Operations" },
  { name: "Casey Kim", role: "Lead Consultant" },
  { name: "Taylor Swift", role: "Director of Technology" },
];

export default function About() {
  return (
    <>
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                About 3M
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Founded with a vision to transform how businesses operate, 3M has grown into a trusted partner for
                organizations seeking meaningful change. We combine deep industry expertise with innovative thinking
                to deliver results that matter.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                From startups to Fortune 500 companies, we&apos;ve helped hundreds of clients navigate complexity,
                seize opportunities, and achieve their goals.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-blue-600 p-6 text-center text-white">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="mt-1 text-sm text-blue-100">Projects Delivered</div>
                </div>
                <div className="rounded-xl bg-blue-700 p-6 text-center text-white">
                  <div className="text-3xl font-bold">12+</div>
                  <div className="mt-1 text-sm text-blue-100">Years Experience</div>
                </div>
                <div className="rounded-xl bg-blue-700 p-6 text-center text-white">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="mt-1 text-sm text-blue-100">Team Members</div>
                </div>
                <div className="rounded-xl bg-blue-600 p-6 text-center text-white">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="mt-1 text-sm text-blue-100">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Mission & Values
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Everything we do is guided by our commitment to excellence and our core values.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-xl border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Meet the people who make it all happen.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.name}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

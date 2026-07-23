import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Projects",
  description: "Explore the portfolio of projects delivered by 3M across various industries.",
  openGraph: {
    title: "Our Projects | 3M",
    description: "Explore the portfolio of projects delivered by 3M across various industries.",
    url: `${SITE_URL}/projects`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects | 3M",
    description: "Explore the portfolio of projects delivered by 3M across various industries.",
  },
};

const projects = [
  {
    title: "Global Logistics Platform",
    category: "Technology",
    description: "Built a real-time logistics tracking platform serving 50+ enterprise clients across 12 countries.",
  },
  {
    title: "Retail Digital Transformation",
    category: "Retail",
    description: "Modernized legacy retail systems for a Fortune 500 company, increasing efficiency by 40%.",
  },
  {
    title: "Healthcare Data Integration",
    category: "Healthcare",
    description: "Unified patient data systems across 20 hospitals, improving care coordination and outcomes.",
  },
  {
    title: "Smart City Infrastructure",
    category: "Government",
    description: "Designed IoT infrastructure for a major metropolitan area, reducing energy costs by 30%.",
  },
  {
    title: "Financial Services Automation",
    category: "Finance",
    description: "Automated compliance reporting for a leading bank, saving 2000+ hours annually.",
  },
  {
    title: "Manufacturing Optimization",
    category: "Manufacturing",
    description: "Implemented predictive maintenance system that reduced downtime by 55%.",
  },
];

export default function Projects() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Our Projects
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            A showcase of the impactful work we&apos;ve delivered across industries.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg"
            >
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {project.category}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

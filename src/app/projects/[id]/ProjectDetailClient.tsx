"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import type { Project } from "@/lib/projects";
import FeatureIcon from "@/components/FeatureIcon";

export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  const [activeImage, setActiveImage] = useState(project.image);

  return (
    <div className="min-h-screen bg-[#f0edf5] flex flex-col justify-between">
      {/* Top Header Section with Glassmorphism Navbar */}
      <div className="relative bg-[#302451] pt-6 sm:pt-10 pb-16 sm:pb-24 px-4 overflow-hidden">
        {/* Background Rectangles Pattern */}
        <div className="absolute right-0 top-0 z-0 pointer-events-none opacity-30">
          <Image
            src="/rectangles.png"
            alt=""
            width={700}
            height={500}
            className="h-auto w-[400px] sm:w-[600px] object-contain"
          />
        </div>

        {/* Desktop Navbar */}
        <Navbar />

        {/* Hero Title & Breadcrumb */}
        <div className="project-detail-header relative z-10 max-w-[1100px] mx-auto pt-10 sm:pt-24 text-center sm:text-left text-white">
          <Link
            href="/projects"
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-200 hover:text-white transition-colors mb-4"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            <span>Back to Our Work</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3 justify-center sm:justify-start">
            <span className="text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-md text-white px-3.5 py-1 rounded-full">
              {project.category}
            </span>
            {project.completionDate && (
              <span className="text-xs text-purple-200">
                Completed: {project.completionDate}
              </span>
            )}
          </div>

          <h1
            style={{ fontFamily: '"MedulaOne", serif' }}
            data-preserve-font="true"
            className="text-[44px] sm:text-[68px] lg:text-[84px] font-normal leading-none mb-4"
          >
            {project.title}
          </h1>

          <p
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-[850px] leading-relaxed"
          >
            {project.longDescription}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 -mt-10 sm:-mt-16 relative z-20 pb-20">
        {/* Main Showcase Preview Image */}
        <div className="relative w-full aspect-[16/9] bg-[#302451] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border-4 border-white mb-6">
          <Image
            src={activeImage || project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-all duration-300"
            priority
          />
        </div>

        {/* Gallery Thumbnails Grid (Multiple Screenshots) */}
        <div className="bg-white/80 backdrop-blur-md rounded-[24px] p-4 sm:p-6 shadow-lg mb-10 border border-white">
          <h3
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="project-section-title text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 text-left"
          >
            Project Image Gallery & Views (Click to Preview)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                  activeImage === img
                    ? "border-[#302451] ring-2 ring-[#302451]/30 scale-[1.02] shadow-md"
                    : "border-transparent opacity-75 hover:opacity-100 hover:scale-[1.01]"
                }`}
              >
                <Image
                  src={img}
                  alt={`Screenshot ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] sm:text-xs font-bold bg-[#302451]/90 px-2.5 py-1 rounded-full">
                    View {idx + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Project Features & Specifications Grid */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 shadow-xl mb-10 border border-gray-100">
          <h2
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="project-section-title text-2xl sm:text-3xl font-bold text-[#302451] mb-6 border-b border-gray-100 pb-4 text-left"
          >
            Project Highlights & Specifications
          </h2>

          <div className="project-feature-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#302451] text-white shadow-[0_8px_20px_rgba(48,36,81,.18)]">
                  <FeatureIcon name={feat.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-base sm:text-lg font-bold text-[#302451] mb-1"
                  >
                    {feat.title}
                  </h3>
                  <p
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                  >
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack & Live Link */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
            <div className="project-tech-stack text-left w-full sm:w-auto">
              <h4
                style={{ fontFamily: '"Cairo", sans-serif' }}
                className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
              >
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="px-3.5 py-1.5 rounded-full bg-[#302451] text-white text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: '"Cairo", sans-serif' }}
              className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-full bg-[#302451] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-[#43346d] transition-all hover:scale-105 active:scale-95"
            >
              <span>Visit Live Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </a>
          </div>
        </div>

        {/* Back Link Button */}
        <div className="text-center">
          <Link
            href="/projects"
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-white text-[#302451] border border-gray-200 font-bold text-sm shadow-md hover:bg-gray-50 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> Back to All Projects
          </Link>
        </div>
      </main>
    </div>
  );
}

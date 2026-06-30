import React from "react";
export const unstable_instant = false;
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/interiorData";
import { getProjectDetails } from "@/components/lib/ProjectDetailsMapper";
import { ArrowLeft, MapPin, Calendar, Check, FolderKanban, ShieldCheck, ChevronRight } from "lucide-react";
import BookConsultationButton from "@/components/BookConsultationButton";
import FaqAccordion from "@/components/FaqAccordion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Premium Interior Portfolio`,
    description: `${project.description} Handcrafted custom finishes completed in ${project.location} by Panchal Interior.`,
    keywords: [
      project.title.toLowerCase(),
      `interior design ${project.location.toLowerCase()}`,
      `bespoke carpentry ${project.category.toLowerCase()}`,
      "Ahmedabad interior designer",
      "Gota furniture workshop"
    ],
    alternates: {
      canonical: `https://panchal-interior.vercel.app/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Premium Interior Portfolio | Panchal Interior`,
      description: `${project.description} Handcrafted custom finishes completed in ${project.location} by Panchal Interior.`,
      url: `https://panchal-interior.vercel.app/projects/${project.slug}`,
      type: "website",
      images: [
        {
          url: "https://panchal-interior.vercel.app/og-image.jpg",
          width: 1024,
          height: 1024,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Premium Interior Portfolio | Panchal Interior`,
      description: `${project.description} Handcrafted custom finishes completed in ${project.location} by Panchal Interior.`,
      images: ["https://panchal-interior.vercel.app/og-image.jpg"],
    },
  };
}

export default async function ProjectDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const rawProject = projectsData.find((p) => p.slug === slug);

  if (!rawProject) {
    notFound();
  }

  // Get dynamically enriched details
  const project = getProjectDetails(rawProject);

  // Creative Work Schema
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "image": `https://panchal-interior.vercel.app${project.image}`,
    "description": project.description,
    "locationCreated": {
      "@type": "Place",
      "name": project.location,
    },
    "creator": {
      "@type": "Organization",
      "name": "Panchal Interior & Furniture Solutions",
      "url": "https://panchal-interior.vercel.app",
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": project.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // Find related projects (same category, or random if none)
  const relatedProjects = projectsData
    .filter((p) => p.id !== project.id && (p.category === project.category || p.category === "Residential"))
    .slice(0, 2);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://panchal-interior.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://panchal-interior.vercel.app/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://panchal-interior.vercel.app/projects/${project.slug}`
      }
    ]
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-stone-200/60 py-3.5 px-5">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-stone-400 text-[10px] uppercase font-bold tracking-wider">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="h-3 w-3 text-stone-300" />
          <Link href="/projects" className="hover:text-primary transition">Projects</Link>
          <ChevronRight className="h-3 w-3 text-stone-300" />
          <span className="text-stone-700 line-clamp-1">{project.title}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative h-[480px] bg-stone-900 overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 w-full pb-12 text-left">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-bold uppercase tracking-wider transition mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <div>
            <span className="inline-block text-[10px] font-bold text-stone-900 bg-primary px-3 py-1 rounded mb-4 uppercase tracking-widest">
              {project.category} Showcase
            </span>
            <h1 className="font-cormorant text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-stone-300 text-xs mt-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                Year: {project.year}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specs Info Grid */}
      <section className="max-w-7xl mx-auto px-5 -mt-10 relative z-20">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-8 shadow-md grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <span className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider">Client Type</span>
            <span className="block text-stone-850 font-bold text-sm md:text-base mt-1.5">{project.clientType}</span>
          </div>
          <div>
            <span className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider">Execution Timeline</span>
            <span className="block text-stone-850 font-bold text-sm md:text-base mt-1.5">{project.duration}</span>
          </div>
          <div>
            <span className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider">Project Area Size</span>
            <span className="block text-stone-850 font-bold text-sm md:text-base mt-1.5">{project.areaSize}</span>
          </div>
          <div>
            <span className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider">Core Service</span>
            <span className="block text-stone-850 font-bold text-sm md:text-base mt-1.5 truncate" title={project.services.join(", ")}>
              {project.services[0]}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Details & Materials Two-Column Block */}
      <section className="max-w-7xl mx-auto px-5 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
        {/* Left Column (2/3 width) - Overview */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h2 className="font-cormorant text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Project Design & Execution Overview
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              {project.description} This layout was customized to match the floor plan parameters, focusing on space optimization, structural durability, and a premium aesthetic finish. All cabinetry and wooden profiles were machined and finished in our Gota factory to ensure zero on-site gaps.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              From false ceilings with conceal LED profiles to heavy-duty wardrobe drawers, our designers supervised every segment. The result is a seamless, beautiful living space built with termite-treated logs and boiling water resistant boards.
            </p>
          </div>

          {/* Work Categories Subsections */}
          <div className="space-y-6">
            <h3 className="font-outfit text-xl font-bold text-stone-900">Key Executed Carpentry Work</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.workCategories.map((wc, idx) => (
                <div key={idx} className="bg-white border border-stone-200/60 rounded-xl p-5 shadow-sm space-y-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-primary-light text-primary font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm mt-3">{wc.title}</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">{wc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) - Materials & Details */}
        <div className="space-y-8">
          {/* Materials Box */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest border-b border-stone-100 pb-3 flex items-center gap-2">
              <FolderKanban className="h-4.5 w-4.5 text-primary" />
              Materials Integrated
            </h3>
            <ul className="space-y-3 text-xs text-stone-700 font-medium">
              {project.materials.map((mat, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quality Trust Box */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:12px_12px]" />
            <ShieldCheck className="h-8 w-8 text-primary mb-3" />
            <h4 className="font-bold text-white text-sm">5-Year Wood Warranty</h4>
            <p className="text-stone-400 text-xs mt-2 leading-relaxed">
              Every solid wood custom furniture and modular plywood frame in this project carries our workshop-direct replacement warranty.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Before & After Showcase */}
      <section className="max-w-7xl mx-auto px-5 mt-16 text-left">
        <h2 className="font-cormorant text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3 mb-8">
          Design Transformation (Before vs After)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
            <Image
              src={project.gallery[1] || project.image}
              alt="Design site layout state before carpentry"
              fill
              sizes="(max-w-7xl) 50vw, 100vw"
              className="object-cover grayscale brightness-75"
            />
            <span className="absolute top-4 left-4 bg-stone-900/90 text-white text-xs font-bold px-3 py-1 rounded shadow">
              Before Setup
            </span>
          </div>

          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
            <Image
              src={project.image}
              alt="Finished design site layout after custom carpentry completion"
              fill
              sizes="(max-w-7xl) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded shadow">
              After Completion
            </span>
          </div>
        </div>
      </section>

      {/* 6. Dynamic Project FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-5 mt-20 text-left space-y-6">
        <h2 className="font-cormorant text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3 text-center">
          Project Consultation FAQs
        </h2>
        <FaqAccordion faqs={project.faqs} />
      </section>

      {/* 7. Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 mt-24 text-left">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-extrabold text-stone-900 border-b border-stone-150 pb-3 mb-10">
            Explore Similar Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((proj) => (
              <div
                key={proj.id}
                className="group bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
              >
                <Link href={`/projects/${proj.slug}`} className="block relative h-60 w-full overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-w-7xl) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 text-[10px] font-bold text-stone-900 bg-white/95 px-2.5 py-1 rounded shadow-sm z-10">
                    {proj.category}
                  </span>
                </Link>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-outfit font-semibold text-base md:text-lg leading-normal tracking-normal text-stone-900 group-hover:text-primary transition">
                      <Link href={`/projects/${proj.slug}`}>
                        {proj.title}
                      </Link>
                    </h3>
                    <p className="text-stone-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-medium">📍 {proj.location}</span>
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      View Project
                      <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Call To Action (CTA) */}
      <section className="max-w-4xl mx-auto px-5 mt-20 text-center">
        <div className="bg-stone-900 text-white rounded-2xl p-10 border border-stone-850 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:16px_16px]" />
          <h3 className="font-outfit text-2xl font-bold">Love this project layout style?</h3>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Connect with राजेश पंचाल and schedule a free site visit. We will take exact site measurements and prepare custom 3D estimates.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <BookConsultationButton
              label={`Consult about ${project.title}`}
              productOrServiceName={project.title}
              className="font-outfit font-medium text-sm md:text-base rounded-lg bg-primary hover:bg-primary-hover text-white py-3 px-6 cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <Link
              href="/contact"
              className="font-outfit font-medium text-sm md:text-base rounded-lg border border-stone-700 hover:bg-stone-800 text-stone-300 py-3 px-6 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Contact Our Showroom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

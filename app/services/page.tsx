"use client";

import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/interiorData";
import { 
  Sofa, 
  CookingPot, 
  Palette, 
  Zap, 
  Paintbrush, 
  Armchair,
  ArrowRight,
  Check
} from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const { openQuoteModal } = useQuoteModal();

  const getServiceIcon = (iconName: string) => {
    const iconClass = "h-7 w-7 text-primary group-hover:text-white transition duration-300";
    switch (iconName) {
      case "Sofa":
        return <Sofa className={iconClass} />;
      case "Armchair":
        return <Armchair className={iconClass} />;
      case "CookingPot":
        return <CookingPot className={iconClass} />;
      case "Palette":
        return <Palette className={iconClass} />;
      case "Zap":
        return <Zap className={iconClass} />;
      case "Paintbrush":
        return <Paintbrush className={iconClass} />;
      default:
        return <Sofa className={iconClass} />;
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Page Header */}
      <section className="relative py-20 bg-stone-900 overflow-hidden text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-md"
          >
            What We Do
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl font-extrabold text-white mt-5"
          >
            Our Professional Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed"
          >
            From bespoke solid wood furniture to complete residential & commercial interior design execution.
          </motion.p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="max-w-7xl mx-auto px-5 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100/80 transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-w-7xl) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-8">
                  {/* Header info */}
                  <div className="flex justify-between items-start">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-primary group-hover:bg-primary transition duration-300">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border border-stone-200 px-2 py-0.5 rounded whitespace-nowrap">
                      Service 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-stone-900 mt-6 group-hover:text-primary transition">
                    {service.name}
                  </h2>
                  
                  <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features Checklist */}
                  <div className="mt-6 border-t border-stone-100 pt-6">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">Key Features:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600 text-xs">
                      {service.features.slice(0, 4).map((feat, i) => (
                        <li key={i} className="flex gap-2 items-center">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-8 pb-8 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-stone-900 group-hover:text-primary transition"
                >
                  Learn Detailed Process
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => openQuoteModal(service.name)}
                  className="rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 px-4 shadow-sm transition cursor-pointer"
                >
                  Get A Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section className="max-w-4xl mx-auto px-5 mt-20 text-center">
        <div className="bg-stone-900 rounded-2xl p-10 text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:16px_16px]" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold">Looking for a specific customization?</h3>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
            We love challenging architectural designs. Contact our workshop directly and share your custom concepts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => openQuoteModal()}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-5 text-sm cursor-pointer"
            >
              Consult Bechar Panchal
            </button>
            <a
              href="tel:+919925111438"
              className="rounded-lg border border-stone-700 hover:bg-stone-850 text-stone-300 font-bold py-2.5 px-5 text-sm"
            >
              Call Hotline
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

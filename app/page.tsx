"use client";

import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import InteriorEstimator from "@/components/InteriorEstimator";
import EndToEndSolutions from "@/components/EndToEndSolutions";
import { 
  servicesData, 
  categoriesData, 
  advantagesData, 
  testimonialsData 
} from "@/data/interiorData";
import { 
  Sofa, 
  CookingPot, 
  Palette, 
  Zap, 
  Paintbrush, 
  Armchair,
  BadgePercent, 
  Gem, 
  Sliders, 
  Users, 
  CalendarCheck, 
  Headphones,
  ArrowRight,
  Star,
  Quote
} from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { motion } from "framer-motion";

export default function HomePage() {
  const { openQuoteModal } = useQuoteModal();

  // Helper to map icon names to Lucide icons for services
  const getServiceIcon = (iconName: string) => {
    const iconClass = "h-8 w-8 text-primary group-hover:text-white transition duration-300";
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

  // Helper to map icon names for advantages
  const getAdvantageIcon = (iconName: string) => {
    const iconClass = "h-7 w-7 text-primary shrink-0";
    switch (iconName) {
      case "BadgePercent":
        return <BadgePercent className={iconClass} />;
      case "Gem":
        return <Gem className={iconClass} />;
      case "Sliders":
        return <Sliders className={iconClass} />;
      case "Users":
        return <Users className={iconClass} />;
      case "CalendarCheck":
        return <CalendarCheck className={iconClass} />;
      case "Headphones":
        return <Headphones className={iconClass} />;
      default:
        return <Gem className={iconClass} />;
    }
  };

  return (
    <>
      <Hero />

      {/* 1. Services Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
              Our Services
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Complete home interior and furniture solutions under one roof
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 text-left">
            {servicesData.map((service, idx) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative bg-white border border-stone-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-primary-cream/50 transition duration-300"
              >
                {/* Icon Circle */}
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-light text-primary group-hover:bg-primary transition duration-300">
                  {getServiceIcon(service.icon)}
                </div>
                
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-6">
                  {service.name}
                </h3>
                
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-8 flex justify-between items-center">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-sm font-bold text-stone-950 group-hover:text-primary transition flex items-center gap-1"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={() => openQuoteModal(service.name)}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Inquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 transition cursor-pointer"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Popular Furniture Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
              Popular Furniture Categories
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Explore our wide range of premium furniture, custom crafted for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {categoriesData.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                {/* Category Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-w-7xl) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />
                
                {/* Text content on card */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-stone-300 text-xs mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`/products?category=${cat.id}`}
                      className="text-xs font-bold text-primary bg-primary-light/10 border border-primary/20 hover:bg-primary hover:text-white px-4 py-1.5 rounded-lg backdrop-blur-sm transition duration-300"
                    >
                      Explore Collection
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 transition cursor-pointer"
            >
              Explore All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2.3 End-to-End Solutions Section */}
      <EndToEndSolutions />

      {/* 2.5 Cost Estimator Section */}
      <InteriorEstimator />

      {/* 3. Why Choose Us Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900"
            >
              Why Choose Us
            </motion.h2>
            <p className="text-stone-500 text-sm mt-3 max-w-xl mx-auto">
              Our commitment to materials, design, and direct factory pricing makes us your perfect home solutions partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {advantagesData.map((adv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex gap-4 bg-white border border-stone-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  {getAdvantageIcon(adv.icon)}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">
                    {adv.title}
                  </h3>
                  <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900"
            >
              Customer Reviews
            </motion.h2>
            <p className="text-stone-500 text-sm mt-3 max-w-xl mx-auto">
              Read stories of client satisfaction across Ahmedabad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {testimonialsData.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-stone-50 rounded-2xl p-8 border border-stone-100/60 shadow-sm"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
                <div className="flex gap-1">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm italic mt-5 leading-relaxed font-medium">
                  "{test.text}"
                </p>
                <div className="mt-6 border-t border-stone-200/60 pt-4 flex justify-between items-center">
                  <div>
                    <span className="block font-bold text-stone-900 text-sm">{test.name}</span>
                    <span className="block text-stone-400 text-xs mt-0.5">{test.role}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                    📍 {test.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action Section */}
      <section className="bg-stone-950 py-20 border-t border-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Transform Your Living Space?
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Get in touch with our design experts today. We provide free site measurement consultations and dynamic 3D rendering designs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openQuoteModal()}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 shadow-lg transition duration-300 cursor-pointer"
            >
              Get Free Measurement Quote
            </button>
            <Link
              href="/contact"
              className="rounded-lg border border-stone-800 text-stone-300 hover:bg-stone-900 hover:text-white font-bold py-3 px-8 transition"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
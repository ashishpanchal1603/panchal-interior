"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";

// Custom SVG Blueprint Icons matching the theme color and architectural design style
const KitchenIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22,10 L42,10 L42,22 L48,30 H16 L22,22 Z" />
    <path d="M12,42 H52 V50 H12 Z" />
    <circle cx="24" cy="42" r="3" />
    <circle cx="40" cy="42" r="3" />
    <line x1="20" y1="46" x2="22" y2="46" />
    <line x1="42" y1="46" x2="44" y2="46" />
  </svg>
);

const WardrobeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="16" y="8" width="32" height="48" rx="2" />
    <line x1="32" y1="8" x2="32" y2="56" />
    <line x1="28" y1="26" x2="28" y2="34" />
    <line x1="36" y1="26" x2="36" y2="34" />
    <line x1="16" y1="44" x2="48" y2="44" />
  </svg>
);

const CrockeryIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="16" y="8" width="32" height="48" rx="2" />
    <line x1="16" y1="32" x2="48" y2="32" />
    <line x1="16" y1="44" x2="48" y2="44" />
    <line x1="32" y1="8" x2="32" y2="32" />
    <path d="M22,16 H26 L24,22 Z" />
    <line x1="24" y1="22" x2="24" y2="26" />
    <line x1="22" y1="26" x2="26" y2="26" />
    <path d="M38,16 H42 L40,22 Z" />
    <line x1="40" y1="22" x2="40" y2="26" />
    <line x1="38" y1="26" x2="42" y2="26" />
    <path d="M20,40 Q24,42 28,40" />
    <path d="M19,38 Q24,40 29,38" />
  </svg>
);

const SpaceSavingIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="14" y="8" width="36" height="48" rx="2" />
    <path d="M22,50 L42,30" />
    <line x1="42" y1="30" x2="38" y2="22" />
    <circle cx="22" cy="50" r="2" />
    <path d="M44,48 A 14,14 0 0 0 46,38" />
    <path d="M42,38 L46,38 L46,42" />
  </svg>
);

const TvUnitIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="16" y="14" width="32" height="20" rx="2" />
    <path d="M28,34 L30,38 H34 L36,34" />
    <rect x="10" y="44" width="44" height="10" rx="1" />
    <line x1="27" y1="44" x2="27" y2="54" />
    <line x1="37" y1="44" x2="37" y2="54" />
    <circle cx="18.5" cy="49" r="1.5" />
    <circle cx="45.5" cy="49" r="1.5" />
  </svg>
);

const StudyTableIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="10" y1="36" x2="54" y2="36" />
    <line x1="14" y1="36" x2="14" y2="56" />
    <line x1="50" y1="36" x2="50" y2="56" />
    <rect x="22" y="22" width="20" height="12" rx="1.5" />
    <line x1="18" y1="34" x2="46" y2="34" />
    <path d="M14,36 V24 C14,20 18,20 18,22" />
    <path d="M16,22 H20 L19,25 H17 Z" />
  </svg>
);

const FalseCeilingIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8,12 H56 V20 H44 V26 H20 V20 H8 Z" />
    <circle cx="28" cy="23" r="2" />
    <circle cx="36" cy="23" r="2" />
    <line x1="28" y1="25" x2="22" y2="44" strokeDasharray="3 3" />
    <line x1="28" y1="25" x2="34" y2="44" strokeDasharray="3 3" />
    <line x1="36" y1="25" x2="30" y2="44" strokeDasharray="3 3" />
    <line x1="36" y1="25" x2="42" y2="44" strokeDasharray="3 3" />
  </svg>
);

const LightsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="32" y1="8" x2="32" y2="28" />
    <path d="M22,28 H42 L46,38 H18 Z" />
    <circle cx="32" cy="42" r="4" />
    <line x1="32" y1="46" x2="32" y2="52" />
    <line x1="18" y1="46" x2="14" y2="50" />
    <line x1="46" y1="46" x2="50" y2="50" />
  </svg>
);

const WallpaperIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="16" y="8" width="32" height="8" rx="2" />
    <path d="M16,12 V48 C16,52 20,54 24,54 H40 C44,54 48,52 48,48 V12" />
    <path d="M22,22 C26,20 28,24 32,22 C36,20 38,24 42,22" />
    <path d="M22,34 C26,32 28,36 32,34 C36,32 38,36 42,34" />
    <path d="M22,46 C26,44 28,48 32,46 C36,44 38,48 42,46" />
  </svg>
);

const PaintIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="22" y="10" width="24" height="10" rx="2" />
    <path d="M46,15 H50 V30 H32 V36" />
    <rect x="28" y="36" width="8" height="16" rx="1" />
    <path d="M14,10 H22 V44 C22,48 14,48 14,44 Z" />
    <line x1="18" y1="46" x2="18" y2="52" />
  </svg>
);

const BathroomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="24" y="8" width="16" height="20" rx="8" />
    <rect x="12" y="38" width="40" height="4" rx="1" />
    <path d="M20,38 C20,48 44,48 44,38 Z" />
    <path d="M32,38 V32 C32,30 30,28 28,30" />
    <circle cx="29" cy="34" r="0.5" />
    <circle cx="29" cy="36" r="0.5" />
  </svg>
);

const PoojaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="12" y="46" width="40" height="8" rx="2" />
    <line x1="18" y1="46" x2="18" y2="28" />
    <line x1="46" y1="46" x2="46" y2="28" />
    <path d="M14,28 C14,18 32,10 32,10 C32,10 50,18 50,28 Z" />
    <line x1="32" y1="10" x2="32" y2="6" />
    <circle cx="32" cy="5" r="1" />
    <path d="M32,46 C29,46 28,44 32,40 C36,44 35,46 32,46 Z" />
  </svg>
);

const FoyerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="10" y="8" width="24" height="48" rx="1" />
    <circle cx="30" cy="32" r="1.5" />
    <rect x="38" y="34" width="16" height="22" rx="2" />
    <line x1="38" y1="45" x2="54" y2="45" />
    <line x1="46" y1="34" x2="46" y2="56" />
    <path d="M44,34 L45,28 H47 L48,34 Z" />
  </svg>
);

const MovableFurnitureIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="18" y="18" width="28" height="18" rx="4" />
    <rect x="14" y="32" width="6" height="12" rx="1.5" />
    <rect x="44" y="32" width="6" height="12" rx="1.5" />
    <rect x="20" y="36" width="24" height="8" rx="2" />
    <line x1="16" y1="44" x2="14" y2="52" />
    <line x1="48" y1="44" x2="50" y2="52" />
    <line x1="22" y1="44" x2="22" y2="52" />
    <line x1="42" y1="44" x2="42" y2="52" />
  </svg>
);

const KidsBedroomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="14" y1="10" x2="14" y2="54" />
    <line x1="50" y1="10" x2="50" y2="54" />
    <rect x="14" y="20" width="36" height="6" rx="1" />
    <rect x="14" y="40" width="36" height="6" rx="1" />
    <line x1="42" y1="20" x2="42" y2="46" />
    <line x1="46" y1="20" x2="46" y2="46" />
    <line x1="42" y1="26" x2="46" y2="26" />
    <line x1="42" y1="32" x2="46" y2="32" />
    <line x1="42" y1="38" x2="46" y2="38" />
  </svg>
);

interface SolutionItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function EndToEndSolutions() {
  const { openQuoteModal } = useQuoteModal();

  const solutions: SolutionItem[] = [
    { id: "kitchen", name: "Modular Kitchen", icon: KitchenIcon, description: "Custom layouts, soft-close hardware & acrylic finishes" },
    { id: "wardrobe", name: "Storage & Wardrobes", icon: WardrobeIcon, description: "Sliding and swing wardrobes with loft storage solutions" },
    { id: "crockery", name: "Crockery Units", icon: CrockeryIcon, description: "Elegant glass shutters & integrated showcase profile lighting" },
    { id: "spacesaving", name: "Space Saving Furniture", icon: SpaceSavingIcon, description: "Wall beds, foldable desks & smart multipurpose tables" },
    { id: "tvunit", name: "TV Units", icon: TvUnitIcon, description: "Floating TV consoles, marble backing panels & clean cable outlets" },
    { id: "study", name: "Study Tables", icon: StudyTableIcon, description: "Ergonomic workspace desks with drawer storage partitions" },
    { id: "ceiling", name: "False Ceiling", icon: FalseCeilingIcon, description: "Gypsum board framing designs, wood rafters & light coves" },
    { id: "lights", name: "Lights & Fixtures", icon: LightsIcon, description: "Hanging pendants, ambient spotlights & track lighting systems" },
    { id: "wallpaper", name: "Wallpaper Designs", icon: WallpaperIcon, description: "Textured canvas wall coverings & customizable designer patterns" },
    { id: "paint", name: "Wall Paint", icon: PaintIcon, description: "Royal velvet sheen finishes, putty coats & mechanical sanding" },
    { id: "bathroom", name: "Bathrooms", icon: BathroomIcon, description: "Under-sink vanity units, waterproof plumbing & premium tiling" },
    { id: "pooja", name: "Pooja Unit", icon: PoojaIcon, description: "Teak-wood CNC lattices, white marble mandirs & ambient lights" },
    { id: "foyer", name: "Foyer Designs", icon: FoyerIcon, description: "Console storage, wall mirror setups & wood panel entries" },
    { id: "movable", name: "Movable Furniture", icon: MovableFurnitureIcon, description: "Ergonomic armchairs, customizable fabric sofas & dining sets" },
    { id: "kids", name: "Kids Bedroom", icon: KidsBedroomIcon, description: "Integrated study zones, ladder-climb bunk beds & toy shelves" }
  ];

  return (
    <section className="py-24 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-5 text-center">

        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            What We Do
          </span>
          <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-4 leading-tight">
            End-to-End Interior Solutions
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-4">
            Everything you need for your home under one roof. Our Ahmedabad workshop designs and manufactures all components locally.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mt-16">
          {solutions.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                // onClick={() => openQuoteModal(item.name)}
                className="group p-6 rounded-2xl border border-stone-200/50 hover:border-primary/40 bg-white hover:bg-stone-50/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center cursor-pointer text-center justify-between"
              >
                {/* Icon Container */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-primary/10 shadow-sm">
                  <IconComponent className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Details */}
                <div className="mt-4 flex-grow flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-tight group-hover:text-primary transition">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-[10px] sm:text-xs mt-2 leading-relaxed opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-350">
                      {item.description}
                    </p>
                  </div>

                  {/* <div className="mt-4 flex items-center justify-center gap-1 text-[10px] font-bold text-primary opacity-30 group-hover:opacity-100 transition-opacity">
                    Inquire <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div> */}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

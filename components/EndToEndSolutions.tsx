"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Send, ChevronLeft, ChevronRight, MapPin, Hammer } from "lucide-react";
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

// Category Specific Galleries
const categoryGalleries: Record<string, { title: string; subtitle: string; images: string[] }> = {
  kitchen: {
    title: "Modular Kitchen Portfolio",
    subtitle: "Custom-made on-site by our expert kitchen carpenters with BWP Waterproof Plywood",
    images: [
      "/images/modular_kitchen_carpenter_1.png",
      "/images/modular_kitchen_carpenter_2.png",
      "/images/modular_kitchen.png",
      "/images/kitchen_lshape.png",
      "/images/kitchen_parallel.png",
      "/images/kitchen_straight.png",
      "/images/kitchen_ushape.png",
      "/images/interior_3bhk.png"
    ]
  },
  wardrobe: {
    title: "Bespoke Storage & Wardrobes",
    subtitle: "Seasoned plywood structures, laminate moldings, and sliding tracks fabricated on-site",
    images: [
      "/images/wardrobe_carpenter_1.png",
      "/images/wardrobe.png",
      "/images/wardrobe_sliding.png",
      "/images/wardrobe_swing.png",
      "/images/wardrobe_walkin.png",
      "/images/living_room_tv_wardrobe.png"
    ]
  },
  tvunit: {
    title: "Custom Entertainment & TV Units",
    subtitle: "Plywood frame layout, laminate pasting, and smart cable conduit channels",
    images: [
      "/images/tv_unit_carpenter_1.png",
      "/images/tv_unit.png",
      "/images/living_room_tv_wardrobe.png",
      "/images/interior_2bhk.png"
    ]
  },
  movable: {
    title: "Sofa Frame & Custom Furniture Carpentry",
    subtitle: "Seasoned pine/neem wood frames, heavy webbing, and Sleepwell foam in our local workshop",
    images: [
      "/images/sofa_carpenter_1.png",
      "/images/sofa_frame_construction.png",
      "/images/sofa_set.png",
      "/images/l_shape_sofa.png",
      "/images/wooden_bed.png"
    ]
  },
  pooja: {
    title: "Artisanal Teak Wood Pooja Mandirs",
    subtitle: "Teak carvings, temple domes, and melamine hand polishing work in our Gota workshop",
    images: [
      "/images/pooja_unit_carpenter_1.png",
      "/images/custom_door_grill.png",
      "/images/interior_3bhk.png"
    ]
  },
  crockery: {
    title: "Crockery Cabinet Showcases",
    subtitle: "Profile glass shelves, drawer organizers, and warm background accent strip lights",
    images: [
      "/images/wardrobe_walkin.png",
      "/images/living_room_tv_wardrobe.png",
      "/images/interior_2bhk.png"
    ]
  },
  spacesaving: {
    title: "Smart Space-Saving Furniture",
    subtitle: "Custom folding desks, wall beds, and multi-purpose custom carpentry items",
    images: [
      "/images/wardrobe_sliding.png",
      "/images/interior_1bhk.png",
      "/images/wooden_bed.png"
    ]
  },
  study: {
    title: "Bespoke Study Tables & Home Workspaces",
    subtitle: "Wall-mounted desks, customized drawer files, and oak veneer polish coats",
    images: [
      "/images/tv_unit_carpenter_1.png",
      "/images/interior_1bhk.png",
      "/images/living_room_tv_wardrobe.png"
    ]
  },
  ceiling: {
    title: "False Ceiling & Gypsum Frameworks",
    subtitle: "Metal framing grid layout, gypsum board pasting, and electrical light channel cutouts",
    images: [
      "/images/hero.png",
      "/images/living_room_tv_wardrobe.png",
      "/images/interior_2bhk.png"
    ]
  },
  lights: {
    title: "Electrical Wire Conduit & Fixtures",
    subtitle: "Concealed wire layouts, modular switchboards, and profile LEDs fitted inside wood cabinetry",
    images: [
      "/images/electrical_work.png",
      "/images/hero.png",
      "/images/tv_unit.png"
    ]
  },
  wallpaper: {
    title: "Wallpaper Designs & Accent Panels",
    subtitle: "Seamless wallpaper pasting, custom fluted panels, and veneer wall claddings",
    images: [
      "/images/interior_3bhk.png",
      "/images/living_room_tv_wardrobe.png",
      "/images/tv_unit.png"
    ]
  },
  paint: {
    title: "Wall Painting & Wood Polishing",
    subtitle: "Putty sanding coats, Asian Paints Royal sheen finishes, and PU melamine wood coatings",
    images: [
      "/images/painting_service.png",
      "/images/interior_2bhk.png",
      "/images/interior_3bhk.png"
    ]
  },
  bathroom: {
    title: "Waterproof Bathroom Vanities",
    subtitle: "BWP grade waterproof marine plywood under-sink storage boxes and mirror panels",
    images: [
      "/images/wardrobe_sliding.png",
      "/images/interior_2bhk.png"
    ]
  },
  foyer: {
    title: "Foyer Entry Consoles & Shoe Cabinets",
    subtitle: "Custom console shelves, wooden moldings, and teak doors built directly on-site",
    images: [
      "/images/custom_door_grill.png",
      "/images/living_room_tv_wardrobe.png",
      "/images/interior_3bhk.png"
    ]
  },
  kids: {
    title: "Kids Bedroom Built-in Custom Woodwork",
    subtitle: "Colorful laminate sheets, built-in study bookshelves, and custom wooden bed platforms",
    images: [
      "/images/wooden_bed.png",
      "/images/interior_1bhk.png",
      "/images/interior_2bhk.png"
    ]
  }
};

export default function EndToEndSolutions() {
  // const { openQuoteModal } = useQuoteModal();
  const [galleryCategory, setGalleryCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (galleryCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [galleryCategory]);

  const closeGallery = () => {
    setGalleryCategory(null);
    setLightboxIndex(null);
  };

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

  const activeGallery = galleryCategory ? categoryGalleries[galleryCategory] : null;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeGallery && lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null || prev === 0 ? activeGallery.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeGallery && lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null || prev === activeGallery.images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <section className="py-12 md:py-24 bg-stone-50 border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-5 text-center">

        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-4 leading-tight">
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
                onClick={() => setGalleryCategory(item.id)}
                className="group p-6 rounded-2xl border border-stone-200/50 hover:border-primary/40 bg-white hover:bg-stone-50/50 transition-all duration-300 flex flex-col items-center cursor-pointer text-center justify-between shadow-sm hover:shadow-lg h-full"
              >
                {/* Icon Container */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 border bg-primary-light text-primary group-hover:bg-primary group-hover:text-white border-primary/10 shadow-sm">
                  <IconComponent className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Details */}
                <div className="mt-4 flex-grow flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base leading-tight text-stone-900 group-hover:text-primary transition">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-[10px] sm:text-xs mt-2 leading-relaxed opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto overflow-hidden transition-all duration-350">
                      {item.description}
                    </p>
                  </div>

                  {/* Action prompt */}
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary mt-4 group-hover:underline inline-block">
                    View Real Work Photos →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 1. Category Gallery Modal */}
      <AnimatePresence>
        {galleryCategory && activeGallery && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-h-[85vh] sm:max-w-4xl rounded-3xl bg-white shadow-2xl z-10 border border-stone-100 flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-stone-950 text-white p-5 flex items-center justify-between border-b border-stone-850 shrink-0">
                <div className="text-left">
                  <h3 className="text-lg sm:text-2xl font-cormorant font-black tracking-wide flex items-center gap-2">
                    <Hammer className="h-5 w-5 text-primary shrink-0" />
                    {activeGallery.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-400 mt-1">{activeGallery.subtitle}</p>
                </div>
                <button
                  onClick={closeGallery}
                  className="rounded-full bg-stone-800 hover:bg-stone-700 p-2 text-stone-300 hover:text-white transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Photos Grid Container */}
              <div className="flex-grow overflow-y-auto p-6 bg-stone-50/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {activeGallery.images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer border border-stone-200/80 bg-white"
                    >
                      <Image
                        src={img}
                        alt={`${activeGallery.title} ${i + 1}`}
                        fill
                        sizes="(max-w-4xl) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Zoom View Icon Overlay */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <span className="bg-white/95 p-2.5 rounded-full shadow-lg text-stone-900 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="h-4.5 w-4.5" />
                        </span>
                      </div>

                      {/* Carpentry badge for raw work-in-progress pictures */}
                      {img.includes("carpenter") && (
                        <span className="absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 px-2 py-0.5 rounded-md shadow">
                          Workshop / On-Site Work
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-stone-150 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
                <div className="text-left hidden sm:block">
                  <span className="text-[10px] uppercase font-black tracking-widest text-primary">Ahmedabad Carpentry Factory</span>
                  <p className="text-xs text-stone-500 mt-0.5">Custom solid wood designs, termite-proof treatments & 5-year warranty.</p>
                </div>
                {/* <button
                  onClick={() => {
                    const serviceName = solutions.find((s) => s.id === galleryCategory)?.name || "Furniture Work";
                    setGalleryCategory(null);
                    // openQuoteModal(`Inquiry about Service: ${serviceName}`);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition duration-300 cursor-pointer text-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>Get Free Measurement Quote</span>
                </button> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Fullscreen Lightbox Slider */}
      <AnimatePresence>
        {lightboxIndex !== null && activeGallery && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Large Image Frame */}
            <div className="relative max-w-5xl max-h-[80vh] w-full h-[60vh] flex flex-col items-center justify-center z-10">
              <div className="relative w-full h-full">
                <Image
                  src={activeGallery.images[lightboxIndex]}
                  alt={`${activeGallery.title} full view`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Tag for raw carpenter crafted items */}
              {activeGallery.images[lightboxIndex].includes("carpenter") && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  🔨 Raw Carpenter Craftsmanship (Site Work)
                </div>
              )}
            </div>

            {/* Top Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-stone-900/80 p-2 sm:p-3 text-stone-300 hover:text-white hover:bg-stone-800 transition cursor-pointer z-20"
              title="Close Full View"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-6 rounded-full bg-stone-900/80 p-2 sm:p-3 text-stone-300 hover:text-white hover:bg-stone-800 transition cursor-pointer z-20"
              title="Previous Photo"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:right-6 rounded-full bg-stone-900/80 p-2 sm:p-3 text-stone-300 hover:text-white hover:bg-stone-800 transition cursor-pointer z-20"
              title="Next Photo"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

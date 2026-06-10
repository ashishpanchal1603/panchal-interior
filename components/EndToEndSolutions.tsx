"use client";

import { motion } from "framer-motion";
import {
  CookingPot,
  DoorClosed,
  GlassWater,
  Maximize2,
  Tv,
  Laptop,
  Layers,
  Lightbulb,
  Grid3X3,
  Paintbrush,
  Bath,
  Flame,
  DoorOpen,
  Sofa,
  ToyBrick,
  ArrowRight
} from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";

interface SolutionItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function EndToEndSolutions() {
  const { openQuoteModal } = useQuoteModal();

  const solutions: SolutionItem[] = [
    { id: "kitchen", name: "Modular Kitchen", icon: CookingPot, description: "Custom layouts, soft-close hardware & acrylic finishes" },
    { id: "wardrobe", name: "Storage & Wardrobes", icon: DoorClosed, description: "Sliding and swing wardrobes with loft storage solutions" },
    { id: "crockery", name: "Crockery Units", icon: GlassWater, description: "Elegant glass shutters & integrated showcase profile lighting" },
    { id: "spacesaving", name: "Space Saving Furniture", icon: Maximize2, description: "Wall beds, foldable desks & smart multipurpose tables" },
    { id: "tvunit", name: "TV Units", icon: Tv, description: "Floating panels, marble backings & cable management options" },
    { id: "study", name: "Study Tables", icon: Laptop, description: "Ergonomic workspace set-ups with integrated cabinet drawers" },
    { id: "ceiling", name: "False Ceiling", icon: Layers, description: "Gypsum false ceilings, wood rafters & premium cove lighting" },
    { id: "lights", name: "Lights & Fixtures", icon: Lightbulb, description: "Decorative profile lights, recessed LED cob & automated mood lighting" },
    { id: "wallpaper", name: "Wallpaper Designs", icon: Grid3X3, description: "Premium fabric wallpapers & custom designer texture prints" },
    { id: "paint", name: "Wall Paint", icon: Paintbrush, description: "Royal velvet emulsion finishes, sanding & damp proofing" },
    { id: "bathroom", name: "Bathrooms", icon: Bath, description: "Waterproof plumbing fixtures, vanity units & premium tiles" },
    { id: "pooja", name: "Pooja Unit", icon: Flame, description: "Intricate CNC wood carvings, marble mandapams & brass fittings" },
    { id: "foyer", name: "Foyer Designs", icon: DoorOpen, description: "Shoe consoles, key holders, mirror consoles & entry panelling" },
    { id: "movable", name: "Movable Furniture", icon: Sofa, description: "Bespoke custom sofas, lounge armchairs & dining table sets" },
    { id: "kids", name: "Kids Bedroom", icon: ToyBrick, description: "Playful bunk beds, soft-cushion headboards & colorful shelves" }
  ];

  return (
    <section className="py-24 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-5 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            What We Do
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-4 leading-tight">
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
                onClick={() => openQuoteModal(item.name)}
                className="group p-6 rounded-2xl border border-stone-100 hover:border-primary/30 bg-white hover:bg-stone-50/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center cursor-pointer text-center justify-between"
              >
                {/* Icon Container */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-primary/10 shadow-sm">
                  <IconComponent className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                {/* Details */}
                <div className="mt-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-tight group-hover:text-primary transition">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-[10px] sm:text-xs mt-2 leading-relaxed opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-350">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center gap-1 text-[10px] font-bold text-primary opacity-30 group-hover:opacity-100 transition-opacity">
                    Inquire <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

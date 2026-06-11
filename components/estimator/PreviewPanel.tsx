"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, Info } from "lucide-react";
import { FullHomeState, KitchenState, WardrobeState } from "./types";

interface PreviewPanelProps {
  calcType: "full" | "kitchen" | "wardrobe" | null;
  step: number;
  fullState: FullHomeState;
  kitchenState: KitchenState;
  wardrobeState: WardrobeState;
  hoveredItem: string | null; // For contextual room hover preview
}

export default function PreviewPanel({
  calcType,
  step,
  fullState,
  kitchenState,
  wardrobeState,
  hoveredItem,
}: PreviewPanelProps) {
  // Determine active image and description based on state
  let imageSrc = "/images/hero.png";
  let title = "Premium Interior Designs";
  let description = "Direct-from-factory craftmanship in Gota, Ahmedabad.";
  let badge = "Real Feel 3D Preview";
  let specs: string[] = [];

  if (calcType === "full") {
    badge = "Full Home Render";
    
    // Determine BHK selection image
    let bhkImg = "/images/interior_3bhk.png";
    let bhkTitle = "Luxury Apartment / Villa";
    if (fullState.bhk === "1bhk") {
      bhkImg = "/images/interior_1bhk.png";
      bhkTitle = "1 BHK Modern Apartment";
    } else if (fullState.bhk === "2bhk-small" || fullState.bhk === "2bhk-large") {
      bhkImg = "/images/interior_2bhk.png";
      bhkTitle = "2 BHK Contemporary Home";
    }

    imageSrc = bhkImg;
    title = bhkTitle;
    description = "Complete turnkey woodworks, ceiling, paints & layouts.";
    specs = [
      `Configuration: ${fullState.bhk.replace("-", " ").toUpperCase()}`,
      `Package Tier: ${fullState.packageTier.toUpperCase()}`,
    ];

    if (step === 2) {
      if (fullState.packageTier === "essentials") {
        imageSrc = "/images/wooden_bed.png";
        title = "Essentials Package";
        description = "Standard MR Plywood, durable matte laminates, reliable hardware.";
      } else if (fullState.packageTier === "premium") {
        imageSrc = "/images/tv_unit.png";
        title = "Premium Package";
        description = "BWR Plywood, soft-close hardware, high-gloss acrylic shutters, false ceiling.";
      } else if (fullState.packageTier === "elite") {
        imageSrc = "/images/hero.png";
        title = "Elite Luxury Package";
        description = "BWP Marine Ply, walnut veneers, PU polish, metal profile smoked glass doors.";
      }
    } else if (step === 3) {
      // Room scopes
      const activeItem = hoveredItem || (fullState.scope.length > 0 ? fullState.scope[fullState.scope.length - 1] : null);
      if (activeItem === "living") {
        imageSrc = "/images/sofa_set.png";
        title = "Living Room Setup";
        description = "Premium TV unit wall panels, wallpaper designs, false ceiling and custom sofa.";
      } else if (activeItem === "master") {
        imageSrc = "/images/wooden_bed.png";
        title = "Master Bedroom";
        description = "King size hydraulic storage bed, cushion headboard, and sliding wardrobe.";
      } else if (activeItem === "kids") {
        imageSrc = "/images/tv_unit.png";
        title = "Kids Bedroom Layout";
        description = "Fun child bed, safe rounded wardrobes, and study desk unit.";
      } else if (activeItem === "kitchen") {
        imageSrc = "/images/modular_kitchen.png";
        title = "Modular Kitchen Core";
        description = "BWP Waterproof marine plywood cabinets, rust-free wire baskets, sleek chimney.";
      } else if (activeItem === "dining") {
        imageSrc = "/images/l_shape_sofa.png";
        title = "Dining & Crockery";
        description = "Premium dining counter table, glass crockery storage cabinet display.";
      }
    }

    if (fullState.scope.length > 0) {
      specs.push(`Selected Scopes: ${fullState.scope.length} Rooms`);
    }
  } else if (calcType === "kitchen") {
    badge = "Modular Kitchen Render";
    
    // Base layout images
    let kitchenImg = "/images/kitchen_lshape.png";
    let kitchenTitle = "L-Shaped Kitchen Layout";
    let kitchenDesc = "Dynamic double-counter corner setup optimizing the work triangle.";

    if (kitchenState.layout === "straight") {
      kitchenImg = "/images/kitchen_straight.png";
      kitchenTitle = "Straight Kitchen Layout";
      kitchenDesc = "Compact single counter ideal for studio apartments and tiny homes.";
    } else if (kitchenState.layout === "parallel") {
      kitchenImg = "/images/kitchen_parallel.png";
      kitchenTitle = "Parallel Kitchen Layout";
      kitchenDesc = "Efficient dual counters separating washing and cooking zones.";
    } else if (kitchenState.layout === "u-shape") {
      kitchenImg = "/images/kitchen_ushape.png";
      kitchenTitle = "U-Shaped / C-Type Kitchen";
      kitchenDesc = "Luxurious triple counter (Sides A, B, and C) for spacious homes.";
    }

    imageSrc = kitchenImg;
    title = kitchenTitle;
    description = kitchenDesc;
    specs = [
      `Layout: ${kitchenState.layout.replace("-", " ").toUpperCase()}`,
      `Finish: ${kitchenState.finish.toUpperCase()}`,
      `Side A: ${kitchenState.lengthA} ft`,
    ];

    if (kitchenState.layout !== "straight") {
      specs.push(`Side B: ${kitchenState.lengthB} ft`);
    }
    if (kitchenState.layout === "u-shape" && kitchenState.lengthC) {
      specs.push(`Side C: ${kitchenState.lengthC} ft`);
    }

    if (step === 3) {
      if (kitchenState.finish === "laminate") {
        imageSrc = "/images/kitchen_straight.png";
        title = "Matte Laminate Finish";
        description = "0.8mm textured laminates, scratch-proof, thermal resistant, heavy utility.";
      } else if (kitchenState.finish === "acrylic") {
        imageSrc = "/images/kitchen_lshape.png";
        title = "High-Gloss Acrylic Finish";
        description = "1.2mm anti-scratch German reflective acrylic panels. Bright look.";
      } else if (kitchenState.finish === "glass") {
        imageSrc = "/images/kitchen_ushape.png";
        title = "Aluminium Glass Profiles";
        description = "Dark smoked glass pane shutters in custom matte black profile frames.";
      }
    }
  } else if (calcType === "wardrobe") {
    badge = "Wardrobe Render";

    let wardrobeImg = "/images/wardrobe_sliding.png";
    let wardrobeTitle = "Sliding Door Wardrobe";
    let wardrobeDesc = "Sleek spacesaver layout. Eliminates swing door clearance requirements.";

    if (wardrobeState.type === "swing") {
      wardrobeImg = "/images/wardrobe_swing.png";
      wardrobeTitle = "Swing Door Wardrobe";
      wardrobeDesc = "Classic hinged setup allowing full cabinet visibility and drawer access.";
    } else if (wardrobeState.type === "walk-in") {
      wardrobeImg = "/images/wardrobe_walkin.png";
      wardrobeTitle = "Premium Walk-In Closet";
      wardrobeDesc = "Ultra-premium open partition styling, dedicated dressing alcoves.";
    }

    imageSrc = wardrobeImg;
    title = wardrobeTitle;
    description = wardrobeDesc;
    specs = [
      `Type: ${wardrobeState.type.toUpperCase()}`,
      `Size: ${wardrobeState.width} ft (W) x ${wardrobeState.height} ft (H)`,
      `Finish: ${wardrobeState.finish.toUpperCase()}`,
    ];

    if (step === 3) {
      if (wardrobeState.finish === "laminate") {
        imageSrc = "/images/wardrobe_swing.png";
        title = "Woodgrain Laminate doors";
        description = "Linen or textured laminates. Budget friendly and highly scratch resistant.";
      } else if (wardrobeState.finish === "acrylic") {
        imageSrc = "/images/wardrobe_sliding.png";
        title = "Mirror Glossy Acrylic";
        description = "Glossy reflective surface panels. Maximizes visual bedroom space.";
      } else if (wardrobeState.finish === "glass") {
        imageSrc = "/images/wardrobe_walkin.png";
        title = "Smoked Profile Glass";
        description = "Smoked black tempered glass mounted in champagne gold profile frames.";
      }
    }
  }

  return (
    <div className="relative h-64 md:h-full min-h-[250px] bg-stone-900 overflow-hidden flex flex-col justify-end text-white">
      {/* Dynamic Image Wrapper with cross-fade transition */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={imageSrc}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 40vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30 pointer-events-none" />

      {/* Decorative lines / frame */}
      <div className="absolute inset-4 border border-white/10 rounded-2xl pointer-events-none" />

      {/* Content panel */}
      <div className="relative z-10 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-1.5">
          <span className="bg-primary/95 text-stone-950 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
            <Sparkles className="h-3 w-3 fill-stone-950" /> {badge}
          </span>
          {hoveredItem && (
            <span className="bg-stone-800/80 backdrop-blur-sm text-stone-300 text-[9px] font-medium px-2 py-1 rounded-md flex items-center gap-1">
              <Eye className="h-3 w-3" /> Previewing hovered item
            </span>
          )}
        </div>

        <div>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {title}
          </h4>
          <p className="text-stone-300 text-xs mt-2 leading-relaxed max-w-sm">
            {description}
          </p>
        </div>

        {/* Dynamic Specifications list */}
        {specs.length > 0 && (
          <div className="pt-3 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
            {specs.map((spec, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-primary" /> {spec}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

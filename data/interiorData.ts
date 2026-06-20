export interface Service {
  slug: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  image: string;
  features: string[];
  process: { step: number; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  gallery: string[];
  priceRange?: string;
  features: string[];
  materials: string[];
  dimensions: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  gallery: string[];
  description: string;
  clientType?: string;
  duration?: string;
  areaSize?: string;
  services?: string[];
  materials?: string[];
  workCategories?: { title: string; desc: string }[];
  faqs?: { question: string; answer: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  category: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface Advantage {
  title: string;
  description: string;
  icon: string;
}

export const servicesData: Service[] = [
  {
    slug: "custom-furniture",
    name: "Custom Furniture",
    description: "High quality bespoke furniture tailored for homes, offices, and commercial establishments.",
    icon: "Sofa",
    image: "/images/sofa_set.png",
    features: [
      "Custom size, shape, and upholstery selection",
      "Handcrafted using premium teak wood, sal wood, and plywood",
      "Termite-proof and water-resistant wood treatments",
      "Polish finishes from high-gloss PU to matte melamine",
      "On-site installation and fitting by expert craftsmen"
    ],
    process: [
      { step: 1, title: "Consultation & Measurement", desc: "We discuss your layout, functional requirements, and styling choices." },
      { step: 2, title: "3D CAD Modeling", desc: "Our designers prepare custom 3D models with detailed measurements for your approval." },
      { step: 3, title: "Material Selection", desc: "Select from a wide range of premium veneers, laminates, fabrics, and hardware." },
      { step: 4, title: "Crafting & Finishing", desc: "Our skilled carpenters build and polish the furniture in our state-of-the-art workshop." },
      { step: 5, title: "Delivery & Installation", desc: "Careful transport and professional installation by our team." }
    ],
    faqs: [
      { question: "What type of wood do you use for custom furniture?", answer: "We use high-grade Solid Teak Wood, Commercial or Waterproof Plywood (Century/Greenply), and solid blockboards depending on the structural needs and budget." },
      { question: "Do you provide a warranty on custom furniture?", answer: "Yes, we offer a 5-year warranty against manufacturing defects and wood termite/borer infestations." }
    ]
  },
  {
    slug: "sofa-manufacturing",
    name: "Sofa Manufacturing",
    description: "Modern, luxury, and ergonomic sofa manufacturing solutions with premium fabrics and foam.",
    icon: "Armchair",
    image: "/images/l_shape_sofa.png",
    features: [
      "Ergonomic structural designs with multi-density Sleepwell foam",
      "Wide fabric selection: premium velvet, leatherette, suede, and cotton linen",
      "Robust frames built with seasoned solid pine and neem wood",
      "Custom setups: L-Shape sectionals, recliners, sofa-cum-beds, and chesterfields",
      "Squeak-free high-tensile zigzag spring suspension systems"
    ],
    process: [
      { step: 1, title: "Style & Size Discussion", desc: "Choose a design template (Chesterfield, Mid-century, Modern) and specify dimensions." },
      { step: 2, title: "Frame Construction", desc: "Strong structural frame made of seasoned wood, joined with heavy-duty fasteners." },
      { step: 3, title: "Webbing & Springs", desc: "Suspension layer applied using heavy webbing belts and steel springs for structural bounce." },
      { step: 4, title: "Foaming & Upholstery", desc: "Application of 40-density HR foam followed by stitching and upholstery fitting." },
      { step: 5, title: "Quality Check & Delivery", desc: "Rigorous stitching check, cushion bounce inspection, and plastic-wrapped delivery." }
    ],
    faqs: [
      { question: "Can I bring my own fabric for the sofa?", answer: "Yes! You can purchase your own fabric and we will calculate the exact yardage required for your sofa design." },
      { question: "How long does it take to make a custom sofa?", answer: "Usually it takes 10-15 business days depending on design complexity and size." }
    ]
  },
  {
    slug: "modular-kitchen",
    name: "Modular Kitchen",
    description: "Smart, stylish, and highly space-efficient modular kitchens designed to simplify your cooking experience.",
    icon: "CookingPot",
    image: "/images/modular_kitchen.png",
    features: [
      "Waterproof BWP marine plywood cabinets and carcasses",
      "Soft-closing premium hardware from Hettich, Hafele, and Blum",
      "Varied finishes: Acrylic, High-Gloss Laminate, PU Paint, and Glass Profile doors",
      "Custom setups: L-Shape, U-Shape, Parallel, Straight, and Island Kitchen layouts",
      "Smart organization: pull-out pantries, corner carousel systems, and bottle pull-outs"
    ],
    process: [
      { step: 1, title: "Site Measurement & Analysis", desc: "We take precise measurements of the kitchen space, window openings, plumbing, and gas lines." },
      { step: 2, title: "2D Layout & 3D Rendering", desc: "We design a functional work triangle (Sink, Hob, Fridge) and prepare premium 3D visualizations." },
      { step: 3, title: "Material & Appliance Finalization", desc: "Choose cabinet finishes, countertop stone (granite, quartz), and built-in appliances (chimney, hob, oven)." },
      { step: 4, title: "Factory Production", desc: "All modular cabinets and shutters are machine-cut and edge-banded in our factory for zero gaps." },
      { step: 5, title: "Site Assembly", desc: "Quick and mess-free installation on-site within 4-7 days by our professional installers." }
    ],
    faqs: [
      { question: "Is the wood waterproof and heatproof?", answer: "Yes, we strictly use Boil Water Resistant (BWR) or Boil Water Proof (BWP) Marine Grade Plywood for all kitchen carcasses, making them fully resistant to water leakage and heat." },
      { question: "Do you provide modular baskets and chimneys?", answer: "Yes, we offer complete turn-key kitchens including modular wire/tandem baskets, corner units, and built-in chimneys, hobs, and sinks from trusted brands." }
    ]
  },
  {
    slug: "interior-design",
    name: "Interior Design",
    description: "Complete residential and commercial turnkey interior design and decoration services.",
    icon: "Palette",
    image: "/images/hero.png",
    features: [
      "Bespoke 3D layouts, color consulting, and space planning",
      "Ceiling design: false ceilings with gypsum boards, wooden rafters, and LED lighting",
      "Custom wall treatments: wallpaper, texture paints, wooden cladding, and fluted panels",
      "Curated decor, upholstery, curtains, and lighting selections",
      "Complete end-to-end site supervision and execution"
    ],
    process: [
      { step: 1, title: "Design Discussion & Mood Boarding", desc: "Understand your aesthetic preference (Modern, Traditional, Industrial, Scandinavian)." },
      { step: 2, title: "Space Optimization Layout", desc: "Prepare floor plans showing optimal placement of furniture, movement corridors, and lighting." },
      { step: 3, title: "Photorealistic 3D Renders", desc: "Prepare detailed 3D pictures showing exact colors, finishes, materials, and lighting designs." },
      { step: 4, title: "Material Purchasing & Execution", desc: "Detailed procurement of items and professional craftsmen deployed for paint, ceiling, and woodwork." },
      { step: 5, title: "Handover", desc: "Cleaning, styling, placement check, and a formal walk-through handover." }
    ],
    faqs: [
      { question: "Do you design individual rooms?", answer: "Yes, we design single rooms like living rooms, master bedrooms, home theaters, or modular offices, as well as full 2BHK/3BHK apartments." },
      { question: "How do you charge for interior design services?", answer: "We work either on a per-square-foot design fee basis or a turnkey project execution basis, where design cost is integrated." }
    ]
  },
  {
    slug: "electrical-work",
    name: "Electrical Work",
    description: "Safe, reliable, and compliant electrical installation, wiring, and architectural lighting solutions.",
    icon: "Zap",
    image: "/images/electrical_work.png",
    features: [
      "Concealed wiring using fire-retardant copper wires (Finolex/Polycab)",
      "Premium modular switchboard fitting (Legrand, Roma, Havells)",
      "Smart home lighting automation integration",
      "Architectural lighting: profile lighting, cob lights, and hidden strip LEDs",
      "Safety checks, earthing installations, and MCB/DB distribution board setups"
    ],
    process: [
      { step: 1, title: "Electrical Layout Plan", desc: "Draft switchboard points, AC points, network cables, and designer lights mapping." },
      { step: 2, title: "Wall Chasing & Piping", desc: "Cutting walls and laying heavy-duty PVC conduits inside wall structures before plastering." },
      { step: 3, title: "Wire Pulling", desc: "Routing color-coded, fire-safe copper wires through the conduits." },
      { step: 4, title: "Finishing & Fixture Fit", desc: "Mounting modular switchboards, LED drivers, chandeliers, track lights, and fans." },
      { step: 5, title: "Testing & Certification", desc: "Load testing, polarity testing, and checking earthing systems for shock protection." }
    ],
    faqs: [
      { question: "Are your electricians certified?", answer: "Yes, all our electrical supervisors hold state license certifications and operate strictly according to electrical safety regulations." },
      { question: "Do you do repairs or only new installations?", answer: "We handle complete wiring and fixture installs for renovation or new construction projects, not single-call socket repairs." }
    ]
  },
  {
    slug: "painting-services",
    name: "Painting Services",
    description: "Flawless interior and exterior painting services with premium textured finishes and wall care.",
    icon: "Paintbrush",
    image: "/images/painting_service.png",
    features: [
      "Smooth wall preparation with double coat acrylic wall putty and primer",
      "Premium paints: Asian Paints Royal, Berger Silk, and Dulux Velvet",
      "Specialty wall finishes: metallic finishes, Italian texture marble, stucco, and wood polish",
      "Exterior weather-proof protective paint coats with damp prevention",
      "Dust-free professional mechanical sanding and vacuum setup"
    ],
    process: [
      { step: 1, title: "Wall Inspecting & Sanding", desc: "Checking for dampness, sanding down loose old paint, and treating structural cracks." },
      { step: 2, title: "Putty & Primer", desc: "Double-coat putty application for perfect smoothness, followed by a coat of acrylic sealer primer." },
      { step: 3, title: "Texture / Undercoat", desc: "Applying base colors or specialty texturing patterns according to the interior designs." },
      { step: 4, title: "Final Topcoats", desc: "Double-coat application of high-end emulsion paints using premium rollers for an even sheen." },
      { step: 5, title: "Clean Up & Final Walk", desc: "Removing masking tapes, floor plastic covers, cleanup of paint splatters, and final handover." }
    ],
    faqs: [
      { question: "How do you protect my existing furniture during painting?", answer: "We use high-grade protective drop sheets, plastic wrapping, and masking tapes to cover all furniture, switchboards, floorings, and windows before commencing painting." },
      { question: "How long does a typical 3BHK paint project take?", answer: "A full premium interior paint job with putty work for a 3BHK apartment takes about 7-10 business days." }
    ]
  }
];

export const categoriesData: Category[] = [
  { id: "sofa-set", name: "Sofa Set", description: "Standard, premium, and luxury sofa sets.", image: "/images/sofa_set.png" },
  { id: "l-shape-sofa", name: "L Shape Sofa", description: "Elegant, space-saving L-shaped corner sofas.", image: "/images/l_shape_sofa.png" },
  { id: "tv-unit", name: "TV Unit", description: "Modern and wooden wall-mounted TV consoles.", image: "/images/tv_unit.png" },
  { id: "wardrobe", name: "Wardrobe", description: "Bespoke sliding, open, and classic wardrobes.", image: "/images/wardrobe.png" },
  { id: "wooden-bed", name: "Wooden Bed", description: "Premium teak wood and hydraulic storage beds.", image: "/images/wooden_bed.png" },
  { id: "modular-kitchen-cat", name: "Modular Kitchen", description: "Factory-finish custom modular kitchen setups.", image: "/images/modular_kitchen.png" }
];

export const productsData: Product[] = [
  // Sofa Sets
  {
    id: "royal-velvet-sofa",
    categoryId: "sofa-set",
    name: "Royal Velvet 3+2 Sofa Set",
    description: "Add a touch of royalty to your living room. Built with high-density Sleepwell foam and upholstered in premium Italian velvet, this set offers luxury and ergonomic posture support.",
    image: "/images/sofa_set.png",
    gallery: ["/images/sofa_set.png", "/images/l_shape_sofa.png"],
    //priceRange: "₹45,000 - ₹65,000",
    features: ["40 Density HR Foam", "Solid Teak Wood base framing", "Includes 6 custom throw pillows", "Stain-resistant velvet fabric"],
    materials: ["Solid Teak Wood", "Sleepwell Foam", "Premium Italian Velvet Fabric"],
    dimensions: "3 Seater: 84\"W x 34\"D x 32\"H, 2 Seater: 60\"W x 34\"D x 32\"H",
    inStock: true
  },
  {
    id: "modern-chesterfield-sofa",
    categoryId: "sofa-set",
    name: "Classic Chesterfield Sofa",
    description: "An elegant, timeless Chesterfield design with deep button tufting, rolled arms, and solid wooden legs. Perfect for modern and classic interiors alike.",
    image: "/images/l_shape_sofa.png",
    gallery: ["/images/l_shape_sofa.png", "/images/sofa_set.png"],
    //priceRange: "₹55,000 - ₹80,000",
    features: ["Deep button tufting on backrest and arms", "Solid wood turned legs", "Removable seat cushions with pocket springs", "Durable leatherette/suede option"],
    materials: ["Seasoned Pine Frame", "Pocket Spring suspension", "Premium Suede Fabric"],
    dimensions: "88\"W x 36\"D x 30\"H",
    inStock: true
  },
  // L Shape Sofas
  {
    id: "scandinavian-sectional-sofa",
    categoryId: "l-shape-sofa",
    name: "Scandinavian L-Shape Sectional",
    description: "A sleek, minimalist L-shaped corner sofa styled with light wood legs, clean lines, and soft linen blend upholstery. Complements modern apartment layouts perfectly.",
    image: "/images/l_shape_sofa.png",
    gallery: ["/images/l_shape_sofa.png", "/images/sofa_set.png"],
    //priceRange: "₹50,000 - ₹75,000",
    features: ["Reversible lounger side", "Natural beechwood tapered legs", "Breathable linen upholstery fabric", "Zippered covers for easy cleaning"],
    materials: ["Seasoned Neem wood frame", "Natural Beechwood legs", "Linen Blend Fabric", "Soft Microfiber filling"],
    dimensions: "96\"W x 62\"D (chaiselongue) x 33\"H",
    inStock: true
  },
  // TV Units
  {
    id: "floating-oak-tv-unit",
    categoryId: "tv-unit",
    name: "Floating Oak & Marble TV Console",
    description: "A gorgeous modern wall-mounted entertainment center. Features a high-definition white marble back panel with oak veneer shelves, warm LED cove lighting, and spacious drawers.",
    image: "/images/tv_unit.png",
    gallery: ["/images/tv_unit.png", "/images/hero.png"],
    //priceRange: "₹28,000 - ₹42,000",
    features: ["Wall-mounted space-saving design", "Integrated cable management channels", "Soft-close hydraulic drawer runners", "Pre-wired LED strip channels"],
    materials: ["Action Tesa HDMR Board", "Oak Veneer", "Italian Quartz Back Panel", "Hafele Drawer Slides"],
    dimensions: "72\"W x 14\"D x 60\"H",
    inStock: true
  },
  // Wardrobes
  {
    id: "sliding-mirror-wardrobe",
    categoryId: "wardrobe",
    name: "Luxurious Glass Profile Sliding Wardrobe",
    description: "A sleek 3-door wardrobe with sliding profile glass shutters, dynamic interior layout, built-in dresser unit, drawer lockers, and custom smart LED hanging rods.",
    image: "/images/wardrobe.png",
    gallery: ["/images/wardrobe.png", "/images/wooden_bed.png"],
    //priceRange: "₹65,000 - ₹95,000",
    features: ["Heavy-duty anti-jump slider tracks", "Smoked profile glass doors with metal frame", "Built-in jewelry lock drawer", "Sensor lights that light up when opened"],
    materials: ["Waterproof Plywood", "High-Gloss Acrylic Laminate", "Aluminium Profile Shutter Frame", "Hettich Sliding hardware"],
    dimensions: "96\"W x 24\"D x 96\"H",
    inStock: true
  },
  // Wooden Beds
  {
    id: "royal-teak-hydraulic-bed",
    categoryId: "wooden-bed",
    name: "Premium Teak Wood Hydraulic Storage Bed",
    description: "Experience the strength of solid teak wood combined with massive storage space. Built with heavy duty hydraulic gas lift pistons, accessing storage is smooth and effortless.",
    image: "/images/wooden_bed.png",
    gallery: ["/images/wooden_bed.png", "/images/wardrobe.png"],
    //priceRange: "₹50,000 - ₹75,000",
    features: ["150kg heavy capacity hydraulic gas lift pistons", "Solid Teak wood headboard with fabric cushion", "Reinforced iron frame support", "Termite treated base"],
    materials: ["CP Teak Wood", "Waterproof Marine Plywood base", "Fabric Tufted Headboard Cushion", "Gas-lift mechanisms"],
    dimensions: "King Size: 78\"L x 72\"W x 48\"H (headboard)",
    inStock: true
  },
  // Modular Kitchens
  {
    id: "gloss-acrylic-modular-kitchen",
    categoryId: "modular-kitchen-cat",
    name: "German High-Gloss Acrylic Kitchen",
    description: "A super premium modular kitchen utilizing factory-finished high-gloss acrylic panels. Features smart soft-close drawers, pull-out pantry, quartz countertop, and integrated profile handles.",
    image: "/images/modular_kitchen.png",
    gallery: ["/images/modular_kitchen.png", "/images/hero.png"],
    //priceRange: "₹1,80,000 - ₹3,50,000",
    features: ["Seamless edgebanded acrylic shutters", "BWP grade waterproof plywood carcasses", "Hafele tandem boxes with soft-close warranty", "Dedicated tall unit pantry storage"],
    materials: ["Boiling Water Proof Marine Plywood", "High Gloss Acrylic sheets", "Premium Quartz countertop", "Hettich soft-close hardware"],
    dimensions: "Customized to fit individual site layouts",
    inStock: true
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-skyline-villa",
    slug: "skyline-premium-villa",
    title: "Skyline Premium Villa",
    category: "Living Room",
    location: "Bopal, Ahmedabad",
    year: "2025",
    image: "/images/living_room_tv_wardrobe.png",
    gallery: ["/images/living_room_tv_wardrobe.png", "/images/sofa_frame_construction.png", "/images/custom_door_grill.png"],
    description: "A complete turnkey interior design project for a premium 4BHK villa. Features double-height living room paneling, customized Italian marble accents, modular kitchen, and modern bedroom wardrobe integrations.",
    clientType: "Residential Owner",
    duration: "55 Days",
    areaSize: "3,200 Sq.Ft.",
    services: ["Living Room Design", "Modular Kitchen Setup", "Veneer Paneling", "Hydraulic Bed Carpentry"],
    materials: ["CP Teak Wood", "Greenply Waterproof Plywood", "Century Laminates", "Hettich Soft-Close Drawer Runners", "Sleepwell HR Foam"],
    workCategories: [
      { title: "Main Door", desc: "Double-shutter custom hand-carved teak wood main door with brass fittings and smart lock integration." },
      { title: "Bedroom Wardrobes", desc: "Floor-to-ceiling wardrobes styled with premium veneers and integrated LED wardrobe rods." },
      { title: "Modular Kitchen", desc: "German edge-banded high-gloss kitchen layouts using BWP grade waterproof marine plywood carcass." },
      { title: "TV Unit Console", desc: "Wall-mounted TV background with Italian white marble paneling, oak shelves, and hidden LED strip coves." }
    ],
    faqs: [
      { question: "How much did the complete woodwork cost?", answer: "The complete woodwork and turnkey design for this 4BHK villa ranged between ₹12 Lakhs to ₹15 Lakhs depending on veneer selections and premium hardware." },
      { question: "What warranty was provided?", answer: "We provided a 5-year manufacturing and wood-borer termite warranty for all solid wood and plywood structures." }
    ]
  },
  {
    id: "proj-royal-kitchen",
    slug: "luxury-acrylic-kitchen-layout",
    title: "Luxury Acrylic Kitchen Layout",
    category: "Modular Kitchen",
    location: "Satellite, Ahmedabad",
    year: "2025",
    image: "/images/modular_kitchen.png",
    gallery: ["/images/modular_kitchen.png", "/images/tv_unit.png"],
    description: "A custom high-gloss modular kitchen featuring state of the art built-in appliances, quartz countertops, high-capacity tandem baskets, and soft-close mechanisms.",
    clientType: "Private Villa Owner",
    duration: "22 Days",
    areaSize: "280 Sq.Ft.",
    services: ["Modular Kitchen Layout", "Quartz Countertop Fitting", "Pantry Unit Design"],
    materials: ["Boiling Water Proof Marine Plywood", "German High-Gloss Acrylic Sheets", "Premium Quartz Stone Countertop", "Hafele Hydraulic Shutter lifts", "Hettich Wire/Tandem drawers"],
    workCategories: [
      { title: "Modular Carcasses", desc: "Boil Water Proof (BWP) marine plywood cabinets built for extreme moisture and heat resistance." },
      { title: "Acrylic Shutters", desc: "Mirror-finish high-gloss German acrylic sheets hot-melt edge-banded to prevent laminate peeling." },
      { title: "Tandem Baskets", desc: "German steel soft-closing cutlery and utility baskets designed for heavy weight storage." }
    ],
    faqs: [
      { question: "Is the acrylic finish scratch resistant?", answer: "Yes, our German high-gloss acrylic sheets are highly scratch-resistant and can be cleaned easily with soap and a damp microfiber cloth." },
      { question: "Are built-in appliances integrated?", answer: "Yes, we custom fabricated cabinet cut-outs for built-in hobs, chimneys, and dynamic microwave shelves." }
    ]
  },
  {
    id: "proj-modern-apartment",
    slug: "minimalist-3bhk-apartment",
    title: "Minimalist 3BHK Apartment",
    category: "Sofa",
    location: "Prahlad Nagar, Ahmedabad",
    year: "2024",
    image: "/images/l_shape_sofa.png",
    gallery: ["/images/l_shape_sofa.png", "/images/sofa_frame_construction.png"],
    description: "Scandinavian interior styling featuring warm wood profiles, custom L-shaped sofa sets, space-optimized wardrobes, and hidden mood lighting details.",
    clientType: "IT Executive",
    duration: "38 Days",
    areaSize: "1,650 Sq.Ft.",
    services: ["Space Planning", "L-Shape Sofa Fabrication", "False Gypsum Ceiling"],
    materials: ["Solid Neem wood frame", "Century BWR Plywood", "Faux Suede Fabric"],
    workCategories: [
      { title: "Custom Sectional", desc: "Ergonomic L-shaped sofa set constructed on-site with multi-density Sleepwell cushions." },
      { title: "Integrated TV Panel", desc: "Low-height TV credenza custom polished with PU matte melamine wood coat." }
    ],
    faqs: [
      { question: "Is the sofa cushion durable?", answer: "Yes, it uses 40-density high-resilience foam which retains its springiness and comfort shape for years." }
    ]
  },
  {
    id: "proj-executive-office",
    slug: "executive-corporate-office",
    title: "Executive Corporate Office",
    category: "Office Furniture",
    location: "S.G. Highway, Ahmedabad",
    year: "2024",
    image: "/images/tv_unit.png",
    gallery: ["/images/tv_unit.png", "/images/sofa_set.png"],
    description: "Dynamic workspace styling with customized partition panels, teak wood executive conference tables, elegant reception lounge, and custom glass cabinetry.",
    clientType: "TechCorp Director",
    duration: "45 Days",
    areaSize: "2,800 Sq.Ft.",
    services: ["Commercial Office Design", "Conference Room Woodwork", "Glass Partitions"],
    materials: ["High-Density MDF boards", "Premium Oak Veneers", "Toughened Partition Glass"],
    workCategories: [
      { title: "Executive Desks", desc: "L-shaped wooden director tables with built-in wire grommets and lock drawers." },
      { title: "Conference Table", desc: "10-seater conference table made of CP teak wood logs with matte polish." }
    ],
    faqs: [
      { question: "Was sound insulation provided?", answer: "Yes, partitions incorporate dual-layer acoustic insulation sheets to minimize sound leakage." }
    ]
  },
  {
    id: "proj-gota-penthouse",
    slug: "gota-luxury-penthouse",
    title: "Gota Luxury Penthouse",
    category: "Wardrobe",
    location: "Gota, Ahmedabad",
    year: "2025",
    image: "/images/interior_3bhk.png",
    gallery: ["/images/interior_3bhk.png", "/images/custom_door_grill.png", "/images/wardrobe_walkin.png"],
    description: "Spacious duplex penthouse interior execution featuring premium veneer ceilings, custom walk-in closets, false ceilings with cove lights, and custom hand-carved teak wood doors.",
    clientType: "Penthouse Owner",
    duration: "65 Days",
    areaSize: "4,100 Sq.Ft.",
    services: ["Duplex Layout Design", "Walk-In Closet Setup", "Teak Wood Main Door"],
    materials: ["CP Teak Wood", "Action Tesa HDMR", "Century laminates", "Damp-proof paint coats"],
    workCategories: [
      { title: "Double-Height Panel", desc: "Premium veneer ceiling paneling with integrated architectural spotlight tracks." },
      { title: "Walk-In Closet", desc: "Champagne-gold profile sliding glass doors with automatic warm sensor light bars." }
    ],
    faqs: [
      { question: "What wood was used for the main entry door?", answer: "We crafted the door from 100% seasoned solid Teak Wood logs for robust security and weather resistance." }
    ]
  },
  {
    id: "proj-thaltej-kitchen",
    slug: "high-gloss-u-shape-kitchen",
    title: "High-Gloss U-Shape Kitchen",
    category: "Modular Kitchen",
    location: "Thaltej, Ahmedabad",
    year: "2025",
    image: "/images/kitchen_ushape.png",
    gallery: ["/images/kitchen_ushape.png", "/images/kitchen_parallel.png"],
    description: "A complete U-shaped modular kitchen layout with high-gloss German acrylic shutters, durable BWP marine plywood carcass, premium quartz countertop, and integrated profile handles.",
    clientType: "Villa Resident",
    duration: "18 Days",
    areaSize: "210 Sq.Ft.",
    services: ["U-Shape Kitchen Layout", "Machine edge-banding", "Countertop Quartz fitting"],
    materials: ["BWP Plywood", "Premium Acrylic panels", "Tandem soft-closing boxes"],
    workCategories: [
      { title: "Utility Pantry", desc: "Tall unit setup using soft-closing Hafele wire carousels for maximizing corner spaces." },
      { title: "Quartz Platform", desc: "Seamless quartz platform with built-in under-mount stainless steel sink." }
    ],
    faqs: [
      { question: "Is the countertop stain resistant?", answer: "Yes, quartz stone is non-porous and highly resistant to Indian curry or oil stains." }
    ]
  },
  {
    id: "proj-science-city-villa",
    slug: "contemporary-5bhk-villa",
    title: "Contemporary 5BHK Villa",
    category: "Bedroom",
    location: "Science City, Ahmedabad",
    year: "2024",
    image: "/images/interior_2bhk.png",
    gallery: ["/images/interior_2bhk.png", "/images/sofa_frame_construction.png", "/images/wooden_bed.png"],
    description: "Full turnkey custom woodworks and styling for a modern 5BHK villa. Features Sleepwell foam customized sofa sets, hydraulic storage beds, and detailed TV paneling in the living lounge.",
    clientType: "Luxury Villa Owner",
    duration: "75 Days",
    areaSize: "4,800 Sq.Ft.",
    services: ["Bespoke Sofa Fabrication", "False Gypsum Ceiling", "Custom Wardrobes & Hydraulic Beds"],
    materials: ["Solid CP Teak Wood", "Waterproof BWR Plywood", "Hettich Soft-closing Guides", "Sleepwell HR Foam"],
    workCategories: [
      { title: "Teak Wood Bed", desc: "King-size bed framed in seasoned solid wood with a massive internal storage compartment lifted by gas pistons." },
      { title: "Bedroom Wardrobe", desc: "Custom floor-to-ceiling wardrobes featuring space-saving sliding profile mechanisms and internal LED coves." }
    ],
    faqs: [
      { question: "Did you manufacture the sofa set in this project?", answer: "Yes, the sofa sets in our projects are custom-fabricated directly in our Gota workshop using 40-density HR Sleepwell foam and custom premium fabrics." }
    ]
  },
  {
    id: "proj-sindhu-bhavan-office",
    slug: "sindhu-bhavan-corporate-suite",
    title: "Sindhu Bhavan Corporate Suite",
    category: "Office Furniture",
    location: "Sindhu Bhavan Road, Ahmedabad",
    year: "2025",
    image: "/images/hero.png",
    gallery: ["/images/hero.png", "/images/tv_unit.png"],
    description: "High-end corporate office interior styling. Incorporates acoustic fluted wall panels, conference tables crafted from premium teak wood logs, and modern concealed lighting fixtures.",
    clientType: "Corporate Client",
    duration: "50 Days",
    areaSize: "3,500 Sq.Ft.",
    services: ["Office Cabin Design", "Conference Room Woodwork", "Glass Partitions"],
    materials: ["Heavy-duty Partition Framing", "Tesa HDMR Boards", "Toughened Partition Glass"],
    workCategories: [
      { title: "Executive Desk", desc: "Premium veneer-clad storage cabinets and main desk fabricated directly on-site." },
      { title: "Reception Counter", desc: "Curved front desk styled with high-gloss laminates, integrated LED strips, and cable organizer slots." }
    ],
    faqs: [
      { question: "Was false ceiling acoustic paneling included?", answer: "Yes, we integrated acoustic false ceilings using specialized mineral fiber tiles in conference halls to reduce voice echo." }
    ]
  },
  {
    id: "proj-vastrapur-apartment",
    slug: "cozy-2bhk-renovation",
    title: "Cozy 2BHK Renovation",
    category: "Bedroom",
    location: "Vastrapur, Ahmedabad",
    year: "2024",
    image: "/images/interior_1bhk.png",
    gallery: ["/images/interior_1bhk.png", "/images/wardrobe_sliding.png"],
    description: "Renovation of a 2BHK flat. Optimized for compact living with space-saving custom sliding wardrobes, straight kitchen modular cabins, and dual-purpose living room sofa-cum-beds.",
    clientType: "Flat Owner",
    duration: "28 Days",
    areaSize: "1,100 Sq.Ft.",
    services: ["Turnkey Living Space Design", "Custom Wardrobes & Hydraulic Beds"],
    materials: ["Solid CP Teak Wood", "Waterproof BWR Plywood", "Veneers and Matt Laminates"],
    workCategories: [
      { title: "Modular Base Cabinets", desc: "Under-counter cabinets built with BWP marine plywood to resist water spillage and daily cleaning dampness." },
      { title: "Modular Kitchen", desc: "German edge-banded high-gloss kitchen layouts using BWP grade waterproof marine plywood carcass." }
    ],
    faqs: [
      { question: "Can we modify the wardrobe internal drawer configurations?", answer: "Absolutely. All our wardrobes are 100% custom-built, allowing you to select hanging rod lengths, lock drawers, and locker counts." }
    ]
  },
  {
    id: "proj-bodakdev-wardrobe",
    slug: "walk-in-glass-wardrobe-suite",
    title: "Walk-In Glass Wardrobe Suite",
    category: "Wardrobe",
    location: "Bodakdev, Ahmedabad",
    year: "2025",
    image: "/images/wardrobe_walkin.png",
    gallery: ["/images/wardrobe_walkin.png", "/images/wardrobe_sliding.png"],
    description: "Bespoke glass profile wardrobe setup in a master bedroom dressing suite. Engineered with champagne-gold metal profile shutters, smoked glass doors, and internal automatic sensor LED hanger rods.",
    clientType: "Suite Owner",
    duration: "15 Days",
    areaSize: "450 Sq.Ft.",
    services: ["Walk-In Closet Setup", "Teak Wood Main Door"],
    materials: ["CP Teak Wood", "Action Tesa HDMR", "Century laminates"],
    workCategories: [
      { title: "Modular Kitchen", desc: "German edge-banded high-gloss kitchen layouts using BWP grade waterproof marine plywood carcass." },
      { title: "Main Door Entrance", desc: "Custom hand-polished solid teak wood main door with detailed molding frames and brass handles." }
    ],
    faqs: [
      { question: "How long did this kitchen setup take?", answer: "This project was completed within 15 Days including layout finalization, workshop cutting, and on-site assembly." }
    ]
  },
  {
    id: "proj-south-bopal-lounge",
    slug: "minimalist-lounge-tv-hub",
    title: "Minimalist Lounge & TV Hub",
    category: "TV Unit",
    location: "South Bopal, Ahmedabad",
    year: "2024",
    image: "/images/living_room_tv_wardrobe.png",
    gallery: ["/images/living_room_tv_wardrobe.png", "/images/l_shape_sofa.png"],
    description: "Custom living lounge room featuring white Italian marble TV unit back paneling, floating oak shelves, hidden LED strip lights, and a low-profile fabric L-shape sofa.",
    clientType: "Home Owner",
    duration: "32 Days",
    areaSize: "1,250 Sq.Ft.",
    services: ["Living Room Design", "Bespoke Sofa Fabrication"],
    materials: ["Solid Neem wood frame", "Century BWR Plywood", "Faux Suede Fabric"],
    workCategories: [
      { title: "Teak Wood Hydraulic Bed", desc: "King-size bed framed in seasoned solid wood with a massive internal storage compartment lifted by gas pistons." },
      { title: "Modular Kitchen", desc: "German edge-banded high-gloss kitchen layouts using BWP grade waterproof marine plywood carcass." }
    ],
    faqs: [
      { question: "Is the modular kitchen waterproof?", answer: "Yes, we exclusively use BWP (Boiling Water Proof) Marine Grade Plywood for all kitchen carcasses, protecting them against water leakage and rot." }
    ]
  }
];

export const blogPostsData: BlogPost[] = [
  {
    slug: "modular-kitchen-guide-2026",
    title: "Ultimate Guide to Selecting the Right Modular Kitchen Materials",
    excerpt: "Confused between MDF, particle board, and plywood? Read this guide to choose the most durable material for your Indian kitchen setup.",
    content: `A modular kitchen is a major investment. The lifespan of your kitchen depends primarily on the core cabinet materials (carcass) and the exterior finishes. 

Here are the key takeaways for Indian households:
1. **Always Use BWR/BWP Plywood**: Standard commercial plywood or MDF will swell up and warp within months due to cooking heat, steam, and water washing. Boiling Water Proof (BWP) marine grade plywood is a must for Indian kitchens.
2. **Finishes Matter**: Acrylic finishes are scratch-resistant, mirror-like, and highly modern but costlier. Laminates are highly budget-friendly, scratch-proof, and offer thousands of patterns, while PU paint gives a seamless look but requires skilled labor.
3. **Focus on the Work Triangle**: Keep the stove, refrigerator, and sink within a distance of 4 to 9 feet from each other for optimal cooking flow.`,
    date: "May 15, 2026",
    author: "Rajesh Panchal",
    readTime: "5 min read",
    image: "/images/modular_kitchen.png",
    category: "Kitchen Ideas"
  },
  {
    slug: "custom-vs-ready-made-furniture",
    title: "Custom-Made vs Ready-Made Furniture: Which is Better for Your Home?",
    excerpt: "Evaluate custom-built furniture vs ready-made stores on parameters like cost, durability, sizing, and design freedom.",
    content: `When moving into a new home or renovating, you face a big question: Should you buy ready-made furniture online/in-store, or hire carpenters to build custom furniture?

**1. Sizing and Fit:**
Ready-made furniture has standardized sizes. Custom furniture can fit exact alcoves, corners, and pillar shapes, preventing dust traps and maximizing space efficiency.

**2. Wood Quality Control:**
Ready-made furniture frequently uses engineered wood (MDF/particle board) covered with paper laminate. Custom furniture allows you to choose high-quality solid wood (Teak/Sal) or BWR plywood, giving a lifespan of 15-30 years instead of 3-5 years.

**3. Costing & Design:**
Ready-made is faster and cheaper upfront. Custom furniture has a higher starting cost but guarantees long-term durability and lets you match the design to your exact aesthetic.`,
    date: "April 28, 2026",
    author: "Amit Panchal",
    readTime: "4 min read",
    image: "/images/sofa_set.png",
    category: "Furniture Ideas"
  },
  {
    slug: "modern-living-room-designs-2026",
    title: "5 Modern Living Room Designs to Transform Your Space",
    excerpt: "Unlock the secrets of premium living rooms using wooden paneling, layout adjustments, and curated lighting setups.",
    content: `Your living room is the social hub of your home. A premium design doesn't mean overcrowded furniture; it's about balance, materials, and lighting.

Here are 5 design ideas to implement:
1. **Fluted Paneling & Marble Backdrops**: Combining natural veneer paneling with white or charcoal marble backboards creates a stunning focal point behind your TV.
2. **Low-Profile Sectional Sofas**: A custom L-shaped sofa set keeps the sightlines clear and makes the room feel spacious and inviting.
3. **Layered Lighting**: Combine warm ceiling LED strips with directional spotlighting and drop pendants near corners to create warmth.
4. **Statement Doors**: Frame your entrance with hand-polished teak wood doors to set a premium tone before guests step inside.
5. **Concealed Storage**: Build floating TV consoles with handle-less soft-close drawer runs to hide clutter.`,
    date: "June 02, 2026",
    author: "Amit Panchal",
    readTime: "6 min read",
    image: "/images/living_room_tv_wardrobe.png",
    category: "Interior Design"
  },
  {
    slug: "sliding-vs-open-wardrobes",
    title: "Sliding vs Open Wardrobes: A Practical Space Comparison",
    excerpt: "Which closet type is better for your bedroom layout? Check size limits, accessibility, and architectural styling advice.",
    content: `Choosing a wardrobe mechanism depends on your room size, design theme, and daily lifestyle.

**Sliding Wardrobes:**
- *Pros:* Do not need front clearance space, making them perfect for narrow bedroom passages. They look extremely modern, especially with profile glass and aluminum trims.
- *Cons:* You can only see one half of the closet at a time since the doors overlap.

**Open / Swing Wardrobes:**
- *Pros:* You can open all doors simultaneously to view the entire layout. Ideal for large rooms. Less expensive hardware and mechanisms.
- *Cons:* Require 2 feet of clear clearance space in front of the shutters to open, limiting furniture placement options.

*Recommendation:* Use sliding glass profile doors for master bedrooms to save space and add a luxury feel. Use swing doors for guest or kids' bedrooms where passage space is ample.`,
    date: "June 10, 2026",
    author: "Rajesh Panchal",
    readTime: "4 min read",
    image: "/images/wardrobe.png",
    category: "Wardrobe Ideas"
  },
  {
    slug: "modern-tv-unit-paneling-ideas",
    title: "Modern TV Unit Paneling Ideas for Indian Homes",
    excerpt: "Explore vertical wood paneling, hidden cable management, and stone finish highlights to upgrade your TV wall.",
    content: `A wall-mounted TV console is more than just a place for your television; it acts as the design anchor of the room.

**Key Paneling Trends:**
1. **Vertical Louver Planks**: Vertical charcoal or teak wood fluted panels make the ceiling feel taller.
2. **Hidden Wire Conduits**: Always plan wall chasing to lay heavy-duty PVC conduits. No cords should ever hang down from your TV.
3. **Stone-Finish Backsheets**: High-definition laminate sheets or actual Italian quartz panels behind the TV screen add textures.
4. **Floating Base Consoles**: Ground-cleared drawers are easier to clean under and look lightweight and premium.`,
    date: "June 12, 2026",
    author: "Amit Panchal",
    readTime: "3 min read",
    image: "/images/tv_unit.png",
    category: "TV Unit Ideas"
  },
  {
    slug: "plan-turnkey-home-interior-budget",
    title: "How to Plan Your Turnkey Home Interior Budget in 2026",
    excerpt: "Learn how to estimate material costs, design fees, and carpentry labor without falling for hidden contractor charges.",
    content: `Budget planning is where most homeowners struggle. A lack of structure leads to cost overruns of 20-30%.

Here is a simple blueprint for budget allocation:
- **Woodwork & Carpentry (50-60%)**: Plywood, laminates, kitchen pull-outs, beds, and wardrobes. Ensure you prioritize BWP marine plywood for wet areas.
- **Ceiling & Lighting (10-15%)**: False ceiling plasterboards, strip LEDs, and COB lights.
- **Paint & Finishes (10-15%)**: Acrylic putties, royal emulsion finishes, or wood polishes.
- **Electrical & Plumbing (5-10%)**: Concealed wiring adjustments and kitchen plumbing extensions.

*Pro-Tip:* Get a detailed itemized estimate based on actual site measurements rather than lump-sum packages to avoid unexpected cost additions.`,
    date: "June 15, 2026",
    author: "Rajesh Panchal",
    readTime: "7 min read",
    image: "/images/interior_3bhk.png",
    category: "Budget Planning"
  },
  {
    slug: "top-interior-design-trends-ahmedabad",
    title: "Top Interior Design Trends in Ahmedabad for 2026",
    excerpt: "Discover the latest local design preferences: from premium wood finishes to climate-resilient space optimization plans.",
    content: `Home design in Ahmedabad is evolving to blend local luxury with climate resilience.

**Key 2026 Trends:**
1. **Teak Polish & Veneers**: Solid teak wood and warm veneers are returning to popularity over cold laminates, celebrating natural wood grains.
2. **Climate-Smart False Ceilings**: Multi-layer false ceilings incorporating LED strip runs help insulate rooms from Ahmedabad's intense summer heat.
3. **Factory-Finished Modular Furniture**: Homeowners are choosing off-site factory cutting and edge-banding to minimize on-site dust, paint smells, and carpentry delays.
4. **Open Kitchen Layouts**: Parallel modular kitchens with breakfast counters are replacing traditional closed kitchens in modern apartments.`,
    date: "June 18, 2026",
    author: "Rajesh Panchal",
    readTime: "5 min read",
    image: "/images/interior_2bhk.png",
    category: "Ahmedabad Home Trends"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sandip Patel",
    role: "Home Owner",
    location: "Ghatlodia, Ahmedabad",
    text: "Panchal Interior built a custom modular kitchen and living room sofa set for us. The quality of BWP marine plywood and acrylic sheets is top-notch. Highly recommended for premium woodworking!",
    rating: 5
  },
  {
    id: 2,
    name: "Meera Shah",
    role: "Architect",
    location: "Vastrapur, Ahmedabad",
    text: "Working as a design consultant, I frequently partner with Panchal Interior for fabrication. Their craftsmanship, teak polishing quality, and eye for detail is outstanding. Always on time.",
    rating: 5
  },
  {
    id: 3,
    name: "Karan Desai",
    role: "IT Manager",
    location: "Bodakdev, Ahmedabad",
    text: "Extremely pleased with the TV cabinet and wardrobe execution. They did 3D visualization first, and the actual delivery looks exactly like the 3D renders. Soft-close drawers function incredibly smoothly.",
    rating: 5
  },
  {
    id: 4,
    name: "Pooja Mehta",
    role: "Business Owner",
    location: "C.G. Road, Ahmedabad",
    text: "Professional service and transparent pricing. No hidden costs. They used high quality Hettich hardware and provided direct factory rates. Excellent support!",
    rating: 5
  }
];

export const statsData: Stat[] = [
  { value: "15+", label: "Years Experience", icon: "Award" },
  { value: "500+", label: "Projects Completed", icon: "Briefcase" },
  { value: "100%", label: "Quality Assured", icon: "ShieldCheck" },
  { value: "On Time", label: "Project Delivery", icon: "Clock" }
];

export const advantagesData: Advantage[] = [
  {
    title: "Factory Direct Prices",
    description: "No middlemen margins. We manufacture furniture directly in our local workshop, passing on the cost benefits to you.",
    icon: "BadgePercent"
  },
  {
    title: "Premium Quality",
    description: "We use high-grade solid teak wood, commercial BWR plywood, and premium laminates/finishes with high resistance.",
    icon: "Gem"
  },
  {
    title: "Custom Design",
    description: "100% customized furniture design to fit your layout, sizing, and color requirements exactly.",
    icon: "Sliders"
  },
  {
    title: "Expert Team",
    description: "Highly skilled local carpenters and interior designers with decades of experience in high-end projects.",
    icon: "Users"
  },
  {
    title: "On Time Delivery",
    description: "We strictly adhere to project timelines. We plan and build major parts in our workshop to avoid on-site delays.",
    icon: "CalendarCheck"
  },
  {
    title: "Complete Support",
    description: "Get end-to-end design, construction, delivery, and post-installation support with a 5-year wood warranty.",
    icon: "Headphones"
  }
];

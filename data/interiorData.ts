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
  // //priceRange: string;
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
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  gallery: string[];
  description: string;
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
    title: "Skyline Premium Villa",
    category: "Residential",
    location: "Bopal, Ahmedabad",
    year: "2025",
    image: "/images/hero.png",
    gallery: ["/images/hero.png", "/images/sofa_set.png", "/images/tv_unit.png"],
    description: "A complete turnkey interior design project for a premium 4BHK villa. Features double-height living room paneling, customized Italian marble accents, modular kitchen, and modern bedroom wardrobe integrations."
  },
  {
    id: "proj-royal-kitchen",
    title: "Luxury Acrylic Kitchen Layout",
    category: "Kitchen",
    location: "Satellite, Ahmedabad",
    year: "2025",
    image: "/images/modular_kitchen.png",
    gallery: ["/images/modular_kitchen.png", "/images/tv_unit.png"],
    description: "A custom high-gloss modular kitchen featuring state of the art built-in appliances, quartz countertops, high-capacity tandem baskets, and soft-close mechanisms."
  },
  {
    id: "proj-modern-apartment",
    title: "Minimalist 3BHK Apartment",
    category: "Residential",
    location: "Prahlad Nagar, Ahmedabad",
    year: "2024",
    image: "/images/l_shape_sofa.png",
    gallery: ["/images/l_shape_sofa.png", "/images/wooden_bed.png"],
    description: "Scandinavian interior styling featuring warm wood profiles, custom L-shaped sofa sets, space-optimized wardrobes, and hidden mood lighting details."
  },
  {
    id: "proj-executive-office",
    title: "Executive Corporate Office",
    category: "Commercial",
    location: "S.G. Highway, Ahmedabad",
    year: "2024",
    image: "/images/tv_unit.png",
    gallery: ["/images/tv_unit.png", "/images/sofa_set.png"],
    description: "Dynamic workspace styling with customized partition panels, teak wood executive conference tables, elegant reception lounge, and custom glass cabinetry."
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
    image: "/images/modular_kitchen.png"
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
    image: "/images/sofa_set.png"
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

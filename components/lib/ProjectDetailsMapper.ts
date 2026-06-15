import { Project } from "@/data/interiorData";

export interface EnrichedProject extends Required<Project> {}

export function getProjectDetails(project: Project): EnrichedProject {
  // 1. Determine fallback client type
  const clientType = project.clientType || (project.category === "Commercial" ? "Corporate Client" : "Residential Home Owner");

  // 2. Determine fallback duration
  let duration = project.duration;
  if (!duration) {
    if (project.category === "Kitchen") duration = "20 Days";
    else if (project.category === "Commercial") duration = "35 Days";
    else duration = "45 Days";
  }

  // 3. Determine fallback area size
  let areaSize = project.areaSize;
  if (!areaSize) {
    if (project.category === "Kitchen") areaSize = "180 Sq.Ft.";
    else if (project.category === "Commercial") areaSize = "1,600 Sq.Ft.";
    else areaSize = "2,100 Sq.Ft.";
  }

  // 4. Determine fallback services list
  let services = project.services;
  if (!services || services.length === 0) {
    if (project.category === "Kitchen") {
      services = ["Modular Kitchen Layout", "BWP Plywood Carcasses", "Quartz Countertop Fitting", "Pantry System Installation"];
    } else if (project.category === "Commercial") {
      services = ["Office Cabin Design", "Dynamic Partition Paneling", "Acoustic False Ceiling", "Electrical and LAN Networking"];
    } else {
      services = ["Turnkey Living Space Design", "Bespoke Sofa Fabrication", "False Gypsum Ceiling", "Custom Wardrobes & Hydraulic Beds"];
    }
  }

  // 5. Determine fallback materials list
  let materials = project.materials;
  if (!materials || materials.length === 0) {
    if (project.category === "Kitchen") {
      materials = ["BWP Marine Plywood", "High-Gloss Acrylic Sheets", "Quartz Countertop Stone", "Hafele Hydraulic Hinges", "Stainless Steel Baskets"];
    } else if (project.category === "Commercial") {
      materials = ["Heavy-duty Partition Framing", "Tesa HDMR Boards", "Toughened Glass Profiles", "Oak Veneers", "Roma Modular Switches"];
    } else {
      materials = ["Solid CP Teak Wood", "Waterproof BWR Plywood", "Veneers and Matt Laminates", "Hettich Soft-closing Guides", "Sleepwell 40-density Foam"];
    }
  }

  // 6. Determine fallback work categories
  let workCategories = project.workCategories;
  if (!workCategories || workCategories.length === 0) {
    if (project.category === "Kitchen") {
      workCategories = [
        { title: "Modular Base Cabinets", desc: "Under-counter cabinets built with BWP marine plywood to resist water spillage and daily cleaning dampness." },
        { title: "Wall Storage Units", desc: "Overhead storage cabinets featuring hydraulic gas-lift shutters for ergonomic access." },
        { title: "Tall Pantry Pantry", desc: "Vertical pull-out pantry layout utilizing heavy-duty steel wire racks for dry grocery storage." }
      ];
    } else if (project.category === "Commercial") {
      workCategories = [
        { title: "Executive Cabin Cabinets", desc: "Premium veneer-clad storage cabinets and main desk fabricated directly on-site." },
        { title: "Glass Partitions", desc: "Sound-dampening profile glass partitions with aluminium borders for visual openness and quiet workspace." },
        { title: "Reception Counter", desc: "Curved front desk styled with high-gloss laminates, integrated LED strips, and cable organizer slots." }
      ];
    } else {
      workCategories = [
        { title: "Main Door Entrance", desc: "Custom hand-polished solid teak wood main door with detailed molding frames and brass handles." },
        { title: "Bedroom Wardrobe Systems", desc: "Custom floor-to-ceiling wardrobes featuring space-saving sliding profile mechanisms and internal LED coves." },
        { title: "TV Unit Paneling", desc: "Living room wall paneling using a combination of vertical fluted louvers, marble sheet, and oak veneer." },
        { title: "Teak Wood Hydraulic Bed", desc: "King-size bed framed in seasoned solid wood with a massive internal storage compartment lifted by gas pistons." }
      ];
    }
  }

  // 7. Determine fallback FAQs
  let faqs = project.faqs;
  if (!faqs || faqs.length === 0) {
    if (project.category === "Kitchen") {
      faqs = [
        { question: "Is the modular kitchen waterproof?", answer: "Yes, we exclusively use BWP (Boiling Water Proof) Marine Grade Plywood for all kitchen carcasses, protecting them against water leakage and rot." },
        { question: "How long did this kitchen setup take?", answer: `This project was completed within ${duration} including layout finalization, workshop cutting, and on-site assembly.` }
      ];
    } else if (project.category === "Commercial") {
      faqs = [
        { question: "How do you manage networking cables?", answer: "All desks are pre-wired during assembly with custom cable trays, grommet openings, and hidden wall channels to keep workspaces clean." },
        { question: "Was false ceiling acoustic paneling included?", answer: "Yes, we integrated acoustic false ceilings using specialized mineral fiber tiles in conference halls to reduce voice echo." }
      ];
    } else {
      faqs = [
        { question: "Did you manufacture the sofa set in this project?", answer: "Yes, the sofa sets in our projects are custom-fabricated directly in our Gota workshop using 40-density HR Sleepwell foam and custom premium fabrics." },
        { question: "Can we modify the wardrobe internal drawer configurations?", answer: "Absolutely. All our wardrobes are 100% custom-built, allowing you to select hanging rod lengths, lock drawers, and locker counts." }
      ];
    }
  }

  return {
    ...project,
    clientType,
    duration,
    areaSize,
    services,
    materials,
    workCategories,
    faqs
  };
}

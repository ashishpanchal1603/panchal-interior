// Bilingual item names mapping
export const bilingualNames: Record<string, string> = {
  "Wardrobe": "Wardrobe (કબાટ)",
  "Kitchen": "Kitchen (કિચન)",
  "TV Unit": "TV Unit (ટીવી યુનિટ)",
  "Crockery Unit": "Crockery Unit (ક્રોકરી યુનિટ)",
  "Computer Table": "Computer Table (કોમ્પ્યુટર ટેબલ)",
  "Dressing Table": "Dressing Table (ડ્રેસિંગ ટેબલ)",
  "Single Bed": "Single Bed (સિંગલ બેડ)",
  "Double Bed": "Double Bed (ડબલ બેડ)",
  "Side Box": "Side Box (સાઇડ બોક્સ)",
  "Headboard": "Headboard (હેડબોર્ડ)",
  "Sofa": "Sofa (સોફા)",
  "Center Table": "Center Table (સેન્ટર ટેબલ)",
  "Corner Table": "Corner Table (કોર્નર ટેબલ)",
  "Dining Table": "Dining Table (ડાઇનિંગ ટેબલ)",
  "Loft": "Loft (માળીયું)",
  "Partition": "Partition (પાર્ટિશન)",
  "Wooden Ceiling": "Wooden Ceiling (લાકડાનું સીલિંગ)",
  "Window Frame": "Window Frame (બારી ફ્રેમ)",
  "Window Shutters": "Window Shutters (બારી શટર)",
  "Flush Door": "Flush Door (ફ્લશ ડોર)",
  "Shoe Cupboard": "Shoe Cupboard (જૂતા કબાટ)",
  "Inside Laminate": "Inside Laminate (ઇનસાઇડ લેમિનેટ)",
  "Architecture Patti": "Architecture Patti (આર્કિટેક્ચર પટ્ટી)"
};

/**
 * Helper to parse a bilingual name string like "Wardrobe (કબાટ)" into its English and Gujarati components.
 */
function parseBilingual(bilingualStr: string): { en: string; gu: string } {
  const parts = bilingualStr.split("(");
  const en = parts[0].trim();
  const gu = parts[1] ? parts[1].replace(")", "").trim() : en;
  return { en, gu };
}

/**
 * Normalizes and converts an item name into its bilingual (English + Gujarati) version,
 * or extracts only the English or Gujarati version depending on the `lang` parameter.
 */
export function getBilingualItemName(name: string, lang?: "en" | "gu"): string {
  if (!name) return name;
  const cleanName = name.trim();

  // Find if this name matches any key or value in bilingualNames (or part of it)
  let matchedKey: string | undefined = undefined;
  
  for (const key of Object.keys(bilingualNames)) {
    const bilingualValue = bilingualNames[key];
    const { en, gu } = parseBilingual(bilingualValue);
    
    if (
      key.toLowerCase() === cleanName.toLowerCase() ||
      bilingualValue.toLowerCase() === cleanName.toLowerCase() ||
      en.toLowerCase() === cleanName.toLowerCase() ||
      gu.toLowerCase() === cleanName.toLowerCase()
    ) {
      matchedKey = key;
      break;
    }
  }

  // If we found a match in our pre-defined catalog
  if (matchedKey) {
    const bilingualValue = bilingualNames[matchedKey];
    if (!lang) {
      return bilingualValue;
    }
    const { en, gu } = parseBilingual(bilingualValue);
    return lang === "en" ? en : gu;
  }

  // If no match is found in the catalog, but the string has the bilingual pattern "English (Gujarati)"
  if (cleanName.includes("(")) {
    const { en, gu } = parseBilingual(cleanName);
    if (!lang) {
      return cleanName;
    }
    return lang === "en" ? en : gu;
  }

  // If it's a completely custom item name (not in catalog, no parens),
  // return as is since we don't have its translation.
  return cleanName;
}

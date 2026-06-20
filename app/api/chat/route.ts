import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  message: string;
  lang?: "en" | "hi" | "gu";
  history?: ChatMessage[];
}

export async function POST(request: Request) {
  try {
    const { message, lang = "en" } = (await request.json()) as ChatRequestBody;

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const query = message.toLowerCase().trim();
    let reply = "";

    // 1. Showroom Location / Address
    const isLocationQuery =
      query.includes("location") || query.includes("where") || query.includes("address") ||
      query.includes("showroom") || query.includes("gota") || query.includes("ahmedabad") ||
      query.includes("office") || query.includes("map") ||
      query.includes("पता") || query.includes("कहाँ") || query.includes("स्थान") ||
      query.includes("સરનામું") || query.includes("ક્યાં") || query.includes("નકશો") || query.includes("ગોટા");

    // 2. Pricing / Budget / Calculator
    const isPricingQuery =
      query.includes("price") || query.includes("cost") || query.includes("budget") ||
      query.includes("rate") || query.includes("calculator") || query.includes("estimate") ||
      query.includes("how much") ||
      query.includes("किमत") || query.includes("खर्च") || query.includes("कीमत") || query.includes("बजट") ||
      query.includes("કિંમત") || query.includes("અંદાજ") || query.includes("રેટ") || query.includes("ખર્ચ");

    // 3. Warranty & Wood Durability
    const isWarrantyQuery =
      query.includes("warranty") || query.includes("guarantee") || query.includes("termite") ||
      query.includes("borer") || query.includes("duration") || query.includes("quality") ||
      query.includes("वारंटी") || query.includes("गारंटी") || query.includes("दीमक") || query.includes("गुणवत्ता") ||
      query.includes("વોરંટી") || query.includes("ગેરંટી") || query.includes("ઉધઈ") || query.includes("ગુણવત્તા");

    // 4. Services Inquiry
    const isServicesQuery =
      query.includes("services") || query.includes("modular kitchen") || query.includes("kitchen") ||
      query.includes("sofa") || query.includes("furniture") || query.includes("painting") ||
      query.includes("electrical") || query.includes("wardrobe") || query.includes("bed") ||
      query.includes("ceiling") || query.includes("what you do") ||
      query.includes("काम") || query.includes("सेवा") || query.includes("किचन") || query.includes("सोफा") || query.includes("फर्नीचर") ||
      query.includes("સેવા") || query.includes("કિચન") || query.includes("સોફા") || query.includes("ફર્નિચર");

    // 5. Portfolio / Projects
    const isProjectsQuery =
      query.includes("project") || query.includes("portfolio") || query.includes("work") ||
      query.includes("completed") || query.includes("gallery") || query.includes("photo") ||
      query.includes("penthouse") || query.includes("villa") ||
      query.includes("प्रोजेक्ट") || query.includes("गैलरी") ||
      query.includes("પ્રોજેક્ટ") || query.includes("ગેલેરી") || query.includes("કામ");

    // 6. Hours & Timings
    const isHoursQuery =
      query.includes("hour") || query.includes("time") || query.includes("timing") ||
      query.includes("open") || query.includes("sunday") || query.includes("saturday") ||
      query.includes("schedule") ||
      query.includes("समय") || query.includes("खुलने") || query.includes("रविवार") ||
      query.includes("સમય") || query.includes("ચાલુ") || query.includes("રવિવાર");

    // 7. Contact Details / Ashish Panchal
    const isContactQuery =
      query.includes("contact") || query.includes("phone") || query.includes("number") ||
      query.includes("call") || query.includes("mobile") || query.includes("ashish") ||
      query.includes("panchal") || query.includes("whatsapp") || query.includes("owner") ||
      query.includes("संपर्क") || query.includes("नंबर") || query.includes("फ़ोन") || query.includes("कॉल") ||
      query.includes("સંપર્ક") || query.includes("નંબર") || query.includes("કોલ") || query.includes("મોબાઈલ");

    // 8. Default Greetings
    const isGreetingQuery =
      query.includes("hello") || query.includes("hi") || query.includes("hey") ||
      query.includes("greetings") || query.includes("welcome") || query.includes("help") ||
      query.includes("ai") || query.includes("bot") ||
      query.includes("नमस्ते") || query.includes("नमसकार") ||
      query.includes("નમસ્તે") || query.includes("કેમ છો");


    // LANGUAGE: GUJARATI
    if (lang === "gu") {
      if (isLocationQuery) {
        reply = `📍 **શોરૂમ અને વર્કશોપનું સરનામું:**
અમારી મુખ્ય વર્કશોપ અને પ્રીમિયમ ફર્નિચર શોરૂમ **ગોટા, અમદાવાદ, ગુજરાત** માં આવેલ છે.

અમે મોડ્યુલર કિચન શટર અને સોફા ફ્રેમ્સ સીધા અમારા વર્કશોપમાં જ બનાવીએ છીએ જેથી તમને હોલસેલ રેટ મળી શકે. મટિરિયલના સેમ્પલ (લેમિનેટ્સ, વિનિયર્સ, ક્વાર્ટઝ કાઉન્ટરટોપ અને બ્રાન્ડેડ હાર્ડવેર) જોવા માટે અમારા ગોતા શોરૂમની મુલાકાત લો.`;
      } else if (isPricingQuery) {
        reply = `💰 **કિંમત અને બજેટ અંદાજ:**
અમે વચેટિયા વિના સીધા અમારા ગોતા વર્કશોપમાંથી જ ઉત્પાદન સપ્લાય કરીએ છીએ, તેથી અમે **ફેક્ટરી-ડાયરેક્ટ રેટ** ઓફર કરીએ છીએ!

તમારા પ્રોજેક્ટ માટે કસ્ટમ અંદાજ મેળવવા:
1. અમારા હોમપેજ પર આપેલ **[બજેટ પ્લાનર](/#cost-estimator)** ટૂલનો ઉપયોગ કરો. તે તમને સાઈઝ પસંદ કરી મોડ્યુલર કિચન અને વોર્ડરોબનો અંદાજ ગણવામાં મદદ કરશે.
2. અમે **ફ્રી સાઇટ મેઝરમેન્ટ અને 3D CAD લેઆઉટ પ્લાનિંગ** ની સેવા આપીએ છીએ.

શોરૂમ મુલાકાત માટે **[અહીં ક્લિક કરો](/contact)** અથવા ચેટ હેડરમાં આપેલ કોલ બટનનો ઉપયોગ કરો!`;
      } else if (isWarrantyQuery) {
        reply = `🛡️ **વોરંટી અને ગુણવત્તા:**
અમે અમારા તમામ કસ્ટમ લાકડાના ફર્નિચર અને મોડ્યુલર કામ પર **5 વર્ષની ફેક્ટરી-ડાયરેક્ટ વોરંટી** આપીએ છીએ!

- **ઉધઈ અને સડા સામે રક્ષણ**: અમે સીઝન્ડ કરેલા લીમડા અને સાગના લાકડાનો ઉપયોગ કરીએ છીએ.
- **વોટરપ્રૂફ BWP પ્લાયવૂડ**: રસોડા અને ભીનાશવાળી જગ્યાઓ માટે અમે 100% વોટરપ્રૂફ Century/Greenply પ્લાયવૂડ વાપરીએ છીએ.
- **બ્રાન્ડેડ હાર્ડવેર**: લાંબા આયુષ્ય માટે **Hettich** અને **Hafele** ના સોફ્ટ-ક્લોઝ હિંગ્સ વાપરીએ છીએ.`;
      } else if (isServicesQuery) {
        reply = `🛠️ **અમારી કસ્ટમાઇઝ્ડ ઇન્ટિરિયર સેવાઓ:**
અમે રહેણાંક અને વ્યાવસાયિક જગ્યાઓ માટે કસ્ટમ ડિઝાઇન કરીએ છીએ:

- 🍳 **મોડ્યુલર કિચન**: BWP મરીન પ્લાયવૂડ, ક્વાર્ટઝ પ્લેટફોર્મ અને જર્મન એક્રેલિક શટર્સ. વધુ માહિતી: **[મોડ્યુલર કિચન](/services/modular-kitchen)**
- 🛋️ **સોફા ઉત્પાદન**: લક્ઝરી L-શેપ સોફા અને સેક્શનલ્સ જેમાં 40-ડેન્સિટી Sleepwell HR ફોમ વાપરવામાં આવે છે. વધુ માહિતી: **[સોફા ઉત્પાદન](/services/sofa-manufacturing)**
- 🚪 **કસ્ટમ ફર્નિચર**: સાગના લાકડાના દરવાજા, કબાટ અને ડબલ બેડ. વધુ માહિતી: **[કસ્ટમ ફર્નિચર](/services/custom-furniture)**
- 💡 **ઇલેક્ટ્રિકલ કામ**: સેફ કન્સિલ્ડ વાયરિંગ અને સ્માર્ટ લાઈટ્સ. વધુ માહિતી: **[ઇલેક્ટ્રિકલ કામ](/services/electrical-work)**
- 🎨 **કલર કામ**: પ્રીમિયમ કલર પૂર્ણાહુતિ અને લાકડાનું PU પોલિશ કામ. વધુ માહિતી: **[કલર કામ](/services/painting-services)**`;
      } else if (isProjectsQuery) {
        reply = `🏡 **અમારા પૂર્ણ થયેલા પ્રોજેક્ટ્સ:**
અમે અમદાવાદમાં **500 થી વધુ સાઇટ્સ** સફળતાપૂર્વક પૂર્ણ કરી છે:
- **સ્કાયલાઇન પ્રીમિયમ વિલા** (બોપલ, અમદાવાદ): સાગના લાકડાનું ફર્નિચર અને વિનિયર પેનલિંગ.
- **ગોતા લક્ઝરી પેન્ટહાઉસ** (ગોટા, અમદાવાદ): સ્માર્ટ પ્રોફાઇલ ગ્લાસ વોર્ડરોબ અને કસ્ટમ કબાટ.
- **લક્ઝરી એક્રેલિક કિચન** (સેટેલાઇટ, અમદાવાદ): હાઇ-ગ્લોસ ફિનિશ મોડ્યુલર કિચન.

પૂર્ણ થયેલા પ્રોજેક્ટ્સના ફોટા જોવા અમારા **[પ્રોજેક્ટ્સ પેજ](/projects)** ની મુલાકાત લો અથવા **[ગેલેરી](/gallery)** જુઓ.`;
      } else if (isHoursQuery) {
        reply = `⏰ **શોરૂમ અને ઓફિસનો સમય:**
- **સોમવારથી શનિવાર**: સવારે 9:30 થી સાંજના 7:30 સુધી (શોરૂમ મુલાકાત ખુલ્લી છે).
- **રવિવાર**: અગાઉથી નક્કી કરેલી એપોઇન્ટમેન્ટ અને સાઇટ વિઝિટ માટે જ ખુલ્લું રહેશે.

એપોઇન્ટમેન્ટ બુક કરવા **[અહીં ફોર્મ ભરો](/contact)**.`;
      } else if (isContactQuery) {
        reply = `📞 **અમારો સીધો સંપર્ક કરો:**
તમે અમારા શોરૂમના ઓનર **આશિષ પંચાલ** સાથે સીધા જોડાઈ શકો છો:

- **મોબાઇલ / વોટ્સએપ:** **+91 99251 11438**
- **ઇમેઇલ:** inquiries@panchalinterior.com
- **સરનામું:** ગોટા, અમદાવાદ, ગુજરાત

સાઇટ મેઝરમેન્ટ માટે વોટ્સએપ પર લોકેશન શેર કરી શકો છો અથવા કૉલ કરી શકો છો. અથવા ઓનલાઈન ઇન્ક્વાયરી માટે **[અહીં ક્લિક કરો](/contact)**.`;
      } else if (isGreetingQuery) {
        reply = `👋 **નમસ્તે! પંચાલ ઇન્ટિરિયર એન્ડ ફર્નિચર સોલ્યુશન્સમાં તમારું સ્વાગત છે.**

હું તમારો AI ડિઝાઇન આસિસ્ટન્ટ છું. હું તમને મોડ્યુલર કિચન ખર્ચ, વોર્ડરોબ સાઈઝિંગ, 5 વર્ષની વોરંટી અને સરનામા વિષે માહિતી આપી શકું છું.

**મુખ્ય વિષયો જેના વિષે તમે પૂછી શકો છો:**
- 🍳 *રસોડાની ડિઝાઇન અને મટિરિયલ*
- 🛋️ *સોફા મેકિંગ અને Sleepwell ફોમ*
- 🛡️ *5 વર્ષની વોરંટી વિગતો*
- 📍 *શોરૂમનું એડ્રેસ અને સમય*
- 📞 *ઓનર આશિષ પંચાલનો વોટ્સએપ નંબર*

આજે તમને કેવી રીતે મદદ કરું?`;
      } else {
        reply = `🤖 **પંચાલ ઇન્ટિરિયર આસિસ્ટન્ટ:**
હું સમજી શકું છું કે તમે આના વિશે પૂછી રહ્યા છો: *"${message}"*.

ઝડપી માહિતી માટે:
- સાઇઝ મુજબ કિચન/કબાટનો અંદાજ મેળવવા અમારા **[બજેટ પ્લાનર](/#cost-estimator)** નો ઉપયોગ કરો.
- સીધા કૉલ અથવા વોટ્સએપ માટે ઓનર **આશિષ પંચાલ** નો સંપર્ક કરો: **+91 99251 11438**.
- શોરૂમ મુલાકાત નક્કી કરવા **[ઇન્ક્વાયરી ફોર્મ ભરો](/contact)**.`;
      }
    }
    // LANGUAGE: HINDI
    else if (lang === "hi") {
      if (isLocationQuery) {
        reply = `📍 **शोरूम और वर्कशॉप का पता:**
हमारा मुख्य वर्कशॉप और प्रीमियम फर्नीचर शोरूम **गोटा, अहमदाबाद, गुजरात** में स्थित है।

हम सभी मॉड्यूलर शटर और सोफा फ्रेम सीधे अपने कारखाने में बनाते हैं जिससे आपको डायरेक्ट-फैक्ट्री रेट मिलते हैं। अहमदाबाद में हमारे शोरूम पर आएं और मटेरियल के सैंपल (लैमिनेट्स, विनियर, क्वार्ट्ज काउंटरटॉप और सॉफ्ट-क्लोज चैनल) का अनुभव करें।`;
      } else if (isPricingQuery) {
        reply = `💰 **कीमत और बजट अनुमान:**
हम सीधे अपनी गोटा वर्कशॉप से डिलीवरी करते हैं, जिससे ग्राहकों को बिना किसी डीलर कमीशन के **फैक्ट्री-डायरेक्ट रेट** मिलते हैं!

कस्टम कोटेशन पाने के लिए:
1. हमारे होमपेज पर दिए गए **[बजट प्लानर](/#cost-estimator)** का उपयोग करें। यह आपको चौड़ाई और ऊंचाई के आधार पर किचन और वार्डरोब की कीमत की गणना करने में मदद करेगा।
2. हम **फ्री साइट मेजरमेंट और 3D CAD लेआउट डिजाइन** प्रदान करते हैं।

शोरूम अपॉइंटमेंट के लिए **[यहाँ क्लिक करें](/contact)** या ऊपर दिए गए कॉल बटन का उपयोग करें!`;
      } else if (isWarrantyQuery) {
        reply = `🛡️ **वारंटी और सामग्री गुणवत्ता:**
हम अपने सभी कस्टम लकड़ी के काम और मॉड्यूलर फिटिंग पर **5 साल की ठोस लकड़ी और प्लाईवुड वारंटी** देते हैं!

- **दीमक और कीड़े से सुरक्षित**: सभी लकड़ी और प्लाईवुड को रसायनों से उपचारित किया जाता है।
- **वाटरप्रूप BWP प्लाई**: किचन और बाथरूम एरिया के लिए 100% वाटरप्रूफ मरीन ग्रेड प्लाईवुड (BWP) का उपयोग किया जाता है।
- **प्रीमियम फिटिंग्स**: हम टिकाऊ उपयोग के लिए **Hettich** और **Hafele** के सॉफ्ट-क्लोज रनर का उपयोग करते हैं।`;
      } else if (isServicesQuery) {
        reply = `🛠️ **हमारी कस्टमाइज़्ड इंटीरियर सेवाएँ:**
हम घर और ऑफिस के लिए टर्नकी इंटीरियर का काम करते हैं:

- 🍳 **मॉड्यूलर किचन**: वाटरप्रूफ मरीन प्लाई, क्वार्ट्ज काउंटरटॉप और जर्मन ऐक्रेलिक शटर। अधिक जानें: **[मॉड्यूलर किचन](/services/modular-kitchen)**
- 🛋️ **सोफा निर्माण**: आधुनिक एल-शेप सोफे, चेस्टरफील्ड डिजाइन और प्रीमियम 40-डेंसिटी Sleepwell फोम। अधिक जानें: **[सोफा निर्माण](/services/sofa-manufacturing)**
- 🚪 **कस्टम फर्नीचर**: टीक वुड बेड, सागवान के नक्काशीदार दरवाजे और कबाड़। अधिक जानें: **[कस्टम फर्नीचर](/services/custom-furniture)**
- 💡 **इलेक्ट्रिकल वर्क**: सुरक्षित कंसील्ड वायरिंग और एलईडी प्रोफाइल लाइटिंग। अधिक जानें: **[इलेक्ट्रिकल वर्क](/services/electrical-work)**
- 🎨 **पेंटिंग और पॉलिश**: एशियान पेंट्स रॉयल इंटीरियर फिनिश और लकड़ी पर पीयू पॉलिश। अधिक जानें: **[पेंटिंग सर्विसेज](/services/painting-services)**`;
      } else if (isProjectsQuery) {
        reply = `🏡 **हमारे पूरे किए गए प्रोजेक्ट्स:**
हमने अहमदाबाद में **500 से अधिक प्रोजेक्ट्स** सफलतापूर्वक पूरे किए हैं:
- **स्काईलाइन प्रीमियम विला** (बोपल, अहमदाबाद): भव्य डबल-हाइट विनियर सीलिंग और शानदार वुडवर्क।
- **गोटा लग्जरी पेंटहाउस** (गोटा, अहमदाबाद): वॉक-इन ग्लास वार्डरोब और सागवान का मुख्य द्वार।
- **लक्ज़री ऐक्रेलिक किचन** (सैटेलाइट, अहमदाबाद): सॉफ्ट-क्लोज हेटिच दराजों के साथ मॉड्यूलर किचन।

तस्वीरें देखने के लिए हमारे **[प्रोजेक्ट्स पेज](/projects)** पर जाएं या **[गैलरी](/gallery)** देखें।`;
      } else if (isHoursQuery) {
        reply = `⏰ ** शोरूम के खुलने का समय:**
- **सोमवार से शनिवार**: सुबह 9:30 बजे से शाम 7:30 बजे तक (शोरूम खुला है और आप कभी भी आ सकते हैं)।
- **रविवार**: रविवार को शोरूम केवल **पहले से बुक की गई अपॉइंटमेंट** या साइट मेजरमेंट के लिए खुलता है।

अपॉइंटमेंट बुक करने के लिए **[संपर्क फ़ॉर्म भरें](/contact)**।`;
      } else if (isContactQuery) {
        reply = `📞 **सीधे हमसे संपर्क करें:**
आप हमारे शोरूम ओनर **आशिष पंचाल** से सीधे संपर्क कर सकते हैं:

- **मोबाइल / व्हाट्सएप:** **+91 99251 11438**
- **ईमेल:** inquiries@panchalinterior.com
- **शोरूम पता:** गोटा, अहमदाबाद, गुजरात

साइट विजिट के लिए आप हमें व्हाट्सएप पर अपना लोकेशन भेज सकते हैं। या ऑनलाइन पूछताछ के लिए **[पूछताछ फ़ॉर्म भरें](/contact)**।`;
      } else if (isGreetingQuery) {
        reply = `👋 **नमस्ते! पंचाल इंटीरियर एंड फर्नीचर सॉल्यूशंस में आपका स्वागत है।**

मैं आपका एआई डिज़ाइन सहायक हूँ। मैं आपको मॉड्यूलर किचन का खर्च, सामग्री की गुणवत्ता, 5 साल की वारंटी और हमारे गोटा शोरूम के समय के बारे में जानकारी दे सकता हूँ।

**महत्वपूर्ण विषय जिनके बारे में आप पूछ सकते हैं:**
- 🍳 *किचन डिजाइन और सामग्री*
- 🛋️ *सोफा बनाने और Sleepwell फोम की डेंसिटी*
- 🛡️ *5 साल की वारंटी की शर्तें*
- 📍 *शोरूम का पता और समय*
- 📞 *ओनर आशिष पंचाल का मोबाइल/व्हाट्सएप नंबर*

आज मैं आपकी क्या सहायता कर सकता हूँ?`;
      } else {
        reply = `🤖 **पंचाल इंटीरियर सहायक:**
मैं समझ सकता हूँ कि आप इसके बारे में पूछ रहे हैं: *"${message}"*.

त्वरित सहायता के लिए:
- अपने साइज के अनुसार किचन/वार्डरोब का खर्च जानने के लिए हमारे **[बजट प्लानर](/#cost-estimator)** का उपयोग करें।
- ओनर **आशिष पंचाल** से सीधे बात या व्हाट्सएप करने के लिए कॉल करें: **+91 99251 11438**।
- साइट विजिट शेड्यूल करने के लिए कृपया **[यहाँ फॉर्म भरें](/contact)**।`;
      }
    }
    // LANGUAGE: ENGLISH (DEFAULT)
    else {
      if (isLocationQuery) {
        reply = `📍 **Showroom & Workshop Location:**
Our main workshop and furniture showroom are located in **Gota, Ahmedabad, Gujarat**. 

We manufacture all modular shutters and sofa frames in-house to offer you direct-factory rates. If you are in Ahmedabad, we would love to have you visit to touch and feel our material catalogs (laminates, veneers, quartz countertops, and hardware options).`;
      } else if (isPricingQuery) {
        reply = `💰 **Pricing & Estimates:**
Because we manufacture directly in our Gota workshop, we offer **direct-factory rates** without middlemen margins!

To calculate custom costs for your project:
1. Try our interactive **[Design Budget Planner](/#cost-estimator)** on our homepage. It lets you select layout dimensions and materials for Modular Kitchens, Wardrobes, or Full Home woodwork.
2. We offer a **Free Site Measurement & 3D CAD Layout Estimation session**. One of our experts will take exact site measurements and prepare a tailored budget estimate. 

Click **[Request a Free Quote](/contact)** or click the button in the chatbot header to get started!`;
      } else if (isWarrantyQuery) {
        reply = `🛡️ **Warranty & Material Quality:**
We offer a **5-Year Solid Wood and Plywood Warranty** on all our custom modular fabrication!

Key quality standards we follow:
- **Termite & Borer Treated**: All teak wood logs and neem frames are seasoned and treated.
- **Boiling Water Proof (BWP) Plywood**: We use certified Marine Plywood (BWP) for kitchens and damp areas, ensuring zero bubbling or warping.
- **Premium Hardware**: We integrate certified soft-close channels and gas-lifts from brands like **Hettich** and **Hafele** with long-term guarantees.`;
      } else if (isServicesQuery) {
        reply = `🛠️ **Our Custom Execution Offerings:**
We specialize in end-to-end turnkey residential and commercial interiors:

- 🍳 **Modular Kitchens**: Straight, L-Shape, U-Shape, or Parallel layouts built using BWP Marine Plywood, soft-close hardware, and scratch-resistant German acrylic sheets. Learn more: **[Modular Kitchens](/services/modular-kitchen)**
- 🛋️ **Sofa Manufacturing**: Custom L-shaped sectionals, recliners, and Chesterfield sofas fabricated using seasoned neem frames and 40-density Sleepwell HR foam. Learn more: **[Sofa Manufacturing](/services/sofa-manufacturing)**
- 🚪 **Bespoke Wardrobes**: Custom swing/sliding wardrobes with smoked profile glass and internal automatic LED lights. Learn more: **[Custom Furniture](/services/custom-furniture)**
- 💡 **Electrical & Lighting**: Concealed Fire-safe wiring, MCB setups, profile LEDs, and smart coves. Learn more: **[Electrical Work](/services/electrical-work)**
- 🎨 **Premium Painting**: Double coat putty finish, Asian Paints Royal finishes, and wood PU/melamine polishing. Learn more: **[Painting Services](/services/painting-services)**`;
      } else if (isProjectsQuery) {
        reply = `🏡 **Our Project Portfolio:**
We have executed over **500+ projects** in Ahmedabad, including:
- **Skyline Premium Villa** (Bopal, Ahmedabad): Double-height veneer ceilings, modular kitchen, and custom solid teak woodwork.
- **Gota Luxury Penthouse** (Ahmedabad): Duplex luxury layout featuring custom walk-in closets and teak main door carving.
- **Luxury Acrylic Kitchen** (Satellite, Ahmedabad): Factory-finish modular kitchen with quartz countertop.

Explore high-quality project details and before-after transitions on our **[Projects Page](/projects)** or view categorized woodworks in our **[Gallery](/gallery)**.`;
      } else if (isHoursQuery) {
        reply = `⏰ **Business Operating Hours:**
- **Monday to Saturday**: 9:30 AM to 7:30 PM (Showroom open & visits welcome)
- **Sunday**: Open by **pre-scheduled visits only** for clients who request site measurements or layout finalization.

To book a showroom appointment, please use the **[Contact Form](/contact)** or call us directly.`;
      } else if (isContactQuery) {
        reply = `📞 **Get in Touch Directly:**
You can reach our showroom or connect directly with our owner, **Ashish Panchal**:

- **Mobile / WhatsApp:** **+91 99251 11438**
- **Email:** inquiries@panchalinterior.com
- **Showroom Address:** Gota, Ahmedabad, Gujarat

Feel free to send a message on WhatsApp or call to schedule a site measurement session. You can also submit an inquiry online using the **[Contact Form](/contact)**!`;
      } else if (isGreetingQuery) {
        reply = `👋 **Namaste! Welcome to Panchal Interior & Furniture Solutions.**

I am your AI Design Assistant. I can help answer questions about our premium carpentry services, direct-factory pricing, solid teak wood materials, warranty terms, and showroom timings in Gota, Ahmedabad.

**Quick topics you can ask me about:**
- 🍳 *Modular Kitchen details & materials*
- 🛋️ *Bespoke Sofa sets and Sleepwell foam comfort*
- 🛡️ *Our 5-Year Wood Warranty*
- 📍 *Showroom Address and Hours*
- 📞 *WhatsApp number to contact Ashish Panchal*

How can I help you plan your space today?`;
      } else {
        reply = `🤖 **Panchal Interior Assistant:**
I understand you are interested in details for: *"${message}"*.

To give you the most accurate help:
- For **costs and estimates**, you can calculate layouts on our **[Design Budget Planner](/#cost-estimator)**.
- For **direct contact**, call or WhatsApp our owner **Ashish Panchal** at **+91 99251 11438**.
- For **materials, pricing, or showroom visits**, feel free to send us an inquiry via our **[Contact Page](/contact)**.

Or, ask me about topics like *kitchen*, *sofa*, *warranty*, *address*, or *contact* for quick automated answers!`;
      }
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const err = error as Error;
    console.error("Chatbot Route Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

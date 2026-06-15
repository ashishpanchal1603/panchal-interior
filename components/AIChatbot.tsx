"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, PhoneCall, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteModal } from "./QuoteModalContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type LangType = "en" | "hi" | "gu";

const greetings = {
  en: "👋 **Welcome to Panchal Interior.** I am your AI Design Assistant. Ask me about custom kitchen pricing, 5-year wood warranty, or showroom timings in Gota, Ahmedabad!",
  hi: "👋 **पंचाल इंटीरियर में आपका स्वागत है।** मैं आपका एआई डिज़ाइन सहायक हूँ। मुझसे मॉड्यूलर किचन की कीमत, 5 साल की लकड़ी की वारंटी, या गोटा, अहमदाबाद में शोरूम के समय के बारे में पूछें!",
  gu: "👋 **પંચાલ ઇન્ટિરિયરમાં તમારું સ્વાગત છે.** હું તમારો AI ડિઝાઇન આસિસ્ટન્ટ છું. મને મોડ્યુલર કિચનની કિંમત, 5 વર્ષની લાકડાની વોરંટી, અથવા ગોતા, અમદાવાદમાં શોરૂમના સમય વિશે પૂછો!",
};

const suggestionChips = {
  en: [
    { text: "Modular Kitchen cost?", query: "modular kitchen cost and layout options" },
    { text: "Warranty details?", query: "do you offer warranty on wooden furniture?" },
    { text: "Where is the showroom?", query: "showroom address and location map" },
    { text: "Call Ashish Panchal", query: "whatsapp contact phone number Ashish Panchal" },
  ],
  hi: [
    { text: "किचन का खर्च?", query: "modular kitchen cost and layout options" },
    { text: "वारंटी की जानकारी?", query: "do you offer warranty on wooden furniture?" },
    { text: "शोरूम कहाँ है?", query: "showroom address and location map" },
    { text: "आशिष को कॉल करें", query: "whatsapp contact phone number Ashish Panchal" },
  ],
  gu: [
    { text: "કિચનનો ખર્ચ?", query: "modular kitchen cost and layout options" },
    { text: "વોરંટીની માહિતી?", query: "do you offer warranty on wooden furniture?" },
    { text: "શોરૂમ ક્યાં છે?", query: "showroom address and location map" },
    { text: "આશિષને કોલ કરો", query: "whatsapp contact phone number Ashish Panchal" },
  ],
};

const headerSubtexts = {
  en: "Owner Ashish Panchal Showroom",
  hi: "ओनर आशिष पंचाल शोरूम",
  gu: "ઓનર આશિષ પંચાલ શોરૂમ",
};

const tooltipText = {
  en: { title: "Need a Price Estimate?", desc: "Hey! I can help you plan modular kitchen or wardrobe estimates in 2 minutes. Click to chat!" },
  hi: { title: "बजट अनुमान चाहिए?", desc: "नमस्ते! मैं 2 मिनट में मॉड्यूलर किचन या वार्डरोब का खर्च प्लान करने में आपकी मदद कर सकता हूँ।" },
  gu: { title: "બજેટ અંદાજ જોઈએ છે?", desc: "નમસ્તે! હું ૨ મિનિટમાં મોડ્યુલર કિચન અથવા કબાટનો અંદાજ મેળવવામાં તમારી મદદ કરી શકું છું." },
};

const systemAlerts = {
  en: {
    connIssue: "🤖 **System Alert:** I encountered a temporary connection issue. Please feel free to call our showroom directly at **+91 99251 11438**.",
    timeout: "🤖 **System Alert:** Connection timeout. Please check your network or call us directly."
  },
  hi: {
    connIssue: "🤖 **सिस्टम अलर्ट:** मुझे नेटवर्क कनेक्शन में समस्या आ रही है। कृपया सीधे हमारे शोरूम नंबर **+91 99251 11438** पर कॉल करें।",
    timeout: "🤖 **सिस्टम अलर्ट:** कनेक्शन टाइमआउट। कृपया अपना नेटवर्क जांचें या सीधे कॉल करें।"
  },
  gu: {
    connIssue: "🤖 **સિસ્ટમ એલર્ટ:** નેટવર્ક કનેક્શનમાં કોઈ સમસ્યા આવી છે. કૃપા કરીને સીધા અમારા શોરૂમ નંબર **+91 99251 11438** પર કૉલ કરો.",
    timeout: "🤖 **સિસ્ટમ એલર્ટ:** કનેક્શન ટાઇમઆઉટ. કૃપા કરીને તમારું નેટવર્ક તપાસો અથવા સીધો ફોન કરો."
  }
};

const inputPlaceholder = {
  en: "Ask about materials, cost, warranty...",
  hi: "सामग्री, खर्च, वारंटी के बारे में पूछें...",
  gu: "મટિરિયલ, ખર્ચ, વોરંટી વિશે પૂછો...",
};

export default function AIChatbot() {
  const { openQuoteModal } = useQuoteModal();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<LangType>("en");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: greetings.en,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Show tooltip after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setShowTooltip(true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  const handleLanguageChange = (newLang: LangType) => {
    setLang(newLang);
    // If the chat history only has the default greeting, replace it
    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length === 1 && updated[0].role === "assistant") {
        updated[0] = {
          role: "assistant",
          content: greetings[newLang],
        };
      }
      return updated;
    });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setShowTooltip(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          lang: lang,
        }),
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: systemAlerts[lang].connIssue,
          },
        ]);
      }
    } catch (err) {
      console.error("Chatbot failed to fetch:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: systemAlerts[lang].timeout,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (query: string) => {
    handleSendMessage(query);
  };

  const parseMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let cleanLine = line;
      let isHeader = false;

      // Detect visual heading tags
      if (
        line.startsWith("📍") ||
        line.startsWith("💰") ||
        line.startsWith("🛠️") ||
        line.startsWith("🏡") ||
        line.startsWith("⏰") ||
        line.startsWith("🛡️") ||
        line.startsWith("📞") ||
        line.startsWith("👋") ||
        line.startsWith("🤖")
      ) {
        isHeader = true;
      }

      // Regex parser for links: [text](url)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = linkRegex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }

        const linkText = match[1];
        const linkUrl = match[2];

        parts.push(
          <a
            key={`link-${match.index}`}
            href={linkUrl}
            onClick={(e) => {
              if (linkUrl.startsWith("/#") || linkUrl === "#cost-estimator") {
                e.preventDefault();
                setIsOpen(false);
                const el = document.getElementById("cost-estimator");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-primary hover:text-primary-hover font-bold underline transition"
          >
            {linkText}
          </a>
        );
        lastIndex = linkRegex.lastIndex;
      }

      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      // Second layer: Parse bold tags **boldText** in text strings
      const formattedParts = parts.map((part, pIdx) => {
        if (typeof part === "string") {
          const boldParts: React.ReactNode[] = [];
          let bLastIndex = 0;
          let bMatch: RegExpExecArray | null;

          while ((bMatch = boldRegex.exec(part)) !== null) {
            if (bMatch.index > bLastIndex) {
              boldParts.push(part.substring(bLastIndex, bMatch.index));
            }
            boldParts.push(
              <strong key={`bold-${bMatch.index}`} className="font-bold text-stone-900">
                {bMatch[1]}
              </strong>
            );
            bLastIndex = boldRegex.lastIndex;
          }

          if (bLastIndex < part.length) {
            boldParts.push(part.substring(bLastIndex));
          }

          return boldParts.length > 0 ? (
            <React.Fragment key={pIdx}>{boldParts}</React.Fragment>
          ) : (
            part
          );
        }
        return part;
      });

      return (
        <span
          key={idx}
          className={`block ${isHeader
            ? "font-serif text-[13px] font-bold text-stone-950 mt-3.5 mb-1.5 first:mt-0"
            : "text-xs text-stone-600 leading-relaxed mb-1.5"
            }`}
        >
          {formattedParts}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      {/* 1. Chat Tooltip Prompt */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3.5 mr-1 bg-stone-900 text-white rounded-xl p-3.5 shadow-xl border border-stone-800 text-[11px] font-medium max-w-xs relative pointer-events-auto cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-stone-900 border-r border-b border-stone-800 transform rotate-45" />
            <div className="flex gap-2.5 items-start">
              <Bot className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-primary">{tooltipText[lang].title}</p>
                <p className="text-stone-300 mt-1 leading-normal">
                  {tooltipText[lang].desc}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute -top-1.5 -right-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 p-0.5 border border-stone-700 shadow"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-[90vw] sm:w-[390px] h-[520px] rounded-2xl bg-white/95 border border-stone-200 shadow-2xl flex flex-col overflow-hidden mb-4 backdrop-blur-md"
          >
            {/* Header */}
            <div className="bg-stone-950 text-white p-4 flex items-center justify-between border-b border-stone-850 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 rounded-full bg-primary-light flex items-center justify-center border border-primary/20 shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                  <span className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-stone-950 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white tracking-wide">
                    Panchal Interior Assistant
                  </h4>
                  <span className="text-[9px] text-stone-400 block mt-0.5 font-sans">
                    {headerSubtexts[lang]}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Toggles */}
                <div className="flex bg-stone-900 border border-stone-800 rounded-lg p-0.5 text-[8.5px] font-bold shrink-0">
                  {(["en", "hi", "gu"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleLanguageChange(l)}
                      className={`px-1.5 py-0.5 rounded transition cursor-pointer select-none ${lang === l ? "bg-primary text-white" : "text-stone-400 hover:text-white"
                        }`}
                    >
                      {l === "en" ? "EN" : l === "hi" ? "हिं" : "ગુજ"}
                    </button>
                  ))}
                </div>

                {/* Direct Phone Call Link */}
                <a
                  href="tel:+919925111438"
                  className="rounded-full hover:bg-stone-850 p-1.5 text-primary hover:text-white transition cursor-pointer flex items-center justify-center"
                  title="Call Ashish Panchal"
                >
                  <PhoneCall className="h-4 w-4" />
                </a>
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-stone-850 p-1.5 text-stone-400 hover:text-white transition cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Message Viewport */}
            <div className="flex-grow overflow-y-auto p-4 bg-stone-50/50 space-y-4">
              {messages.map((msg, i) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    {isAssistant && (
                      <div className="h-7 w-7 rounded-full bg-stone-900 flex items-center justify-center shrink-0 text-white mt-1 border border-stone-800">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs shadow-sm ${isAssistant
                        ? "bg-white border border-stone-200/80 rounded-tl-sm text-stone-800"
                        : "bg-primary text-white rounded-tr-sm"
                        }`}
                    >
                      {isAssistant ? parseMarkdown(msg.content) : <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="h-7 w-7 rounded-full bg-stone-900 flex items-center justify-center shrink-0 text-white mt-1 border border-stone-800">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-2xl rounded-tl-sm px-4.5 py-3.5 shadow-sm">
                    <div className="flex gap-1 items-center py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips & Form Input */}
            <div className="p-3.5 border-t border-stone-150 bg-white shrink-0 space-y-3">
              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 select-none scrollbar-thin">
                {suggestionChips[lang].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleChipClick(chip.query)}
                    className="text-[10px] font-bold text-stone-600 hover:text-primary bg-stone-50 hover:bg-primary-light border border-stone-200/80 hover:border-primary px-3 py-1.5 rounded-full transition cursor-pointer whitespace-nowrap"
                  >
                    {chip.text}
                  </button>
                ))}
              </div>

              {/* Text Form Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2 border border-stone-200 rounded-xl px-3.5 py-1.5 bg-stone-50 focus-within:border-primary focus-within:bg-white transition"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputPlaceholder[lang]}
                  className="flex-grow bg-transparent text-xs text-stone-800 placeholder-stone-400 focus:outline-none border-none py-1.5"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="text-primary hover:text-primary-hover transition disabled:opacity-40 p-1.5 rounded-lg hover:bg-stone-100 cursor-pointer"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Floating Action Bubble (FAB) */}
      <motion.button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative h-14 w-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isOpen
          ? "bg-stone-900 text-white border-stone-800 hover:bg-stone-850"
          : "bg-primary text-white border-primary-hover hover:bg-primary-hover"
          }`}
      >
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75 -z-10" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="h-6 w-6" />
              {messages.length === 1 && !isOpen && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

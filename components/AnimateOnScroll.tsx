"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: "fadeInUp" | "scaleIn" | "slideLeft" | "slideRight" | "simpleFade";
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
}

export default function AnimateOnScroll({
  children,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.5,
  className = "",
  viewportMargin = "-50px",
}: AnimateOnScrollProps) {
  const getVariants = () => {
    switch (variant) {
      case "scaleIn":
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
        };
      case "slideLeft":
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
        };
      case "slideRight":
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
        };
      case "simpleFade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
      case "fadeInUp":
      default:
        return {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
        };
    }
  };

  const { initial, animate } = getVariants();

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

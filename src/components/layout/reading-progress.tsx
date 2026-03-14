"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className }: ReadingProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 origin-left z-[60]",
        className
      )}
      style={{ scaleX }}
    />
  );
}

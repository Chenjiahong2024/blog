"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface SlideUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function SlideUp({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

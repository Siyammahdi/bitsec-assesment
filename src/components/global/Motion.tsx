"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type FadeProps = PropsWithChildren<{
  delay?: number;
  className?: string;
}>;

export function MotionFade({ children, delay = 0, className }: FadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}



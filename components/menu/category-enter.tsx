"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function CategoryEnter({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 32,
        delay: 0.05,
      }}
    >
      {children}
    </motion.div>
  );
}

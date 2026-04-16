import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Remedy } from "@/lib/api";

export function RemedyPanel({ remedies }: { remedies: Remedy[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-2xl p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold font-display text-foreground">Treatment Plan</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-mint/10 text-mint font-medium">{remedies.length} steps</span>
      </div>

      <div className="space-y-2">
        {remedies.map((r, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-background/20">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background/10 transition-colors"
            >
              <span className="text-xl">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-mint/10 text-mint font-medium">{r.type}</span>
              <motion.svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                animate={{ rotate: open === i ? 180 : 0 }}
                className="text-muted-foreground shrink-0"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-3 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

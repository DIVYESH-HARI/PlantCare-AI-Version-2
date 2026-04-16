import { motion, AnimatePresence } from "framer-motion";

export function EnhancementToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`glass-card rounded-xl px-5 py-4 flex items-center justify-between gap-4 transition-all duration-500 ${enabled ? "glow-mint" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${enabled ? "bg-mint/20" : "bg-muted"}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={enabled ? "oklch(0.72 0.14 162)" : "oklch(0.65 0.04 155)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">AI Enhancement</p>
          <p className="text-xs text-muted-foreground">Real-ESRGAN upscaling</p>
        </div>
      </div>
      <motion.button
        onClick={onToggle}
        layout
        className="relative w-14 h-7 rounded-full overflow-hidden"
        animate={{
          backgroundColor: enabled ? "oklch(0.50 0.14 160)" : "oklch(0.20 0.04 155)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: enabled ? "inset 0 2px 4px oklch(0 0 0 / 20%)" : "inset 0 2px 4px oklch(0 0 0 / 40%)",
        }}
      >
        <motion.div
          className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-[0_2px_10px_oklch(0_0_0/30%)] z-10"
          animate={{
            left: enabled ? "calc(100% - 1.625rem)" : "0.125rem",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.8,
          }}
        />
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            scale: enabled ? 1.2 : 0.8,
            opacity: enabled ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 10px oklch(0.72 0.14 162 / 50%)" }} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

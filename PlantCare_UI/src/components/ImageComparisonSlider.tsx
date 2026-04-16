import { useState, useRef } from "react";
import { motion } from "framer-motion";

export function ImageComparisonSlider({
  originalSrc,
  enhancedSrc,
}: {
  originalSrc: string;
  enhancedSrc?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-glass-border">
        <span className="text-sm font-medium text-muted-foreground">Before / After Comparison</span>
        <span className="text-xs px-2 py-1 rounded-full bg-mint/15 text-mint font-medium">Real-ESRGAN</span>
      </div>
      <div
        ref={containerRef}
        className="relative w-full aspect-square cursor-col-resize select-none overflow-hidden"
        onMouseDown={() => { dragging.current = true; }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onMouseMove={(e) => { if (dragging.current) handleMove(e.clientX); }}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* Enhanced (full) */}
        {enhancedSrc ? (
          <img src={enhancedSrc} alt="Enhanced leaf" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-muted/20 flex flex-col items-center justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-mint/20 border-t-mint animate-spin mb-2" />
             <span className="text-xs text-muted-foreground font-medium">Enhancing image...</span>
          </div>
        )}
        {/* Original (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img src={originalSrc} alt="Original leaf" className="w-full h-full object-cover" style={{ width: `${100 / (position / 100)}%`, maxWidth: "none" }} />
        </div>
        {/* Divider line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-foreground/80 z-10" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/90 flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L3 10L7 16" stroke="oklch(0.12 0.03 155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 4L17 10L13 16" stroke="oklch(0.12 0.03 155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {/* Labels */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-background/70 backdrop-blur text-xs font-medium">Original</div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-mint/20 backdrop-blur text-xs font-medium text-mint">Enhanced</div>
      </div>
    </motion.div>
  );
}

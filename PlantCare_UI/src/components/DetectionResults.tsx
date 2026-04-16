import { motion } from "framer-motion";
import { ConfidenceRing } from "./ConfidenceRing";
import type { PredictionResponse } from "@/lib/api";

export function DetectionResults({ result }: { result: PredictionResponse }) {
  const { disease_info, confidence, top5 } = result;
  
  // Convert 0-1 confidence to percentage
  const confPercentage = Math.round(confidence * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-2xl p-6 space-y-6"
    >
      <h3 className="text-base font-semibold font-display text-foreground">Detection Results</h3>

      <div className="flex justify-center">
        <ConfidenceRing value={confPercentage} label="Confidence Score" />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Findings</p>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-background/30"
        >
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${disease_info.is_healthy ? "bg-healthy" : "bg-danger"}`} />
            <span className="text-sm text-foreground">{disease_info.display_name}</span>
          </div>
          {disease_info.is_healthy && (
            <span className="text-sm font-semibold capitalize text-healthy">
              Healthy
            </span>
          )}
        </motion.div>
        
        <p className="text-sm text-muted-foreground leading-relaxed px-1">
          {disease_info.description}
        </p>
      </div>

      {/* Top 5 Predictions */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Top Predictions</p>
        <div className="space-y-1.5">
          {top5.map((pred, i) => (
            <div key={pred.label} className="relative h-6 rounded-md overflow-hidden bg-background/30 flex items-center px-3 z-0">
              <motion.div
                className="absolute inset-y-0 left-0 -z-10"
                style={{ background: i === 0 ? "oklch(0.62 0.16 160 / 25%)" : "oklch(0.55 0.04 155 / 15%)" }}
                initial={{ width: 0 }}
                animate={{ width: `${pred.confidence * 100}%` }}
                transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
              />
              <span className="text-xs text-foreground flex-1 truncate pr-2">{pred.label.replace(/___/g, " — ").replace(/_/g, " ")}</span>
              <span className="text-xs font-mono text-muted-foreground">{(pred.confidence * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

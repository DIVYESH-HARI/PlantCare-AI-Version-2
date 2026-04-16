import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { predictImage, type PredictionResponse } from "@/lib/api";
import { UploadZone } from "@/components/UploadZone";
import { EnhancementToggle } from "@/components/EnhancementToggle";
import { ImageComparisonSlider } from "@/components/ImageComparisonSlider";
import { DetectionResults } from "@/components/DetectionResults";
import { RemedyPanel } from "@/components/RemedyPanel";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [enhanced, setEnhanced] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Start analysis
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await predictImage(file, enhanced);
      setResult(res);
      if (res.enhanced_image) {
          setEnhancedUrl(res.enhanced_image);
      } else {
          setEnhancedUrl(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to analyze image");
      setResult(null);
      setEnhancedUrl(null);
    } finally {
      setIsAnalyzing(false);
      setIsEnhancing(false);
    }
  };

  const toggleEnhancement = () => {
    const newEnhanced = !enhanced;
    setEnhanced(newEnhanced);
    
    // Always re-analyze when toggling if an image is loaded, to flip between baseline and enhanced results
    if (selectedFile) {
       const fetchAnalysis = async () => {
          setIsAnalyzing(true);
          try {
            const res = await predictImage(selectedFile, newEnhanced);
            setResult(res);
            // Only update enhanced URL if we got one back (which happens when newEnhanced is true)
            // If newEnhanced is false, we can leave the old enhancedUrl in state so it doesn't have to re-fetch if they toggle it back on, though API call is fast anyway.
            if (res.enhanced_image) {
                setEnhancedUrl(res.enhanced_image);
            }
          } catch (err: any) {
            setError(err.message || "Failed to analyze image");
            setResult(null);
          } finally {
            setIsAnalyzing(false);
          }
       };
       fetchAnalysis();
    }
  };

  // Cleanup object urls
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            style={{ background: "oklch(0.08 0.03 155 / 85%)", backdropFilter: "blur(12px)" }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 80, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-x-0 bottom-0 top-[5%] z-50 overflow-y-auto rounded-t-[2rem]"
            style={{
              background: "oklch(0.13 0.03 155)",
              border: "1px solid oklch(1 0 0 / 10%)",
              boxShadow: "0 -20px 80px oklch(0.50 0.14 160 / 20%)",
            }}
          >
            {/* Glow strip at top */}
            <div
              className="absolute top-0 inset-x-0 h-1 rounded-t-[2rem]"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.62 0.16 160), oklch(0.72 0.14 162), oklch(0.62 0.16 160), transparent)" }}
            />

            {/* Drag handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 rounded-full" style={{ background: "oklch(1 0 0 / 15%)" }} />
            </div>

            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
              style={{ background: "oklch(0.13 0.03 155 / 95%)", backdropFilter: "blur(16px)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "oklch(0.62 0.16 160 / 15%)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.72 0.14 162)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-foreground">Upload Plant Image</h2>
                  <p className="text-xs text-muted-foreground">AI-powered disease detection</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "oklch(1 0 0 / 8%)", border: "1px solid oklch(1 0 0 / 10%)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(0.65 0.04 155)" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-7"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-5 rounded-full" style={{ background: "linear-gradient(180deg, oklch(0.72 0.14 162), oklch(0.50 0.14 160))" }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.14 162)" }}>Detect &amp; Diagnose</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-foreground">
                  Diagnose your <span className="text-gradient-mint">plants</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Upload a clear photo of your plant leaf and receive instant AI-powered analysis</p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left column */}
                <div className="lg:col-span-7 space-y-5">
                  <UploadZone 
                    selectedFile={selectedFile}
                    previewUrl={previewUrl}
                    onFileSelect={handleFileSelect}
                  />
                  {/* Keep toggle visible, but don't show comparison tools until we have an image */}
                  <EnhancementToggle enabled={enhanced} onToggle={toggleEnhancement} />
                  
                  {enhanced && isAnalyzing && (
                    <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center aspect-video">
                      <div className="w-10 h-10 rounded-full border-4 border-mint/20 border-t-mint animate-spin mb-4" />
                      <p className="text-foreground font-medium text-sm text-center">Enhancing with Real-ESRGAN &<br/>Analyzing Image...</p>
                    </div>
                  )}
                  {enhanced && !isAnalyzing && enhancedUrl && previewUrl && (
                    <ImageComparisonSlider originalSrc={previewUrl} enhancedSrc={enhancedUrl} />
                  )}
                </div>
                {/* Right column */}
                <div className="lg:col-span-5 space-y-5">
                  {isAnalyzing && !enhanced ? (
                    <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
                      <div className="w-12 h-12 rounded-full border-4 border-mint/20 border-t-mint animate-spin mb-4" />
                      <p className="text-foreground font-medium">Analyzing Image...</p>
                      <p className="text-xs text-muted-foreground mt-1">YOLO model is processing</p>
                    </div>
                  ) : error ? (
                    <div className="glass-card rounded-2xl p-6 border-danger/30 bg-danger/5">
                      <p className="text-danger font-medium text-sm text-center">{error}</p>
                    </div>
                  ) : result ? (
                    <>
                      <DetectionResults result={result} />
                      <RemedyPanel remedies={result.disease_info.remedies} />
                    </>
                  ) : (
                    <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center border-dashed border-2 border-white/5">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <p className="text-sm font-medium text-foreground">Awaiting Upload</p>
                      <p className="text-xs text-muted-foreground mt-1">Select an image to see detection results</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

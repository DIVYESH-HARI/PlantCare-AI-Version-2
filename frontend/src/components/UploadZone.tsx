import { motion } from "framer-motion";
import { useState, useRef } from "react";

export function UploadZone({
  selectedFile,
  previewUrl,
  onFileSelect,
}: {
  selectedFile: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (file && file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative glass-card-strong rounded-2xl p-6 cursor-pointer transition-all duration-300 ${isDragging ? "glow-mint-strong scale-[1.02]" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative w-full aspect-video md:aspect-[16/9] rounded-xl overflow-hidden group">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-contain bg-black/40" />
          <div className="absolute inset-0 bg-background/0 backdrop-blur-0 group-hover:bg-background/40 group-hover:backdrop-blur-[2px] transition-all duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-4 py-2 rounded-lg bg-mint text-mint-foreground font-semibold text-sm shadow-lg">
              Click to change image
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 py-8 relative z-10 cursor-pointer">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-mint/10 flex items-center justify-center"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="oklch(0.72 0.14 162)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </motion.div>
          <div className="text-center">
            <h3 className="text-lg font-semibold font-display text-foreground">Upload Plant Image</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Drag & drop or <button type="button" className="text-mint hover:underline font-medium" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>browse files</button>
            </p>
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 10MB</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

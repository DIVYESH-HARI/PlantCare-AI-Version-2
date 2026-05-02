import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { UploadModal } from "@/components/UploadModal";
import { checkServerHealth } from "@/lib/api";

import appleImg from "@/assets/plants/apple_leaf_1776369542993.png";
import blueberryImg from "@/assets/plants/blueberry_leaf_1776369558674.png";
import cherryImg from "@/assets/plants/cherry_leaf_1776369572971.png";
import cornImg from "@/assets/plants/corn_leaf_1776369587525.png";
import grapeImg from "@/assets/plants/grape_leaf_1776369606771.png";
import orangeImg from "@/assets/plants/orange_leaf_1776369621259.png";
import peachImg from "@/assets/plants/peach_leaf_1776369637302.png";
import pepperImg from "@/assets/plants/pepper_leaf_1776369651933.png";
import potatoImg from "@/assets/plants/potato_leaf_1776369773555.png";
import raspberryImg from "@/assets/plants/raspberry_leaf_1776369679746.png";
import soybeanImg from "@/assets/plants/soybean_leaf_1776369694103.png";
import squashImg from "@/assets/plants/squash_leaf_1776369708107.png";
import strawberryImg from "@/assets/plants/strawberry_leaf_1776369725000.png";
import tomatoImg from "@/assets/plants/tomato_leaf_1776369746553.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PlantCare AI — Plant Disease Detection" },
      {
        name: "description",
        content:
          "AI-powered plant disease detection with Real-ESRGAN image enhancement. Upload a photo and get instant diagnosis with treatment recommendations.",
      },
    ],
  }),
});

/* ─────────────────────── helpers ─────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <div className="h-px w-8 rounded-full" style={{ background: "oklch(0.72 0.14 162 / 50%)" }} />
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.14 162)" }}>{text}</span>
      <div className="h-px w-8 rounded-full" style={{ background: "oklch(0.72 0.14 162 / 50%)" }} />
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── feature cards data ─────────────────────── */
const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "AI-Powered Detection",
    desc: "Advanced YOLO neural network trained on thousands of plant disease images for accurate identification",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Instant Results",
    desc: "Get disease diagnosis and confidence scores in seconds with our optimized detection pipeline",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Expert Recommendations",
    desc: "Detailed cure recommendations with step-by-step treatment guides for each detected disease",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "99% Accuracy",
    desc: "Industry-leading accuracy rates backed by extensive testing and continuous model improvements",
  },
];

/* ─────────────────────── how it works data ─────────────────────── */
const steps = [
  {
    num: "01",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    title: "Upload Image",
    desc: "Take a clear photo of your plant leaf showing any symptoms or abnormalities",
  },
  {
    num: "02",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M12 12h.01" />
      </svg>
    ),
    title: "AI Analysis",
    desc: "Our YOLO model processes the image through advanced computer vision algorithms",
  },
  {
    num: "03",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Get Results",
    desc: "Receive instant disease identification with confidence scores and severity assessment",
  },
  {
    num: "04",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Take Action",
    desc: "Follow expert cure recommendations and treatment steps to save your crops",
  },
];

/* ─────────────────────── disease cards data ─────────────────────── */
const diseaseCards = [
  {
    img: appleImg,
    name: "Apple",
    color: "oklch(0.60 0.18 20)",
    diseases: ["Apple Scab", "Black Rot", "Cedar Apple Rust", "Healthy"],
  },
  {
    img: blueberryImg,
    name: "Blueberry",
    color: "oklch(0.50 0.18 250)",
    diseases: ["Healthy"],
  },
  {
    img: cherryImg,
    name: "Cherry",
    color: "oklch(0.55 0.18 10)",
    diseases: ["Powdery Mildew", "Healthy"],
  },
  {
    img: cornImg,
    name: "Corn (Maize)",
    color: "oklch(0.75 0.16 90)",
    diseases: ["Cercospora / Gray Leaf Spot", "Common Rust", "Northern Leaf Blight", "Healthy"],
  },
  {
    img: grapeImg,
    name: "Grape",
    color: "oklch(0.50 0.18 300)",
    diseases: ["Black Rot", "Esca (Measles)", "Leaf Blight", "Healthy"],
  },
  {
    img: orangeImg,
    name: "Orange",
    color: "oklch(0.65 0.18 45)",
    diseases: ["Haunglongbing (Citrus Greening)"],
  },
  {
    img: peachImg,
    name: "Peach",
    color: "oklch(0.70 0.15 40)",
    diseases: ["Bacterial Spot", "Healthy"],
  },
  {
    img: pepperImg,
    name: "Pepper",
    color: "oklch(0.55 0.18 30)",
    diseases: ["Bacterial Spot", "Healthy"],
  },
  {
    img: potatoImg,
    name: "Potato",
    color: "oklch(0.65 0.15 80)",
    diseases: ["Early Blight", "Late Blight", "Healthy"],
  },
  {
    img: raspberryImg,
    name: "Raspberry",
    color: "oklch(0.60 0.18 340)",
    diseases: ["Healthy"],
  },
  {
    img: soybeanImg,
    name: "Soybean",
    color: "oklch(0.65 0.18 120)",
    diseases: ["Healthy"],
  },
  {
    img: squashImg,
    name: "Squash",
    color: "oklch(0.70 0.16 80)",
    diseases: ["Powdery Mildew"],
  },
  {
    img: strawberryImg,
    name: "Strawberry",
    color: "oklch(0.55 0.20 15)",
    diseases: ["Leaf Scorch", "Healthy"],
  },
  {
    img: tomatoImg,
    name: "Tomato",
    color: "oklch(0.65 0.18 25)",
    diseases: ["Bacterial Spot", "Early Blight", "Late Blight", "Leaf Mold", "Septoria Leaf Spot", "Spider Mites", "Target Spot", "Yellow Leaf Curl Virus", "Mosaic Virus", "Healthy"],
  },
];

/* ─────────────────────── main component ─────────────────────── */
function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [serverOnline, setServerOnline] = useState(false);
  const bottomCtaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check server status
    checkServerHealth()
      .then(res => setServerOnline(res.status === 'online'))
      .catch(() => setServerOnline(false));

    // Poll every 30 seconds
    const interval = setInterval(() => {
      checkServerHealth()
        .then(res => setServerOnline(res.status === 'online'))
        .catch(() => setServerOnline(false));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    bottomCtaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-[130px]" style={{ background: "oklch(0.50 0.14 160)" }} />
        <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] rounded-full opacity-10 blur-[110px]" style={{ background: "oklch(0.72 0.14 162)" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 blur-[110px]" style={{ background: "oklch(0.62 0.16 160)" }} />
      </div>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header className="relative z-20 border-b" style={{ borderColor: "oklch(1 0 0 / 8%)", background: "oklch(0.12 0.03 155 / 80%)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "oklch(0.62 0.16 160 / 15%)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="oklch(0.72 0.14 162)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold font-display text-foreground tracking-tight">PlantCare AI</h1>
              <p className="text-[11px] text-muted-foreground">Disease Detection System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${serverOnline ? 'bg-healthy animate-pulse' : 'bg-danger'}`} />
              <span className="text-xs text-muted-foreground">{serverOnline ? 'System Online' : 'System Offline'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Decorative ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          <div className="w-[700px] h-[700px] rounded-full opacity-5" style={{ border: "1px solid oklch(0.72 0.14 162)", boxShadow: "0 0 120px oklch(0.62 0.16 160 / 20%)" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-5" style={{ border: "1px solid oklch(0.72 0.14 162)" }} />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-7"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "oklch(0.62 0.16 160 / 12%)",
              border: "1px solid oklch(0.62 0.16 160 / 30%)",
              color: "oklch(0.72 0.14 162)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            Powered by AI &amp; Computer Vision
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.05]">
            <span className="text-gradient-mint">PlantCare AI</span>
            <br />
            <span className="text-foreground">Disease Detection</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: "oklch(0.65 0.04 155)" }}
        >
          Upload a photo of your plant and get instant AI-powered disease diagnosis with expert cure recommendations for 14 different plant types.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 300 }}
          className="mb-14"
        >
          <button
            id="hero-upload-btn"
            onClick={scrollToBottom}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold font-display transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, oklch(0.62 0.16 160), oklch(0.50 0.14 160))",
              color: "white",
              boxShadow: "0 8px 40px oklch(0.50 0.14 160 / 40%), 0 2px 8px oklch(0.50 0.14 160 / 20%)",
            }}
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </motion.span>
            Upload Plant Image
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
              initial={false}
            >
              <motion.div
                className="absolute top-0 -left-full h-full w-1/2 skew-x-[-15deg]"
                style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 20%), transparent)" }}
                animate={{ left: ["−100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }}
              />
            </motion.div>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-center gap-10 md:gap-16 w-full"
        >
          {[
             { value: "38", label: "Diseases Detected" },
             { value: "14", label: "Plant Types" },
             { value: "99%", label: "Accuracy" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center min-w-[120px]">
              <div className="text-2xl md:text-3xl font-bold font-display tracking-tight" style={{ color: "oklch(0.72 0.14 162)" }}>{stat.value}</div>
              <div className="text-xs md:text-sm mt-1.5 whitespace-nowrap" style={{ color: "oklch(0.55 0.04 155)" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Why PlantCare AI ───────────────────────────────── */}
      <section id="why" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionLabel text="Why Choose Us" />
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">Why <span className="text-gradient-mint">PlantCare AI?</span></h2>
            <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: "oklch(0.60 0.04 155)" }}>
              Cutting-edge technology meets agricultural expertise to protect your crops
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  className="group relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
                  style={{
                    background: "oklch(0.16 0.03 155 / 60%)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, oklch(0.62 0.16 160), oklch(0.50 0.14 160))" }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-base font-bold font-display text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.04 155)" }}>{f.desc}</p>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: "0 0 40px oklch(0.62 0.16 160 / 15%) inset" }} />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section id="how" className="relative z-10 py-24 px-6">
        {/* Background stripe */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "oklch(0.14 0.025 155 / 50%)" }} />
        <div className="relative max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionLabel text="The Process" />
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">How It <span className="text-gradient-mint">Works</span></h2>
            <p className="text-base mt-4 max-w-md mx-auto" style={{ color: "oklch(0.60 0.04 155)" }}>
              Simple, fast, and accurate plant disease detection in 4 easy steps
            </p>
          </FadeUp>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[2.4rem] left-[12.5%] right-[12.5%] h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, oklch(0.62 0.16 160 / 60%), oklch(0.72 0.14 162 / 60%), oklch(0.62 0.16 160 / 60%))" }} />

            {steps.map((s, i) => (
              <FadeUp key={i} delay={i * 0.12} className="flex flex-col items-center text-center">
                {/* Circle + number */}
                <div className="relative mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.62 0.16 160), oklch(0.50 0.14 160))",
                      boxShadow: "0 8px 30px oklch(0.50 0.14 160 / 35%)",
                    }}
                  >
                    {s.icon}
                  </div>
                  <div
                    className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold font-display"
                    style={{
                      background: "oklch(0.14 0.03 155)",
                      border: "1.5px solid oklch(0.72 0.14 162 / 60%)",
                      color: "oklch(0.72 0.14 162)",
                    }}
                  >
                    {s.num}
                  </div>
                </div>
                <h3 className="text-base font-bold font-display text-foreground mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.58 0.04 155)" }}>{s.desc}</p>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp delay={0.5} className="flex justify-center mt-14">
            <button
              id="how-upload-btn"
              onClick={scrollToBottom}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold font-display transition-all duration-300 hover:scale-105"
              style={{
                background: "oklch(0.62 0.16 160 / 12%)",
                border: "1px solid oklch(0.62 0.16 160 / 40%)",
                color: "oklch(0.72 0.14 162)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Try It Now — Upload Your Plant
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ── Diseases We Detect ────────────────────────────── */}
      <section id="diseases" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionLabel text="Disease Coverage" />
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">Diseases We <span className="text-gradient-mint">Detect</span></h2>
            <p className="text-base mt-4 max-w-lg mx-auto" style={{ color: "oklch(0.60 0.04 155)" }}>
              Our AI model is trained to identify 38 plant diseases across 14 commercial plant types
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diseaseCards.map((card, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <div
                  className="group relative rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl h-[300px] flex flex-col"
                  style={{
                    background: "oklch(0.16 0.03 155 / 60%)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Padded Image Container */}
                  <div className="flex-1 w-full p-4 relative z-0">
                    <div className="w-full h-full relative rounded-xl overflow-hidden">
                      <img
                        src={card.img}
                        alt={card.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Bottom Text Area (Normally visible, hidden on hover) */}
                  <div className="px-6 pb-6 pt-2 z-10 flex justify-between items-center group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-lg font-bold font-display text-white">{card.name}</h3>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold shadow-sm"
                      style={{
                        background: "oklch(0.20 0.05 160 / 90%)",
                        color: "oklch(0.85 0.14 162)",
                        border: "1px solid oklch(0.62 0.16 160 / 30%)",
                      }}
                    >
                      {card.diseases.length} {card.diseases.length === 1 ? "Class" : "Classes"}
                    </span>
                  </div>

                  {/* Hover Info Overlay */}
                  <div className="absolute inset-0 bg-background/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-6 overflow-y-auto z-20">
                    <h3 className="text-lg font-bold font-display text-foreground mb-4 border-b border-white/10 pb-2">{card.name} Diagnostics</h3>
                    <ul className="space-y-3">
                      {card.diseases.map((d, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm" style={{ color: "oklch(0.65 0.04 155)" }}>
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: card.color, boxShadow: `0 0 8px ${card.color}` }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Bottom CTA */}
          <FadeUp delay={0.4} className="mt-14 text-center">
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 rounded-2xl"
              style={{
                background: "oklch(0.62 0.16 160 / 8%)",
                border: "1px solid oklch(0.62 0.16 160 / 25%)",
              }}
            >
              <div className="text-center sm:text-left">
                <p className="text-base font-bold font-display text-foreground">Ready to diagnose your plants?</p>
                <p className="text-sm mt-0.5" style={{ color: "oklch(0.60 0.04 155)" }}>Upload an image and get instant results in seconds</p>
              </div>
              <button
                id="diseases-upload-btn"
                ref={bottomCtaRef}
                onClick={() => setModalOpen(true)}
                className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold font-display transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, oklch(0.62 0.16 160), oklch(0.50 0.14 160))",
                  color: "white",
                  boxShadow: "0 4px 20px oklch(0.50 0.14 160 / 35%)",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload Plant Image
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="relative z-10 py-10 px-6 text-center" style={{ borderTop: "1px solid oklch(1 0 0 / 6%)" }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.62 0.16 160 / 15%)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="oklch(0.72 0.14 162)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold font-display text-foreground">PlantCare AI</span>
        </div>
        <p className="text-xs" style={{ color: "oklch(0.45 0.04 155)" }}>Protecting crops with advanced AI · Powered by YOLO &amp; Real-ESRGAN</p>
      </footer>

      {/* ── Upload Modal ─────────────────────────────────── */}
      <UploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

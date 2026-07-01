"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, CheckCircle2 } from "lucide-react";

export default function CVDownload() {
  const [downloadCount, setDownloadCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/stats")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch stats");
      })
      .then((data) => {
        setDownloadCount(data.cv_downloads);
      })
      .catch((err) => {
        console.error("Error loading CV download count:", err);
      });
  }, []);

  const handleDownload = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/download", {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setDownloadCount(data.cv_downloads);
      }
    } catch (err) {
      console.error("Failed to register download in backend:", err);
    }

    const link = document.createElement("a");
    link.href = "/AJAY_SATHYESH_M_Resume.pdf";
    link.download = "AJAY_SATHYESH_M_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    window.open("/AJAY_SATHYESH_M_Resume.pdf", "_blank");
  };

  return (
    <section id="cv-download" className="relative py-24 px-6 bg-background/40 border-t border-card-border">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_40%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight mb-2">
            Curriculum Vitae
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-card-border bg-card-bg backdrop-blur-md p-8 sm:p-12 flex flex-col items-center shadow-xl hover:border-emerald-500/25 transition-all duration-300"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-6 relative group"
          >
            <FileText size={48} />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-background animate-ping" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-background" />
          </motion.div>

          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 tracking-wide">
            Download My Professional Resume
          </h3>
          
          <p className="text-text-muted text-sm sm:text-base max-w-md mb-8 leading-relaxed font-semibold">
            Get a detailed overview of my technical projects, software engineering experiences, academic background, and certifications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mb-8">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer border border-emerald-400/20"
            >
              <Download size={18} />
              DOWNLOAD CV
            </button>

            <button
              onClick={handleView}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card-bg border border-card-border hover:border-indigo-500/30 text-text-muted hover:text-foreground font-semibold shadow-md transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
            >
              <Eye size={18} />
              VIEW RESUME
            </button>
          </div>

          {downloadCount !== null && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-card-border bg-background/60 text-text-muted text-xs font-semibold tracking-wide">
              <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
              <span>Downloaded <strong className="text-foreground">{downloadCount}</strong> times by recruiters</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

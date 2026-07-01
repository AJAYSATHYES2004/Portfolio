"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Layers, CheckCircle2, ChevronRight } from "lucide-react";

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);

  const dashboardModules = [
    { title: "Inventory Overview", desc: "Real-time stock level tracking across all depots, highlighting excess and shortage items." },
    { title: "Demand Forecasting", desc: "Predictive ML models that forecast future product demands based on historical sales data." },
    { title: "Transfer Engine", desc: "Generates smart rebalancing suggestions to transfer stock between depots, minimizing logistics costs." },
    { title: "Approval Management", desc: "A streamlined manager workflow to review, edit, approve or reject recommended transfers." },
    { title: "Logistics Analytics", desc: "Visualizes supply chain paths, transit costs, and transit times for optimal routing." },
    { title: "AI Insights Dashboard", desc: "Generates automated summaries and anomalies reports using NLP and descriptive analytics." },
  ];

  const secondaryProjects = [
    {
      title: "Pondicherry University Result Automation Engine",
      desc: "Python automation platform for downloading, processing, organizing, and watermarking university result PDFs.",
      tech: ["Python", "Selenium", "PyPDF2", "Automation"],
      features: ["Auto PDF Download", "Result Processing", "Watermarking & Sorting"],
    },
    {
      title: "Realtime Face Recognition Attendance System",
      desc: "Real-time attendance management using Computer Vision and Deep Learning pipelines.",
      tech: ["Python", "OpenCV", "Deep Learning", "TensorFlow"],
      features: ["Face Detection", "Face Recognition", "Automated Logging"],
    },
    {
      title: "Multiple Disease Predictor",
      desc: "Healthcare prediction system supporting multiple chronic and neurological diseases.",
      tech: ["Python", "Scikit-Learn", "Streamlit", "Machine Learning"],
      features: ["Diabetes Prediction", "Heart Disease Prediction", "Parkinson's Prediction"],
    },
    {
      title: "Drowsiness Detection with Sentiment Analysis",
      desc: "Road safety system using Computer Vision for fatigue detection combined with speech/text sentiment analysis.",
      tech: ["Python", "OpenCV", "NLP", "Machine Learning"],
      features: ["Drowsiness Alerts", "Real-Time Tracking", "Sentiment Classification"],
    },
    {
      title: "Fertilizer Recommendation System",
      desc: "AI-powered agriculture recommendation platform optimizing soil health and crop yields.",
      tech: ["Python", "Scikit-Learn", "Machine Learning", "Pandas"],
      features: ["Soil Quality Analysis", "Crop Recommendation", "Yield Optimization"],
    },
    {
      title: "Personal Portfolio Website",
      desc: "Professional premium portfolio showcasing projects, experience, certifications, and achievements.",
      tech: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "FastAPI", "MySQL"],
      features: ["Responsive Design", "Interactive Canvas", "FastAPI Backend Connection"],
    },
  ];

  return (
    <section id="projects" className="relative py-24 px-6 bg-background/40 border-t border-card-border">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight mb-2">
            Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" />
        </div>

        {/* Featured Project Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-card-border bg-card-bg backdrop-blur-md overflow-hidden p-6 sm:p-10 mb-16 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 uppercase mb-4 inline-block">
                ★ FEATURED PROJECT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                AI-Powered Supply Chain Inventory Rebalancing &amp; Demand Intelligence
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2 max-w-md">
              {["React.js", "Vue.js", "FastAPI", "Python", "MySQL", "Machine Learning"].map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-background border border-card-border text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-text-muted font-bold mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-500 dark:text-emerald-400" />
                  Business Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Reduced excess inventory",
                    "Improved stock utilization",
                    "Minimized logistics costs",
                    "Enhanced demand planning",
                    "Increased supply chain efficiency",
                  ].map((impact, index) => (
                    <div key={index} className="flex items-center gap-2 text-text-muted text-sm font-semibold">
                      <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                      {impact}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wider text-text-muted font-bold mb-3 flex items-center gap-2">
                  <Layers size={16} className="text-indigo-500 dark:text-indigo-400" />
                  Key Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Demand Forecasting",
                    "Inventory Monitoring",
                    "Smart Transfer Recommendations",
                    "Logistics Optimization",
                    "Multi-Depot Management",
                    "Approval Workflow",
                    "Analytics Dashboard",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-text-muted text-sm font-semibold">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 border border-card-border rounded-2xl p-6 bg-background/50">
              <h4 className="text-sm uppercase tracking-wider text-text-muted font-bold mb-4">
                Dashboard Modules
              </h4>
              
              <div className="space-y-2 mb-4">
                {dashboardModules.map((mod, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      activeTab === index
                        ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-300"
                        : "bg-transparent border-transparent text-text-muted hover:bg-card-bg hover:text-foreground"
                    }`}
                  >
                    {mod.title}
                    <ChevronRight size={14} className={`transition-transform duration-300 ${activeTab === index ? "rotate-90 text-indigo-550 dark:text-indigo-400" : "text-text-muted"}`} />
                  </button>
                ))}
              </div>

              <div className="p-4 bg-background border border-card-border rounded-xl min-h-[90px]">
                <p className="text-text-muted text-sm font-semibold leading-relaxed">
                  {dashboardModules[activeTab].desc}
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Other Projects Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground tracking-wide mb-8">
            Other Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl border border-card-border bg-card-bg backdrop-blur-md p-6 flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/2 transition-all duration-300"
              >
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-background text-text-muted border border-card-border">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-base font-bold text-foreground mb-2 leading-snug tracking-wide group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h4>
                  
                  <p className="text-text-muted text-xs font-semibold leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                <div className="border-t border-card-border pt-4 mt-auto">
                  <span className="text-[10px] font-bold tracking-wider text-text-muted uppercase block mb-2">Features:</span>
                  <div className="space-y-1.5">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-text-muted font-semibold">
                        <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

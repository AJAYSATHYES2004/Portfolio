"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Zap, Globe, Database, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "AI Development",
      description: "Building intelligent systems that learn, reason, and adapt. Implementing state-of-the-art NLP, computer vision pipelines, and deep learning architectures to build smart automation.",
      icon: <Brain className="text-indigo-400" size={28} />,
      color: "from-indigo-500/10 to-indigo-500/5",
      borderColor: "group-hover:border-indigo-500/30",
      glowColor: "rgba(99, 102, 241, 0.15)",
      features: ["NLP & Sentiment Analysis", "Computer Vision & Face Recognition", "Neural Network Integration"],
    },
    {
      title: "Machine Learning",
      description: "Developing robust predictive models, clustering engines, and classification algorithms. Expert in data preprocessing, feature engineering, and rigorous validation methods.",
      icon: <Cpu className="text-emerald-400" size={28} />,
      color: "from-emerald-500/10 to-emerald-500/5",
      borderColor: "group-hover:border-emerald-500/30",
      glowColor: "rgba(16, 185, 129, 0.15)",
      features: ["Predictive Modeling", "Supervised & Unsupervised Learning", "Model Deployment & Evaluation"],
    },
    {
      title: "Python Automation",
      description: "Designing end-to-end automation workflows, web scrapers, and automated file handlers. Creating robust scripts to eliminate repetitive tasks and streamline operation cycles.",
      icon: <Zap className="text-amber-400" size={28} />,
      color: "from-amber-500/10 to-amber-500/5",
      borderColor: "group-hover:border-amber-500/30",
      glowColor: "rgba(245, 158, 11, 0.15)",
      features: ["Web Scraping & Selenium Scripts", "PDF/Excel Auto Processing", "Scheduled Workflows & APIs"],
    },
    {
      title: "Web Development",
      description: "Crafting highly responsive, premium user interfaces using React and Next.js, backed by secure, scalable, high-performance REST APIs powered by FastAPI.",
      icon: <Globe className="text-blue-400" size={28} />,
      color: "from-blue-500/10 to-blue-500/5",
      borderColor: "group-hover:border-blue-500/30",
      glowColor: "rgba(59, 130, 246, 0.15)",
      features: ["Responsive Next.js Frontends", "FastAPI Backend Architecture", "Responsive & Fluid Layouts"],
    },
    {
      title: "Data Analytics",
      description: "Extracting valuable business intelligence from complex databases. Designing efficient schemas, optimizing SQL queries, and parsing large data sets to drive strategic decisions.",
      icon: <Database className="text-purple-400" size={28} />,
      color: "from-purple-500/10 to-purple-500/5",
      borderColor: "group-hover:border-purple-500/30",
      glowColor: "rgba(168, 85, 247, 0.15)",
      features: ["Database Schema Design", "MySQL Query Optimization", "Insight Dashboards & Visualizations"],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  };

  return (
    <section id="services" className="relative py-24 px-6 bg-background border-t border-card-border overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight mb-2">
            My Services
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: `0 20px 40px -15px ${service.glowColor}`,
              }}
              className={`group relative rounded-3xl border border-card-border bg-card-bg backdrop-blur-md p-8 flex flex-col justify-between transition-all duration-300 ${service.borderColor} ${index === 4 && "md:col-span-2 lg:col-span-1"}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10`} />
              
              <div>
                <div className="p-4 rounded-2xl bg-background/80 border border-card-border w-fit mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500/20">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4 tracking-wide group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-text-muted text-sm font-semibold leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="border-t border-card-border pt-6 mt-auto">
                <ul className="space-y-3">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-text-muted">
                      <ArrowRight size={12} className="text-emerald-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

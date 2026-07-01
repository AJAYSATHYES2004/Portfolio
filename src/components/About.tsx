"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Cpu, Globe, Award, Sparkles } from "lucide-react";

export default function About() {
  const stats = [
    { icon: <GraduationCap className="text-indigo-600 dark:text-indigo-400" size={24} />, text: "MCA Student" },
    { icon: <Briefcase className="text-emerald-600 dark:text-emerald-400" size={24} />, text: "2+ Internships" },
    { icon: <Cpu className="text-purple-600 dark:text-purple-400" size={24} />, text: "7+ AI Projects" },
    { icon: <Globe className="text-blue-600 dark:text-blue-400" size={24} />, text: "Multiple Web Apps" },
    { icon: <Award className="text-amber-600 dark:text-amber-400" size={24} />, text: "National Workshops" },
    { icon: <Sparkles className="text-pink-600 dark:text-pink-400" size={24} />, text: "Open Source Enthusiast" },
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="about" className="relative py-24 px-6 bg-background/40 border-t border-card-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight mb-2">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground tracking-wide">
              Transforming Ideas into Intelligent Solutions
            </h3>
            
            <p className="text-text-muted leading-relaxed text-lg font-medium">
              Motivated and detail-oriented Computer Applications graduate with hands-on experience in Artificial Intelligence, Machine Learning, Data Analytics, Computer Vision, Automation, and Full Stack Development.
            </p>
            
            <p className="text-text-muted leading-relaxed text-lg font-medium">
              Currently pursuing my Master of Computer Applications while working as an Artificial Intelligence Intern, building intelligent enterprise solutions using Machine Learning, React.js, FastAPI, Python, and MySQL.
            </p>
            
            <p className="text-text-muted leading-relaxed text-lg font-medium">
              I enjoy solving real-world business problems through AI-powered applications and continuously exploring emerging technologies to deliver maximum impact.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-5 rounded-2xl border border-card-border bg-card-bg backdrop-blur-md flex flex-col items-center justify-center text-center group hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-background/60 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/20 group-hover:scale-110 transition-all duration-300 mb-4 border border-card-border group-hover:border-indigo-200 dark:group-hover:border-indigo-500/20">
                  {stat.icon}
                </div>
                <span className="text-foreground text-sm font-bold tracking-wide transition-colors">
                  {stat.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

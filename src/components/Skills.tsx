"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Layout, Server, Database, Wrench } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Artificial Intelligence",
      icon: <Cpu className="text-indigo-400" size={20} />,
      skills: ["Machine Learning", "Deep Learning", "Computer Vision", "Predictive Analytics", "NLP", "Data Mining"],
      color: "from-indigo-500/10 to-purple-500/5",
    },
    {
      title: "Programming",
      icon: <Terminal className="text-emerald-400" size={20} />,
      skills: ["Python", "JavaScript", "SQL"],
      color: "from-emerald-500/10 to-teal-500/5",
    },
    {
      title: "Frontend",
      icon: <Layout className="text-blue-400" size={20} />,
      skills: ["React.js", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"],
      color: "from-blue-500/10 to-cyan-500/5",
    },
    {
      title: "Backend",
      icon: <Server className="text-purple-400" size={20} />,
      skills: ["FastAPI", "REST APIs", "Authentication", "API Integration"],
      color: "from-purple-500/10 to-pink-500/5",
    },
    {
      title: "Database",
      icon: <Database className="text-amber-400" size={20} />,
      skills: ["MySQL", "Database Design", "Query Optimization"],
      color: "from-amber-500/10 to-yellow-500/5",
    },
    {
      title: "Tools & Libraries",
      icon: <Wrench className="text-rose-400" size={20} />,
      skills: ["Git", "GitHub", "Power BI", "Selenium", "OpenCV", "Streamlit"],
      color: "from-rose-500/10 to-red-500/5",
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
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <section id="skills" className="relative py-24 px-6 bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight mb-2">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl border border-card-border bg-card-bg backdrop-blur-md p-6 overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-background border border-card-border transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground tracking-wide">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    variants={chipVariants}
                    whileHover={{ scale: 1.03 }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide bg-background/80 border border-card-border text-foreground hover:border-indigo-500/50 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

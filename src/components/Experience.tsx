"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, ChevronDown, ChevronUp, Calendar, MapPin, Award } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      role: "Artificial Intelligence Intern",
      company: "Cavin Infotech Pvt. Ltd.",
      period: "Feb 2026 – Present",
      location: "Puducherry, India",
      responsibilities: [
        "Collaborating with project teams in planning, development, testing, and deployment of AI solutions.",
        "Developing Machine Learning models, handling data preprocessing, feature engineering, and model evaluation.",
        "Designing AI solutions, creating technical documentation, and performing data analytics.",
      ],
      achievement: "Developed enterprise-level AI-powered inventory optimization and demand intelligence systems for supply chain operations.",
      technologies: ["Machine Learning", "FastAPI", "React.js", "MySQL", "Python", "Data Analytics"],
    },
    {
      role: "Web Development Intern",
      company: "IgniteLabs Private Limited",
      period: "June 2025 – Jan 2026",
      location: "Puducherry, India",
      responsibilities: [
        "Built responsive web applications, developing both frontend user interfaces and backend API integrations.",
        "Participated in deployment and execution of real-time client projects.",
        "Identified UI/UX flaws and implemented performance and responsiveness improvements.",
      ],
      achievement: "Successfully delivered 3 production-ready client websites and integrated REST APIs.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Python", "REST APIs"],
    },
  ];

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Manakula Vinayagar Institute of Technology",
      period: "2025 – 2027",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Achariya Arts and Science College",
      period: "2022 – 2025",
    },
    {
      degree: "Higher Secondary Education",
      institution: "Jawahar Navodaya Vidyalaya",
      period: "2021 – 2022",
    },
  ];

  const leadership = [
    {
      role: "Student Welfare Secretary",
      organization: "Student Council",
      period: "2024 – 2025",
      desc: "Worked closely with council members to support student welfare initiatives and improve student engagement.",
    },
    {
      role: "Code Club Member",
      organization: "College Code Club",
      period: "2023 – 2025",
      desc: "Actively participated in coding competitions, workshops, and collaborative development projects.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-24 px-6 bg-background/40 border-t border-card-border">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.03),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight mb-2">
            Experience &amp; Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg border border-indigo-100 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground tracking-wide">Professional Experience</h3>
            </div>

            <div className="relative pl-6 border-l-2 border-card-border space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="relative animate-in fade-in duration-500">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-indigo-500 bg-background" />
                  
                  <div 
                    className={`rounded-2xl border transition-all duration-300 p-5 bg-card-bg backdrop-blur-md cursor-pointer ${
                      expandedIndex === index 
                        ? "border-indigo-500/40 shadow-lg shadow-indigo-500/5" 
                        : "border-card-border hover:border-indigo-500/30"
                    }`}
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-foreground tracking-wide hover:text-indigo-455 transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-indigo-500 dark:text-indigo-400 font-bold text-sm mt-1">{exp.company}</p>
                      </div>
                      
                      <button className="text-slate-500 hover:text-slate-350 transition-colors pt-1">
                        {expandedIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-text-muted text-xs mt-3 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1, transition: { duration: 0.3 } }}
                          exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
                          className="overflow-hidden mt-4 pt-4 border-t border-card-border space-y-4"
                        >
                          <ul className="list-disc list-inside space-y-2 text-text-muted text-sm leading-relaxed">
                            {exp.responsibilities.map((resp, rIndex) => (
                              <li key={rIndex} className="pl-1 text-text-muted font-medium">
                                <span className="relative -left-1">{resp}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-500/20 rounded-xl">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-[10px] tracking-wider block mb-1">KEY ACHIEVEMENT:</span>
                            <p className="text-foreground text-sm font-semibold">{exp.achievement}</p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.technologies.map((tech, tIndex) => (
                              <span key={tIndex} className="px-2.5 py-1 bg-background border border-card-border text-text-muted rounded-lg text-xs font-semibold">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg border border-emerald-100 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-wide">Education</h3>
              </div>

              <div className="relative pl-6 border-l-2 border-card-border space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-emerald-500 bg-background" />
                    
                    <div className="p-4 rounded-2xl border border-card-border bg-card-bg backdrop-blur-md hover:border-slate-700/50 transition-colors">
                      <span className="text-emerald-500 font-bold text-xs block mb-1">{edu.period}</span>
                      <h4 className="text-base font-bold text-foreground tracking-wide">{edu.degree}</h4>
                      <p className="text-text-muted text-sm font-medium mt-1">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/50 rounded-lg border border-purple-100 dark:border-purple-500/30 text-purple-600 dark:text-purple-400">
                  <Award size={20} />
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-wide">Leadership &amp; Clubs</h3>
              </div>

              <div className="relative pl-6 border-l-2 border-card-border space-y-6">
                {leadership.map((lead, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-purple-500 bg-background" />
                    
                    <div className="p-4 rounded-2xl border border-card-border bg-card-bg backdrop-blur-md hover:border-slate-700/50 transition-colors">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="text-base font-bold text-foreground tracking-wide">{lead.role}</h4>
                        <span className="text-purple-400 font-bold text-xs">{lead.period}</span>
                      </div>
                      <p className="text-text-muted text-xs font-bold mb-2">{lead.organization}</p>
                      <p className="text-text-muted text-sm font-medium leading-relaxed">{lead.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

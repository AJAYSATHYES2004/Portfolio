"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

// Custom SVG components for brand icons that are missing in this version of lucide-react
const GithubIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: <GithubIcon size={18} />, href: "https://github.com/AjaySathyesh", label: "GitHub", color: "hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]" },
    { icon: <LinkedinIcon size={18} />, href: "https://linkedin.com/in/ajaysathyesh", label: "LinkedIn", color: "hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]" },
    { icon: <Globe size={18} />, href: "#hero", label: "Portfolio", isScroll: true, color: "hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-card-bg/40 border-t border-card-border backdrop-blur-md pt-16 pb-8 px-6 overflow-hidden transition-colors duration-300"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35rem] h-[15rem] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto relative z-10 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 sm:gap-12">
          
          {/* Column 1: Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide text-foreground relative pb-2 inline-block">
              Contact Me
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500 rounded-full" />
            </h3>
            
            <div className="space-y-4 text-xs font-semibold text-text-muted">
              <a
                href="tel:+918190035108"
                className="flex items-center gap-3 group hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                <Phone size={16} className="text-indigo-500 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span>+91 8190035108</span>
              </a>

              <a
                href="mailto:kmajay2004@gmail.com"
                className="flex items-center gap-3 group hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                <Mail size={16} className="text-indigo-500 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="truncate">kmajay2004@gmail.com</span>
              </a>

              <div className="flex items-center gap-3 group">
                <MapPin size={16} className="text-indigo-500 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span>Puducherry, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide text-foreground relative pb-2 inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500 rounded-full" />
            </h3>
            
            <ul className="space-y-3.5 text-xs font-semibold text-text-muted">
              {[
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Experience", href: "#experience" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="relative pb-1 group transition-colors duration-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Projects */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide text-foreground relative pb-2 inline-block">
              Projects
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500 rounded-full" />
            </h3>
            
            <ul className="space-y-3.5 text-xs font-semibold text-text-muted">
              {[
                "Supply Chain AI System",
                "Disease Predictor",
                "Face Recognition",
                "Drowsiness Detection",
                "Fertilizer Recommendation",
              ].map((project) => (
                <li key={project}>
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick(e, "#projects")}
                    className="relative pb-1 group transition-colors duration-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    {project}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide text-foreground relative pb-2 inline-block">
              Services
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500 rounded-full" />
            </h3>
            
            <ul className="space-y-3.5 text-xs font-semibold text-text-muted">
              {[
                "AI Development",
                "Machine Learning",
                "Python Automation",
                "Web Development",
                "Data Analytics",
              ].map((service) => (
                <li key={service} className="cursor-default">
                  <span className="relative pb-1 group hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300">
                    {service}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-300" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Brand */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide text-foreground relative pb-2 inline-block">
              AJAY SATHYESH
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500 rounded-full" />
            </h3>
            
            <p className="text-xs font-semibold text-text-muted leading-relaxed">
              Building intelligent solutions with Artificial Intelligence, Machine Learning and Modern Web Technologies.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={social.isScroll ? (e) => handleLinkClick(e, social.href) : undefined}
                  target={social.isScroll ? undefined : "_blank"}
                  rel={social.isScroll ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className={`p-2.5 rounded-full border border-card-border bg-background/50 text-text-muted hover:border-indigo-500/30 transition-all duration-300 cursor-pointer ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Gradient divider line */}
      <div className="h-[1px] bg-gradient-to-r from-indigo-500/10 via-purple-500/25 to-emerald-500/10 max-w-7xl mx-auto my-8" />

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-semibold text-text-muted">
        {/* Privacy Policy & Terms */}
        <div className="flex items-center gap-6">
          <a
            href="#privacy"
            className="relative pb-1 group transition-colors duration-300 hover:text-indigo-500 dark:hover:text-indigo-400"
          >
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#terms"
            className="relative pb-1 group transition-colors duration-300 hover:text-indigo-500 dark:hover:text-indigo-400"
          >
            Terms &amp; Conditions
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* Copyright */}
        <motion.p
          whileHover={{ scale: 1.02 }}
          className="text-center transition-colors duration-300 hover:text-foreground cursor-default"
        >
          © 2026 AJAY SATHYESH M. All Rights Reserved
        </motion.p>

        {/* Credits */}
        <p className="cursor-default">
          Designed &amp; Developed by <span className="text-foreground font-bold hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300">Ajay Sathyesh</span>
        </p>
      </div>
    </motion.footer>
  );
}

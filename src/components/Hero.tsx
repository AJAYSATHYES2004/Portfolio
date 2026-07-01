"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, Mail, ArrowRight } from "lucide-react";

const ROLES = [
  "Python Developer",
  "Artificial Intelligence Engineer",
  "Machine Learning Developer",
  "Full Stack Developer",
  "Data Analytics Enthusiast",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const activeCanvas = canvas;
    const ctx = activeCanvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particlesArray: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 120 };

    const resizeCanvas = () => {
      activeCanvas.width = window.innerWidth;
      activeCanvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", resizeCanvas);
    activeCanvas.width = window.innerWidth;
    activeCanvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > activeCanvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > activeCanvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < activeCanvas.width - this.size * 10) {
              this.x += 1.5;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.x -= 1.5;
            }
            if (mouse.y < this.y && this.y < activeCanvas.height - this.size * 10) {
              this.y += 1.5;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.y -= 1.5;
            }
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = Math.floor((activeCanvas.width * activeCanvas.height) / 18000);
      const colors = ["rgba(99, 102, 241, 0.4)", "rgba(16, 185, 129, 0.4)", "rgba(168, 85, 247, 0.4)"];
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2.5 + 1;
        const x = Math.random() * (activeCanvas.width - size * 2) + size;
        const y = Math.random() * (activeCanvas.height - size * 2) + size;
        const directionX = (Math.random() * 0.3 - 0.15);
        const directionY = (Math.random() * 0.3 - 0.15);
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
      connectParticles();
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      if (!ctx) return;
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 110) {
            opacityValue = 1 - (distance / 110);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-500">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[100px] z-0" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--grid-line)_0.5px,transparent_0.5px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 z-0" />

      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-300 text-xs font-semibold tracking-wider mb-6 flex items-center gap-2 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AVAILABLE FOR INTERNSHIPS &amp; FULL-TIME ROLES
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]"
        >
          Hi, I am <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 font-black">AJAY SATHYESH M</span>
        </motion.h1>

        <div className="h-10 sm:h-12 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-2xl font-bold text-foreground tracking-wide border-r-2 border-indigo-500 px-3 py-0.5"
            >
              {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-text-muted text-base sm:text-lg max-w-2xl mb-12 leading-relaxed font-semibold"
        >
          Transforming Ideas into Intelligent Solutions with Artificial Intelligence, Machine Learning, and Modern Web Technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection("cv-download")}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer border border-indigo-400/20"
          >
            <Download size={18} />
            Download CV
          </button>
          
          <button
            onClick={() => scrollToSection("projects")}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-card-bg border border-card-border text-foreground hover:bg-card-bg/85 font-semibold shadow-md transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
          >
            <Eye size={18} />
            View Projects
          </button>
          
          <button
            onClick={() => scrollToSection("contact")}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-600 dark:text-emerald-400 font-semibold shadow-md transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
          >
            <Mail size={18} />
            Contact Me
            <ArrowRight size={16} className="ml-1" />
          </button>
        </motion.div>
      </div>

      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 opacity-70 hover:opacity-100 transition-opacity" 
        onClick={() => scrollToSection("about")}
      >
        <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-card-border flex justify-center p-1"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
        </motion.div>
      </div>
    </section>
  );
}

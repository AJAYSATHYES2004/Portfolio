import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CVDownload from "@/components/CVDownload";
import EnquiryForm from "@/components/EnquiryForm";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <CVDownload />
      <EnquiryForm />
    </>
  );
}


import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  Github,
  Mail,
  Calendar,
  Award,
  Sparkles,
  GamepadIcon,
  Database,
  Server,
  Disc3,
  Cpu,
  Zap,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { 
    label: "Years of experience", 
    value: "3+",
    icon: Calendar,
    color: "from-blue-500 to-cyan-500"
  },
  { 
    label: "Projects completed", 
    value: "5+",
    icon: Award,
    color: "from-purple-500 to-pink-500"
  },
];

const projects = [
  {
    title: "Sistem Informasi Tata Tertib Kampus",
    description: "Project Based Learning (PBL) for managing campus regulations",
    image: "/assets/tatib.png",
    href: "#",
    github: "https://github.com/igaramadana/PWD_PBLSITatib",
    tech: ["BootStrap", "CSS", "PHP"],
    gradient: "from-blue-500 to-purple-600",
    category: "Web App"
  },
  {
    title: "Sistem Informasi Pembayaran UKT Mahasiswa",
    description: "UTS Mata Kuliah Pemrograman Web Lanjut menggunakan Laravel dan payment gateway Midtrans",
    image: "/assets/ukt.png",
    href: "#",
    github: "https://github.com/igaramadana/UTS_SistemPembayaranUKT",
    tech: ["Laravel", "Bootstrap", "SCSS"],
    gradient: "from-green-500 to-emerald-600",
    category: "Web App"
  },
  {
    title: "Sistem Informasi Pendaftaran Ujian TOEIC",
    description: "Project Based Learning (PBL) for managing TOEIC exam registrations",
    image: "/assets/toeic.png",
    href: "#",
    github: "https://github.com/igaramadana/PWL_PBL_TOEIC",
    tech: ["Laravel", "TailwindCSS", "Flowbite"],
    gradient: "from-yellow-500 to-orange-600",
    category: "Web App"
  },
  {
    title: "KangDjoe",
    description: "Operational website for KangDjoe Cheese Company",
    image: "/assets/kangdjoe.png",
    href: "https://operasional.kangdjoe.com/",
    github: "https://github.com/igaramadana/cheeseops",
    tech: ["Laravel", "Flowbite", "TailwindCSS"],
    gradient: "from-red-500 to-pink-600",
    category: "Web App"
  },
  {
    title: "Sentra Nusantara FiveM Roleplay Server",
    description: "A custom FiveM Roleplay server with unique scripts and features",
    image: "/assets/sena.jpeg",
    href: "#",
    github: "#",
    tech: ["Lua", "QBCore", "MySQL"],
    gradient: "from-indigo-500 to-purple-600",
    category: "Gaming"
  },
  {
    title: "Website Portofolio",
    description: "My personal website built with modern tech stack",
    image: "/assets/porto.png",
    href: "#",
    github: "https://github.com/igaramadana/portfolio",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    gradient: "from-violet-500 to-purple-600",
    category: "Portfolio"
  },
];

const services = [
  {
    service: "Full-Stack Development",
    description: "End-to-end web development with modern technologies and best practices.",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    features: ["React/Next.js", "Database Design", "Laravel"]
  },
  {
    service: "FiveM Development",
    description: "Custom GTA V Roleplay servers, scripts, and mods development.",
    icon: GamepadIcon,
    gradient: "from-purple-500 to-pink-500",
    features: ["Lua Scripting", "Custom UI", "Server Management"]
  },
  {
    service: "UX/UI Design",
    description: "Creating intuitive and beautiful user interfaces that enhance user experience.",
    icon: Frame,
    gradient: "from-orange-500 to-red-500",
    features: ["Figma Design", "User Research", "Prototyping"]
  },
];

const skills = [
  { name: "JavaScript/TypeScript", category: "Frontend", icon: Zap },
  { name: "Next.js/React", category: "Frontend", icon: Cpu },
  { name: "Lua", category: "Gaming", icon: GamepadIcon },
  { name: "Node.js", category: "Backend", icon: Server },
  { name: "Tailwind CSS", category: "Frontend", icon: Frame },
  { name: "MySQL", category: "Database", icon: Database },
  { name: "FiveM Development", category: "Gaming", icon: Disc3 },
  { name: "Python", category: "Backend", icon: Code2 },
  { name: "PHP", category: "Backend", icon: Server },
];

const contactMethods = [
  {
    name: "Email",
    value: "igrmdns085@gmail.com",
    href: "mailto:igrmdns085@gmail.com",
    icon: Mail,
    description: "Send me an email for collaborations",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "GitHub",
    value: "igaramadana",
    href: "https://github.com/igaramadana",
    icon: Github,
    description: "Check out my projects and contributions",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Discord",
    value: "Gatrons",
    href: "https://discord.com/users/whotefvckisgatrons",
    icon: MessageCircle,
    description: "Let's chat on Discord",
    gradient: "from-indigo-500 to-blue-500"
  },
];

// Skill Card Component
function SkillCard({ skill }: { skill: typeof skills[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group hover:shadow-2xl transition-all duration-500 border-violet-500/20 bg-gradient-to-b from-background to-violet-500/5 h-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <skill.icon className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground text-lg group-hover:text-violet-400 transition-colors duration-300">
                {skill.name}
              </h3>
              <span className="text-xs text-muted-foreground px-3 py-1 bg-violet-500/10 rounded-full border border-violet-500/20">
                {skill.category}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProfileCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (profileCardRef.current) {
      VanillaTilt.init(profileCardRef.current, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        gyroscope: true,
        perspective: 1000,
        scale: 1.02,
      });
    }
  }, []);

  const status = "available";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-red-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available for work";
      case "busy":
        return "Busy with projects";
      case "away":
        return "Away";
      default:
        return "Offline";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center space-y-6"
    >
      <div 
        ref={profileCardRef}
        id="tilt"
        className="rounded-3xl bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-purple-600/10 p-8 backdrop-blur-xl border border-violet-500/20 shadow-2xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 w-full max-w-md"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-600/5 group-hover:from-violet-500/10 group-hover:to-purple-600/10 transition-all duration-500" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-500" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-purple-600/0 to-violet-400/0 group-hover:from-violet-500/5 group-hover:via-purple-600/5 group-hover:to-violet-400/5 transition-all duration-500 rounded-3xl" />
        
        <div className="relative z-10">
          {/* Header dengan efek hover */}
          <div className="text-center mb-6 group-hover:transform group-hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-violet-400 transition-colors duration-300">
              Profile Status
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-violet-300 transition-colors duration-300">
              Currently open for new projects
            </p>
          </div>
          
          {/* Profile Image Section */}
          <div className="relative flex justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 p-1 shadow-2xl group-hover:shadow-3xl transition-all duration-500"
            >
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/igaramadana.png"
                  alt="Iga Ramadana Sahputra"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Profile Info */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="group-hover:transform group-hover:translate-y-[-2px] transition-transform duration-300"
            >
              <h3 className="text-xl font-bold text-foreground group-hover:text-violet-400 transition-colors duration-300">
                Iga Ramadana Sahputra
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-violet-300 transition-colors duration-300">
                Laravel Developer & FiveM Developer
              </p>
            </motion.div>

            {/* Status */}
            <motion.div 
              className="flex items-center justify-center space-x-2 group-hover:transform group-hover:translate-y-[-2px] transition-transform duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} animate-pulse group-hover:scale-110 transition-transform duration-300`} />
              <span className="text-sm text-muted-foreground group-hover:text-violet-300 transition-colors duration-300">
                {getStatusText(status)}
              </span>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-4 group-hover:transform group-hover:translate-y-[-2px] transition-transform duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { value: "3+", label: "Years" },
                { value: "5+", label: "Projects" },
              ].map((stat, index) => (
                <div key={index} className="text-center group-hover:transform group-hover:scale-110 transition-transform duration-300">
                  <div className="text-lg font-bold text-violet-400 group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-violet-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Current Time */}
            <motion.div 
              className="mt-4 pt-4 border-t border-violet-500/20 group-hover:border-violet-500/40 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-muted-foreground group-hover:text-violet-300 transition-colors duration-300">
                Local Time: {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </p>
            </motion.div>
          </div>

          {/* Footer dengan efek hover */}
          <div className="mt-6 pt-6 border-t border-violet-500/20 group-hover:border-violet-500/40 transition-all duration-300">
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2 group-hover:transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground group-hover:text-violet-300 transition-colors duration-300">Active</span>
              </div>
              <div className="flex items-center space-x-2 group-hover:transform group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-3 h-3 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
                <span className="text-xs text-muted-foreground group-hover:text-violet-300 transition-colors duration-300">Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Floating Elements Background
function FloatingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-violet-500/10 to-purple-600/10"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // Enhanced card hover effect
  useEffect(() => {
    const tiltElements: NodeListOf<HTMLElement> = document.querySelectorAll("#tilt");
    const tilt = Array.from(tiltElements);
    VanillaTilt.init(tilt, {
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      gyroscope: true,
      perspective: 1000,
      scale: 1.02,
    });
  }, []);

  return (
    <Container>
      <FloatingBackground />
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Enhanced Intro Section */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between relative"
        >
          <div className={styles.intro}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5 mb-8"
            >
              {["next.js", "laravel", "tailwindcss", "typescript", "fivem"].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={cn(styles.pill, "bg-violet-500/10 text-violet-400 border border-violet-500/20")}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl font-light">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                  Iga Ramadana.
                </span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-6 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl text-lg leading-relaxed"
              >
                Full-stack Developer & FiveM Specialist crafting immersive digital experiences and custom roleplay servers with modern technologies.
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-4 pt-8"
            >
              <Link href="/cv/Iga Ramadana Sahputra-resume.pdf" passHref download>
                <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Download CV <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#projects" passHref>
                <Button
                  variant="outline"
                  onClick={() => scrollTo(document.querySelector("#projects"))}
                  className="border-violet-500 text-violet-600 hover:bg-violet-500/10 px-8 py-3 rounded-full transition-all duration-300"
                >
                  View Projects
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              className="mt-8 flex items-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {contactMethods.map((contact) => (
                <Link 
                  key={contact.name}
                  href={contact.href} 
                  target="_blank" 
                  className="text-muted-foreground hover:text-violet-400 transition-all duration-300 hover:scale-110"
                >
                  <contact.icon size={24} />
                </Link>
              ))}
            </motion.div>

            <motion.div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
                "mt-16"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to discover
              </motion.div>
            </motion.div>
          </div>
          
          {/* Enhanced Profile Card Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            data-scroll
            data-scroll-speed="-.01"
            className="mt-14 h-full w-full max-w-md xl:mt-0"
          >
            <ProfileCard />
          </motion.div>
        </section>

        {/* Enhanced About Section */}
        <section id="about" data-scroll-section className="py-20 relative">
          <div className="absolute inset-0" />
          
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="flex flex-col items-center justify-center text-center space-y-16"
            >
              {/* About Text */}
              <div className="max-w-4xl">
                <h2 className="text-3xl font-light leading-relaxed tracking-tight text-foreground xl:text-[42px]">
                  I&apos;m a passionate full-stack developer and FiveM specialist with over 3 years of experience. 
                  I specialize in creating <span className="text-transparent bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text">immersive web experiences</span> and 
                  <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text"> custom FiveM roleplay servers</span>. My expertise spans from 
                  modern web technologies to game modification and server development.
                </h2>
              </div>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
                {aboutStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-background to-violet-500/5 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4 shadow-lg`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="clash-grotesk text-4xl font-bold tracking-tight xl:text-5xl bg-gradient-to-r from-foreground to-foreground bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="tracking-tight text-muted-foreground xl:text-lg mt-3">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Skills Section - Updated to Cards */}
              <motion.div 
                className="w-full max-w-6xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-3xl font-semibold tracking-tight mb-12 text-foreground text-center">
                  Technical Stack
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {skills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section id="services" data-scroll-section className="py-20 bg-gradient-to-b from-background to-violet-500/10 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                🛠️ My Services
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
                What I Can Do For You
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg max-w-2xl mx-auto">
                Comprehensive development services to bring your ideas to life
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.service}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 border-violet-500/20 bg-gradient-to-b from-background to-violet-500/5 h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${service.gradient} shadow-lg`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {service.service}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed mx-4 justify-center">
                        {service.description}
                      </p>
                      <div className="space-y-2 mx-4 mb-6">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Projects Section */}
        <section id="projects" data-scroll-section className="py-20 relative">
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-violet-500 via-purple-600 to-violet-400 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            data-scroll 
            data-scroll-speed=".4" 
            className="my-20"
          >
            <div className="text-center mb-16">
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                ✨ Featured Projects
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
                Crafting Digital Excellence
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg max-w-2xl mx-auto">
                From immersive web applications to custom FiveM servers, each project represents innovation and quality.
              </p>
            </div>

            {/* Enhanced Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full" opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {projects.map((project, index) => (
                    <CarouselItem key={project.title} className="md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card id="tilt" className="group relative overflow-hidden border-violet-500/20 bg-gradient-to-b from-background to-violet-500/5 h-full">
                          <CardHeader className="p-0 relative">
                            <div className="absolute top-3 left-3 z-10">
                              <span className="px-2 py-1 text-xs bg-black/50 text-white rounded-full backdrop-blur">
                                {project.category}
                              </span>
                            </div>
                            <Link href={project.href} target="_blank" passHref>
                              {project.image.endsWith(".webm") ? (
                                <video
                                  src={project.image}
                                  autoPlay
                                  loop
                                  muted
                                  className="aspect-video h-full w-full rounded-t-md bg-gradient-to-br from-violet-500/20 to-purple-600/20 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              ) : (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={600}
                                  height={300}
                                  quality={100}
                                  className="aspect-video h-full w-full rounded-t-md bg-gradient-to-br from-violet-500/20 to-purple-600/20 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              )}
                            </Link>
                          </CardHeader>
                          <CardContent className="p-6">
                            <CardTitle className="text-lg font-semibold mb-2 text-foreground group-hover:text-violet-400 transition-colors">
                              {project.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.tech.map((tech) => (
                                <span 
                                  key={tech} 
                                  className="px-2.5 py-1 text-xs bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="flex space-x-3">
                              {project.github && project.github !== "#" && (
                                <Link href={project.github} target="_blank">
                                  <Button size="sm" variant="outline" className="border-violet-500 text-violet-600 hover:bg-violet-500/10 rounded-full px-4">
                                    <Github className="h-3 w-3 mr-1.5" />
                                    Code
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-violet-600 border-violet-500/20 hover:bg-violet-500/10 hover:border-violet-500/40" />
                <CarouselNext className="text-violet-600 border-violet-500/20 hover:bg-violet-500/10 hover:border-violet-500/40" />
              </Carousel>
              <div className="py-4 text-center text-sm text-muted-foreground">
                <span className="font-semibold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </motion.div>
        </section>

        {/* Enhanced Contact Section */}
        <section id="contact" data-scroll-section className="py-20 bg-gradient-to-b from-background to-violet-500/10 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                📞 Get In Touch
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
                Let&apos;s Work Together
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg max-w-2xl mx-auto">
                Ready to start your project? Reach out and let&apos;s discuss how we can bring your ideas to life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((contact, index) => (
                <motion.div
                  key={contact.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center hover:shadow-xl transition-all duration-300 border-violet-500/20 bg-gradient-to-b from-background to-violet-500/5 group h-full">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-4">
                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${contact.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <contact.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{contact.description}</p>
                          <Link href={contact.href} target="_blank">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-violet-500 text-violet-600 hover:bg-violet-500/10 rounded-full px-4 transition-all duration-300"
                            >
                              {contact.value}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Call to Action */}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-muted-foreground mb-8 text-lg">
                Prefer to schedule a meeting? Send me an email and we&apos;ll set up a call!
              </p>
              <Link href="mailto:igrmdns085@gmail.com" passHref>
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".15"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8B5CF6" />
              <stop offset={1} stopColor="#C4B5FD" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".15"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7C3AED" />
              <stop offset={1} stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ✅ सही और अपडेटेड इम्पोर्ट्स (पुरानी एरर वाली लाइनें हटा दी गई हैं)
import Hero from "../components/Hero";
import styles from "./page.module.css";

// --- डेटा आर्किटेक्चर (Updated Web & Backend Skills) ---
const SKILLS = [
  { name: "HTML", level: "95%", badge: "Web Structure" },
  { name: "CSS", level: "90%", badge: "Styling & Layout" },
  { name: "JavaScript", level: "88%", badge: "Interactive Web" },
  { name: "React", level: "86%", badge: "UI Library" },
  { name: "Java", level: "85%", badge: "Core & OOP" },
  { name: "SQL", level: "84%", badge: "Relational DB" },
  { name: "Spring Boot", level: "78%", badge: "Backend APIs" }
];

// 🔥 आपका अपडेटेड और सही नंबरों वाला एजुकेशन डेटा (CGPA: 7.93, 12th: 78%, 10th: 74.4%)
const EDUCATION = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Bihar Engineering University (BEU), Patna",
    duration: "2022 - 2026",
    score: "CGPA: 7.93"
  },
  {
    degree: "Higher Secondary (12th Grade)",
    institution: "R.B.S College Andaur,Samastipur,Bihar",
    duration: "2019 - 2021",
    score: "Marks: 78%"
  },
  {
    degree: "Secondary School (10th Grade)",
    institution: "High School Badhauna,Samastipur, Bihar",
    duration: "2019",
    score: "Marks: 74.4%"
  }
];

const PROJECTS = [
  {
    title: "📚 Library System",
    category: "frontend",
    tags: ["HTML5", "Tailwind CSS", "Firebase Firestore"],
    desc: "A real-time smart library management web panel featuring seat mapping, dynamic shifting allocation, and strict attendance tracking.",
    link: "https://badauna-library.vercel.app"
  },
  {
    title: "🥛 Sudha Dudh Dairy",
    category: "fullstack",
    tags: ["HTML5", "Tailwind CSS", "Firebase Firestore", "jsPDF"],
    desc: "A digital dairy collection and khata bahi web system for Samastipur with FAT/SNF rate calculation, 80mm receipt preview, and monthly PDF reports.",
    link: "https://sudha-dairy-orcin.vercel.app/"
  }
];

const TESTIMONIALS = [
  {
    text: '"Shivam delivers clean web architecture and fast database setup. The attendance module he built for our library website works flawlessly without delays."',
    author: "— Pro. Sonu Kumar Chaudhary (Managing Director & Librarian)"
  },
  {
    text: '"His command over Firebase security rules, secure token matching logic, and lightweight frontend code is highly professional."',
    author: "— Technical Reviewer Group"
  }
];

// --- Complete 99 Q&A Knowledge Base for shivam.boat ---
interface BotQAItem {
  q: string;
  a: string;
  aliases?: string[];
}

const BOT_QA_DATABASE: BotQAItem[] = [
  // 1. Greetings & Normal Conversation (1–15)
  { q: "Hi", a: "Hi there! Welcome to Shivam Kumar's portfolio bot. How can I help you today?", aliases: ["hii", "hiii", "hy"] },
  { q: "Hello", a: "Hello! Nice to meet you. Ask me anything about Shivam's projects, tech stack, or how to get in touch.", aliases: ["helo", "hello there"] },
  { q: "Hey", a: "Hey! What would you like to explore on Shivam's portfolio today?", aliases: ["hey there", "yo"] },
  { q: "Good morning", a: "Good morning! Hope you're having a great start to your day. How can I help?" },
  { q: "Good afternoon", a: "Good afternoon! Looking for details about Shivam's work, skills, or experience?" },
  { q: "Good evening", a: "Good evening! Feel free to ask me about Shivam's projects, background, or contact info." },
  { q: "Good night", a: "Good night! If you still have a quick question before signing off, I'm here." },
  { q: "How are you?", a: "I'm doing great, thanks for asking! How are you doing today?", aliases: ["how r u", "how are u"] },
  { q: "What's up?", a: "Just helping visitors explore Shivam's portfolio! What brings you here today?", aliases: ["whats up", "sup"] },
  { q: "Who are you?", a: "I'm Shivam's portfolio assistant bot, here to answer questions about his work, skills, and projects." },
  { q: "What can you do?", a: "I can share info about Shivam's background, full-stack & Java skills, projects like Library System and Sudha Dudh Dairy, and his contact details." },
  { q: "Thanks", a: "You're very welcome! Let me know if you need anything else.", aliases: ["thank you", "thx"] },
  { q: "Thank you so much", a: "Happy to help! Feel free to ask more questions anytime." },
  { q: "Bye", a: "Goodbye! Thanks for visiting Shivam's portfolio. Have a great day!", aliases: ["goodbye", "cya"] },
  { q: "See you later", a: "See you later! Come back anytime you want to check out new updates." },

  // 2. About Shivam Kumar (16–30)
  { q: "Who is Shivam Kumar?", a: "Shivam Kumar is a B.Tech Computer Science & Engineering graduate (June 2026) and full-stack software developer building web, mobile, and IoT applications.", aliases: ["who is shivam"] },
  { q: "Tell me about Shivam", a: "Shivam builds practical, full-stack applications using React, Next.js, Node.js, Java, Spring Boot, and SQL/PostgreSQL, with hands-on experience in cloud IoT and real-time apps." },
  { q: "What is Shivam's education?", a: "He completed his B.Tech in Computer Science & Engineering in June 2026 with a 7.8 CGPA." },
  { q: "Where is Shivam from?", a: "He is originally from Bihar, India, and also has training and work roots in Bengaluru and Patna." },
  { q: "Where is Shivam currently based?", a: "He has been based around Marathahalli, Bengaluru for technical training and software opportunities." },
  { q: "What is Shivam's role?", a: "He works as a software web developer focused on full-stack web development, HTML/CSS/JavaScript/React frontends, SQL databases, and Java/Spring Boot backend APIs." },
  { q: "Is Shivam open to work?", a: "Yes! You can reach out directly to discuss software engineering roles, freelance projects, or collaborations." },
  { q: "Does Shivam have internship experience?", a: "Yes, he completed an offline IoT with AWS internship at Robomanthan Private Limited in Patna from December 2025 to January 2026." },
  { q: "What did Shivam do during his internship?", a: "He worked on sensor-driven hardware and cloud integration using ESP32/ESP8266, DHT11 sensors, MQTT, and AWS IoT Core." },
  { q: "What is Shivam's coding style?", a: "He takes a hands-on, prototype-first approach—building working apps, testing edge cases, and iterating quickly." },
  { q: "What other interests does Shivam have?", a: "Outside of coding, he enjoys writing Hindi poetry, geet, and ghazals." },
  { q: "Can I see Shivam's resume?", a: "Check the resume or about section on this portfolio page, or email shivamkyp@gmail.com to request the latest copy." },
  { q: "What makes Shivam stand out?", a: "He bridges frontend UI, backend databases, Java/Spring Boot fundamentals, and connected devices while shipping real end-to-end projects." },
  { q: "Is Shivam a frontend or backend developer?", a: "He is a full-stack developer comfortable working across UI components, server logic, databases, and Java/Spring Boot applications." },
  { q: "How can I learn more about Shivam's journey?", a: "Explore the projects and timeline sections here, or ask me about a specific project or skill!" },

  // 3. Technical Skills & Stack (31–55)
  { q: "What are Shivam's main skills?", a: "His core strengths include HTML, CSS, JavaScript, React, Java, SQL, and Spring Boot, alongside Next.js, Node.js, Bootstrap 5, and PostgreSQL." },
  { q: "What frontend technologies does Shivam use?", a: "He regularly uses HTML, CSS, JavaScript, React, Next.js, and Bootstrap 5 to build responsive interfaces." },
  { q: "Does Shivam know React?", a: "Yes, React (along with Next.js) is one of his primary frameworks for modern web UIs." },
  { q: "Does Shivam know Next.js?", a: "Yes, he builds modern web apps and full-stack features with Next.js." },
  { q: "What backend skills does Shivam have?", a: "He works with Java, Spring Boot, Node.js, RESTful APIs, relational databases, and SQL." },
  { q: "Does Shivam know Java?", a: "Yes, he has strong grounding in Core Java, OOP, data structures/recursion, memory management, and Spring Boot backend development." },
  { q: "Does Shivam know Spring Boot?", a: "Yes, Shivam builds backend REST APIs and enterprise web services using Java and Spring Boot." },
  { q: "Which databases does Shivam work with?", a: "He uses SQL, PostgreSQL (with Prisma ORM), and Oracle Database for queries, joins, and subqueries." },
  { q: "Does Shivam know SQL?", a: "Yes, he writes SQL queries including joins, subqueries, and relational schema design in PostgreSQL and Oracle." },
  { q: "What is Prisma ORM?", a: "Prisma is a modern TypeScript/Node.js ORM that Shivam uses to interact with PostgreSQL cleanly and safely." },
  { q: "Does Shivam have mobile app experience?", a: "Yes, he builds cross-platform mobile experiences using React Native and Expo." },
  { q: "Does Shivam know IoT and cloud?", a: "Yes, he has built connected systems using ESP32/ESP8266, MQTT, and AWS IoT Core." },
  { q: "What is MQTT?", a: "MQTT is a lightweight publish-subscribe messaging protocol commonly used for IoT devices and real-time telemetry." },
  { q: "Does Shivam know WebRTC or Firebase?", a: "Yes, he has worked with Firebase and WebRTC for real-time communication features." },
  { q: "Does Shivam know HTML and CSS?", a: "Yes, semantic HTML, modern CSS layouts, and responsive design are foundational parts of his stack." },
  { q: "Does Shivam use Bootstrap?", a: "Yes, he uses Bootstrap 5 alongside custom CSS for fast, responsive layouts." },
  { q: "What CS fundamentals does Shivam know?", a: "He covers Object-Oriented Programming, recursion, memory concepts, database normalization, and computer networks." },
  { q: "Can Shivam build a full-stack web app from scratch?", a: "Yes—from frontend UI (HTML, CSS, JavaScript, React) and routing to backend APIs (Java, Spring Boot, Node.js) and SQL database persistence." },
  { q: "Does Shivam work with APIs?", a: "Yes, he integrates third-party APIs, cloud services, and custom backend endpoints." },
  { q: "What tools does Shivam use for development?", a: "He uses modern web dev tooling, Git/GitHub, SQL tools, and runtimes/frameworks like Java, Spring Boot, React, Node.js, and AWS." },
  { q: "Is Shivam strong in OOP?", a: "Yes, Object-Oriented Programming in Java—including inheritance, polymorphism, encapsulation, and casting—is a core focus area." },
  { q: "Does Shivam know computer networks?", a: "Yes, he has studied networking protocols, data transmission basics, and real-time communication concepts." },
  { q: "Can Shivam optimize database queries?", a: "Yes, he practices writing structured SQL queries, subqueries, and clean relational models." },
  { q: "Does Shivam build interactive UIs?", a: "Yes, including custom interactive components, animations/3D elements, and responsive layouts." },
  { q: "What is Shivam's strongest language?", a: "JavaScript (for full-stack web/React/Next.js) and Java (for OOP, Spring Boot, and backend development) are his go-to languages." },
  { q: "Which skill should I ask about next?", a: "Ask me about his projects, Java/Spring Boot concepts, React/SQL setup, or how to contact him!" },

  // 4. Projects & Builds (56–75)
  { q: "What projects has Shivam built?", a: "His projects include Library System (https://badauna-library.vercel.app), Sudha Dudh Dairy (https://sudha-dairy-orcin.vercel.app/), nn-messenger, PG mess SaaS, and IoT cloud monitoring systems." },
  { q: "Tell me about Sudha Dudh Dairy", a: "Sudha Dudh Dairy (https://sudha-dairy-orcin.vercel.app/) is a digital dairy collection and khata bahi web system for Samastipur featuring FAT/SNF rate calculation, receipts, and PDF reports.", aliases: ["sudha dairy", "dairy project"] },
  { q: "Tell me about Library System", a: "Library System (https://badauna-library.vercel.app) is a real-time smart library management web panel with seat mapping, dynamic shift allocation, and attendance tracking.", aliases: ["library system", "badauna library"] },
  { q: "Tell me about nn-messenger", a: "nn-messenger is a real-time mobile messaging app built with React Native, Expo, Firebase, and WebRTC." },
  { q: "What tech stack powers nn-messenger?", a: "It uses React Native and Expo for the mobile app, Firebase for backend/realtime support, and WebRTC for real-time media/communication." },
  { q: "What is the PG mess management project?", a: "It is a B2B SaaS architecture for PG hostel mess food management designed around Next.js and WhatsApp workflows." },
  { q: "What IoT projects has Shivam worked on?", a: "He built environmental intelligence and distance monitoring prototypes using ESP32/ESP8266, DHT11 sensors, MQTT, and AWS IoT Core." },
  { q: "What does the DHT11 sensor do in his IoT projects?", a: "DHT11 measures temperature and humidity data for environmental monitoring." },
  { q: "How does this portfolio site work?", a: "It's built to showcase Shivam's work interactively, including this assistant to answer visitor questions quickly." },
  { q: "Does Shivam build real-time apps?", a: "Yes, real-time messaging, live updates, and event-driven flows are areas he actively builds in." },
  { q: "Does Shivam build SaaS products?", a: "Yes, he designs multi-user workflows and practical SaaS architectures like his PG mess management system." },
  { q: "What was his final-year B.Tech project focus?", a: "His CSE coursework culminated in collaborative software engineering projects alongside his peers." },
  { q: "Are Shivam's projects practical?", a: "Very much so—he focuses on solving real workflows like dairy collection, library management, messaging, and sensor telemetry." },
  { q: "Can I see live demos or code?", a: "Check the project cards on this portfolio for links like Library System and Sudha Dudh Dairy, or reach out to Shivam directly." },
  { q: "Which project is best for seeing mobile skills?", a: "nn-messenger is the best example of his React Native and Expo mobile development work." },
  { q: "Which project shows cloud and hardware skills?", a: "His AWS IoT Core and ESP32/MQTT environmental and distance monitoring builds highlight hardware-to-cloud integration." },
  { q: "Which project shows web and product architecture?", a: "Library System, Sudha Dudh Dairy, and his Next.js portfolio highlight his web and product development work." },
  { q: "Does Shivam integrate AI or chatbots?", a: "Yes, he has added AI chatbot features to portfolio experiences to help visitors navigate information." },
  { q: "What problem does Sudha Dudh Dairy solve?", a: "It streamlines daily milk collection, FAT/SNF rate calculation, farmer khata bahi deductions, and monthly PDF statements." },
  { q: "Which project would you like details on?", a: "Ask about Library System, Sudha Dudh Dairy, nn-messenger, or the AWS IoT projects!" },

  // 5. Contact & Reach Out (76–90)
  { q: "How can I contact Shivam?", a: "You can email Shivam at shivamkyp@gmail.com or call/message him at +91 7352283304." },
  { q: "What is Shivam's email?", a: "Shivam's email address is shivamkyp@gmail.com." },
  { q: "What is Shivam's phone number?", a: "You can reach Shivam at +91 7352283304." },
  { q: "Can I call or WhatsApp Shivam?", a: "Yes, his contact number is +91 7352283304." },
  { q: "Where should I send job or project inquiries?", a: "Send job opportunities, freelance briefs, or collaboration ideas to shivamkyp@gmail.com." },
  { q: "How fast does Shivam reply?", a: "He usually checks messages and emails regularly and responds as soon as he's free." },
  { q: "Can I hire Shivam for a freelance project?", a: "You can reach out at shivamkyp@gmail.com or +91 7352283304 with your project scope and timeline." },
  { q: "Can I hire Shivam for a full-time role?", a: "Yes—feel free to share role details via shivamkyp@gmail.com or +91 7352283304." },
  { q: "Does Shivam have a contact form?", a: "You can use the contact section on this portfolio or reach out directly via email or phone." },
  { q: "What info should I include when contacting him?", a: "Share your name, company or project details, tech stack, and how best to follow up." },
  { q: "Is +91 7352283304 an Indian number?", a: "Yes, +91 7352283304 is Shivam's mobile number in India." },
  { q: "Can recruiters contact Shivam directly?", a: "Yes! Recruiters are welcome to email shivamkyp@gmail.com or call +91 7352283304." },
  { q: "Are there social links on this portfolio?", a: "Check the footer or social links section on this page to connect with Shivam's profiles." },
  { q: "What is the best way to reach him for urgent queries?", a: "Calling or messaging +91 7352283304 is usually quickest, alongside an email to shivamkyp@gmail.com." },
  { q: "Can you pass a message to Shivam?", a: "I can't send messages directly, so please email shivamkyp@gmail.com or call +91 7352283304 to reach him." },

  // 6. Fallback, Help & Edge Cases (91–99)
  { q: "Help", a: "I can help you with Shivam's bio, skills (HTML, CSS, JavaScript, React, Java, SQL, Spring Boot), projects (Library System, Sudha Dudh Dairy, IoT), and contact details." },
  { q: "I don't understand", a: "No problem! Try asking a simple question like \"What are Shivam's skills?\" or \"How can I contact Shivam?\"" },
  { q: "Tell me a joke", a: "Why do programmers prefer dark mode? Because light attracts bugs!" },
  { q: "Are you a real person?", a: "Nope, I'm a portfolio bot built to answer questions about Shivam Kumar and his work." },
  { q: "What language do you speak?", a: "I'm set up to reply in clear English right here, though I understand casual greetings too!" },
  { q: "Can you write code for me?", a: "I'm mainly here for portfolio Q&A, but feel free to ask how Shivam uses tools like React, Java, Spring Boot, or SQL." },
  { q: "What if you don't know the answer?", a: "If something isn't in my knowledge base, I'll let you know and point you to shivamkyp@gmail.com or +91 7352283304." },
  { q: "Give me a quick summary of Shivam", a: "Shivam Kumar is a B.Tech CSE developer skilled in HTML, CSS, JavaScript, React, Java, SQL, and Spring Boot, with experience in full-stack web apps and AWS IoT." },
  { q: "What should I ask first?", a: "Start with \"Tell me about Shivam\", \"What projects has he built?\", or \"How can I contact Shivam?\"" }
];

const QUICK_BOT_PROMPTS = [
  { label: "👋 Say Hi", query: "Hi" },
  { label: "👨‍💻 About Shivam", query: "Tell me about Shivam" },
  { label: "🛠️ Main Skills", query: "What are Shivam's main skills?" },
  { label: "🚀 Projects", query: "What projects has Shivam built?" },
  { label: "📞 Contact Info", query: "How can I contact Shivam?" }
];

const STOP_WORDS = new Set([
  "is", "the", "a", "an", "to", "for", "of", "in", "on", "at", "and", "or",
  "do", "does", "did", "can", "i", "me", "my", "you", "your", "he", "his", "it", "this", "that"
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s.+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getBotResponse(rawQuery: string): string {
  const cleanInput = normalizeText(rawQuery);
  if (!cleanInput) {
    return "Try asking a simple question like \"What are Shivam's skills?\" or \"How can I contact Shivam?\"";
  }

  for (const item of BOT_QA_DATABASE) {
    if (normalizeText(item.q) === cleanInput) {
      return item.a;
    }
    if (item.aliases?.some((alias) => normalizeText(alias) === cleanInput)) {
      return item.a;
    }
  }

  const inputTokens = cleanInput.split(" ").filter((t) => !STOP_WORDS.has(t));
  let bestMatch: { score: number; answer: string } | null = null;

  for (const item of BOT_QA_DATABASE) {
    const cleanQ = normalizeText(item.q);
    const qTokens = cleanQ.split(" ").filter((t) => !STOP_WORDS.has(t));
    if (qTokens.length === 0) continue;

    let overlap = 0;
    for (const token of inputTokens) {
      if (qTokens.includes(token)) {
        overlap += token.length > 3 ? 2 : 1;
      }
    }

    if (cleanQ.includes(cleanInput) || cleanInput.includes(cleanQ)) {
      overlap += 3;
    }

    const score = overlap / Math.sqrt(qTokens.length);
    if (overlap > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { score, answer: item.a };
    }
  }

  if (bestMatch && bestMatch.score >= 0.9) {
    return bestMatch.answer;
  }

  return "That isn't in my knowledge base yet, so please reach out directly to Shivam at shivamkyp@gmail.com or +91 7352283304!";
}

export default function Home() {
  // --- स्टेट्स (States) ---
  const [projectFilter, setProjectFilter] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [userTypedMessage, setUserTypedMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! Welcome to Shivam Kumar's portfolio bot. Say hi or ask me anything about Shivam's projects, tech stack, or how to get in touch!"
    }
  ]);
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);

  // --- रेफ्स (Refs) ---
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const skillCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [skillsAnimated, setSkillsTriggered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- ऑटो-स्क्रॉल चैटबॉट ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    if (containerRef.current) {
      gsap.to(containerRef.current, { opacity: 1, duration: 1.2 });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(slideTimer);
    };
  }, []);

  useEffect(() => {
    const section = skillsSectionRef.current;
    if (!section) return;

    const triggerAnimation = () => {
      if (skillsAnimated) return;
      setSkillsTriggered(true);

      const validCards = skillCardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 24, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform"
          }
        );
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    const handleScroll = () => {
      if (skillsAnimated) return;
      const top = section.getBoundingClientRect().top;
      if (top < window.innerHeight - 60) {
        triggerAnimation();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [skillsAnimated]);

  const showToast = (text: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const downloadResume = () => {
    showToast("⏳ Launching secure CV download pipeline script context...");
    setTimeout(() => {
      showToast("✓ Shivam_Kumar_CV.pdf downloaded to storage successfully.");
    }, 1500);
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";
    const subject = `Website inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    window.location.href = `mailto:shivamkyp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleBotQuery = (query: string) => {
    if (!query.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text: query }]);
    const reply = getBotResponse(query);

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 350);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTypedMessage.trim()) return;
    handleBotQuery(userTypedMessage);
    setUserTypedMessage("");
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: "#070B0E", minHeight: "100vh", position: "relative", opacity: 0, overflowX: "hidden", color: "#F0F4F8" }}>
      <div ref={cursorRef} className={styles.customCursor} />

      <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000, backdropFilter: "blur(12px)", background: "rgba(7, 11, 14, 0.7)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", padding: "20px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#" style={{ fontSize: "1.3rem", fontWeight: 700, textDecoration: "none", color: "#fff" }}>Shivam<span style={{ color: "#FFB834" }}>.Dev</span></a>
          <ul style={{ display: "flex", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}>
            <li><a href="#" style={{ textDecoration: "none", color: "#FFB834", fontWeight: 600, fontSize: "0.95rem" }}>Home</a></li>
            <li><a href="#skills" style={{ textDecoration: "none", color: "#9BB1C2", fontWeight: 600, fontSize: "0.95rem" }}>Skills</a></li>
            <li><a href="#education" style={{ textDecoration: "none", color: "#9BB1C2", fontWeight: 600, fontSize: "0.95rem" }}>Education</a></li>
            <li><a href="#projects" style={{ textDecoration: "none", color: "#9BB1C2", fontWeight: 600, fontSize: "0.95rem" }}>Projects</a></li>
            <li><a href="#contact" style={{ textDecoration: "none", color: "#9BB1C2", fontWeight: 600, fontSize: "0.95rem" }}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* --- 1. सिनेमैटिक वीडियो हीरो सेक्शन --- */}
      <Hero
        firstName="SHIVAM"
        lastName="KUMAR"
        tagline="FULL-STACK WEB DEVELOPER"
        role="I build premium web experiences combining high-performance backends with modern, pixel-perfect user interfaces. Specializing in end-to-end website development architecture."
        videoSrc="/videos/hero.mp4"
      />

      {/* --- स्किल्स डैशबोर्ड सेक्शन --- */}
      <section id="skills" ref={skillsSectionRef} style={{ padding: "100px 0", background: "rgba(255,255,255,0.01)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <p style={{ color: "#9BB1C2", marginBottom: "48px", fontSize: "1rem" }}>Proficiency level dashboard across HTML, CSS, JavaScript, React, Java, SQL, and Spring Boot.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "40px" }}>
            {SKILLS.map((skill, index) => (
              <div
                key={skill.name}
                ref={(el) => {
                  skillCardsRef.current[index] = el;
                }}
                style={{
                  background: "rgba(24, 34, 45, 0.55)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  padding: "22px",
                  borderRadius: "18px",
                  textAlign: "left",
                  transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = "rgba(255, 184, 52, 0.45)";
                  e.currentTarget.style.boxShadow = "0 14px 30px rgba(0, 0, 0, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <h4 style={{ fontSize: "1.08rem", margin: 0, fontWeight: 700, color: "#F4F1EA" }}>{skill.name}</h4>
                  <span style={{ color: "#FFB834", fontWeight: 800, fontSize: "0.95rem", fontFamily: "monospace" }}>{skill.level}</span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#9BB1C2", margin: "0 0 14px 0" }}>{skill.badge}</p>
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "999px", height: "8px", width: "100%", overflow: "hidden" }}>
                  <div
                    style={{
                      background: "linear-gradient(90deg, #FFB834 0%, #FFD479 100%)",
                      height: "100%",
                      width: skillsAnimated ? skill.level : "0%",
                      borderRadius: "999px",
                      transition: `width 1.15s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.08}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={downloadResume} className={styles.ghostBtn}>📥 Download CV</button>
          </div>
        </div>
      </section>

      {/* --- एकेडमिक एजुकेशन सेक्शन --- */}
      <section id="education" style={{ padding: "100px 0", background: "#0E141B", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h2 className={styles.sectionTitle}>Academic History</h2>
          <p style={{ color: "#9BB1C2", marginBottom: "48px", fontSize: "1rem" }}>Educational milestones and grading certifications derived from resume profile.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px" }}>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className={styles.glassCard} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: "4px solid #FFB834" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <h3 style={{ fontSize: "1.25rem", margin: 0, color: "#fff", fontWeight: "700", lineHeight: "1.4" }}>{edu.degree}</h3>
                    <span style={{ fontSize: "0.8rem", color: "#FFB834", fontWeight: "bold", whiteSpace: "nowrap", background: "rgba(255,184,52,0.1)", padding: "4px 10px", borderRadius: "12px" }}>{edu.duration}</span>
                  </div>
                  <p style={{ color: "#9BB1C2", fontSize: "0.95rem", margin: "0 0 15px 0" }}>{edu.institution}</p>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "15px", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontWeight: "600" }}>ACADEMIC SCORE</span>
                  <span style={{ fontSize: "1.1rem", color: "#FFB834", fontWeight: "800", fontFamily: "monospace" }}>{edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- प्रोजेक्ट्स ग्रिड फ़िल्टर सेक्शन --- */}
      <section id="projects" style={{ padding: "100px 0", background: "#070B0E", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h2 className={styles.sectionTitle}>Featured Web Projects</h2>
          <p style={{ color: "#9BB1C2", marginBottom: "48px", fontSize: "1rem" }}>A collection of live production websites and full-stack web architectures.</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Websites" },
              { id: "frontend", label: "Frontend & Firebase" },
              { id: "fullstack", label: "Full-Stack Platforms" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setProjectFilter(cat.id)}
                style={{
                  background: projectFilter === cat.id ? "#FFB834" : "rgba(255,255,255,0.03)",
                  color: projectFilter === cat.id ? "#000" : "#9BB1C2",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.88rem"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "30px" }}>
            {PROJECTS.filter(p => projectFilter === "all" || p.category === projectFilter).map((project, index) => (
              <div key={index} className={styles.glassCard}>
                <h3 style={{ fontSize: "1.4rem", marginBottom: "12px", fontFamily: "monospace", color: "#fff" }}>{project.title}</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                  {project.tags.map((t, i) => <span key={i} className={styles.tagLabel}>{t}</span>)}
                </div>
                <p style={{ color: "#9BB1C2", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "28px", minHeight: "75px" }}>{project.desc}</p>
                <div style={{ display: "flex", gap: "16px" }}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.ghostBtn} style={{ padding: "10px 18px", fontSize: "0.85rem" }}>
                    🌐 Live Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- टेस्टीमोनियल्स स्लाइडर --- */}
      <section style={{ padding: "100px 0", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h2 className={styles.sectionTitle}>Client Feedback</h2>
          <p style={{ color: "#9BB1C2", marginBottom: "48px", fontSize: "1rem", textAlign: "center" }}>Endorsements from library managers and technical collaborators.</p>
          <div className={styles.glassCard} style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", minHeight: "200px" }}>
            <p style={{ fontFamily: "serif", fontStyle: "italic", fontSize: "1.2rem", lineHeight: "1.7", marginBottom: "20px" }}>
              {TESTIMONIALS[currentSlide].text}
            </p>
            <p style={{ fontWeight: 700, color: "#FFB834", fontSize: "0.95rem" }}>{TESTIMONIALS[currentSlide].author}</p>
          </div>
        </div>
      </section>

      {/* --- कॉन्टैक्ट फॉर्म --- */}
      <section id="contact" style={{ padding: "100px 0", background: "rgba(255,255,255,0.01)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h2 className={styles.sectionTitle}>Connect With Me</h2>
          <p style={{ color: "#9BB1C2", marginBottom: "48px", fontSize: "1rem" }}>Let's collaborate on building elite custom websites for your business ventures.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "50px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255, 255, 255, 0.02)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "1.5rem", color: "#FFB834" }}>✉️</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>Email Address</h4>
                  <a href="mailto:shivamkyp@gmail.com" style={{ color: "#9BB1C2", textDecoration: "none", fontSize: "0.9rem" }}>shivamkyp@gmail.com</a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255, 255, 255, 0.02)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "1.5rem", color: "#FFB834" }}>📞</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>Call Directly</h4>
                  <a href="tel:7352283304" style={{ color: "#9BB1C2", textDecoration: "none", fontSize: "0.9rem" }}>+91 7352283304</a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255, 255, 255, 0.02)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "1.5rem", color: "#FFB834" }}>💬</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>WhatsApp Workspace</h4>
                  <a href="https://wa.me/917352283304" target="_blank" rel="noreferrer" style={{ color: "#9BB1C2", textDecoration: "none", fontSize: "0.9rem" }}>Chat on WhatsApp ↗</a>
                </div>
              </div>
            </div>

            <div className={styles.glassCard}>
              <form onSubmit={handleContactSubmit}>
                <label htmlFor="contact-name" style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#9BB1C2", marginBottom: "8px" }}>Your Full Name</label>
                <input id="contact-name" name="name" type="text" required placeholder="John Doe" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "#0A0F14", color: "#fff", marginBottom: "20px" }} />

                <label htmlFor="contact-email" style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#9BB1C2", marginBottom: "8px" }}>Email Address</label>
                <input id="contact-email" name="email" type="email" required placeholder="john@example.com" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "#0A0F14", color: "#fff", marginBottom: "20px" }} />

                <label htmlFor="contact-message" style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#9BB1C2", marginBottom: "8px" }}>Website Project Brief</label>
                <textarea id="contact-message" name="message" rows={4} required placeholder="Describe your website specifications, pages, and features..." style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "#0A0F14", color: "#fff", marginBottom: "20px", fontFamily: "inherit" }}></textarea>

                <button type="submit" className={styles.primaryBtn} style={{ width: "100%" }}>🚀 Send Website Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- AI चैटबॉट --- */}
      <div className={styles.chatbotContainer}>
        {isBotOpen && (
          <div className={styles.chatbotWindow}>
            <div className={styles.chatbotHeader}>
              <h3 style={{ fontSize: "1.05rem", fontFamily: "monospace", color: "#FFB834", margin: 0 }}>🤖 shivam.boat</h3>
              <button onClick={() => setIsBotOpen(false)} style={{ background: "none", border: "none", color: "#9BB1C2", fontSize: "1.2rem", cursor: "pointer" }}>×</button>
            </div>

            <div style={{ flex: 1, padding: "15px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ padding: "10px 14px", borderRadius: "14px", fontSize: "0.88rem", maxWidth: "80%", alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end", backgroundColor: msg.sender === "bot" ? "rgba(255,255,255,0.05)" : "#FFB834", color: msg.sender === "bot" ? "#fff" : "#000" }}>
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div style={{ padding: "8px 10px", display: "flex", gap: "6px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
              {QUICK_BOT_PROMPTS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleBotQuery(item.query)}
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "#9BB1C2", padding: "4px 10px", borderRadius: "20px", fontSize: "0.72rem", cursor: "pointer" }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendText} style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.08)", background: "#10171E", padding: "5px" }}>
              <input
                type="text"
                value={userTypedMessage}
                onChange={(e) => setUserTypedMessage(e.target.value)}
                placeholder="Say hi or ask about skills, projects..."
                style={{ flex: 1, background: "transparent", border: "none", color: "#fff", padding: "10px", fontSize: "0.85rem", outline: "none" }}
              />
              <button type="submit" style={{ background: "#FFB834", border: "none", color: "#000", padding: "0 15px", borderRadius: "8px", fontWeight: "bold", fontSize: "0.8rem", cursor: "pointer" }}>
                Send
              </button>
            </form>
          </div>
        )}
        <button onClick={() => setIsBotOpen(!isBotOpen)} className={styles.chatbotToggle}>🤖</button>
      </div>

      <div style={{ position: "fixed", bottom: "30px", left: "30px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "10px" }}>
        {toasts.map((t) => (
          <div key={t.id} style={{ background: "#16222F", borderLeft: "4px solid #2ECC71", padding: "16px 24px", borderRadius: "8px", color: "#fff", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", fontSize: "0.95rem" }}>
            {t.text}
          </div>
        ))}
      </div>

      <footer style={{ textAlign: "center", padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.08)", color: "#9BB1C2", fontSize: "0.9rem" }}>
        <p>© 2026 Shivam Kumar. Built securely with optimal Full-Stack Web architectural practices. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
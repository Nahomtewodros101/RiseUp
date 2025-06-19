// lib/chatbot.ts
export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: "text" | "options" | "action";
}

export interface ChatOption {
  text: string;
  action: string;
}

export interface ChatResponse {
  text: string;
  type?: "text" | "options" | "action";
  options?: ChatOption[];
}

export class ChatbotService {
  private static instance: ChatbotService;
  private responses: Map<string, ChatResponse>;

  private constructor() {
    this.responses = new Map();
    this.initializeResponses();
  }

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  private initializeResponses() {
    // Greeting responses
    this.responses.set("greeting", {
      text: "Hi there! 👋 I'm Qemem Assistant. How can I help you today?",
      type: "options",
      options: [
        { text: "🚀 Our Services", action: "services" },
        { text: "💼 View Projects", action: "projects" },
        { text: "📞 Contact Info", action: "contact" },
        { text: "👥 About Team", action: "team" },
        { text: "💰 Get Quote", action: "quote" },
      ],
    });

    // Services
    this.responses.set("services", {
      text: "We offer comprehensive digital solutions:\n\n🌐 Web Development - Custom websites and web applications\n📱 Mobile Apps - iOS and Android development\n🎨 UI/UX Design - Beautiful and intuitive designs\n☁️ Cloud Solutions - Scalable cloud infrastructure\n\nWhich service interests you most?",
      type: "options",
      options: [
        { text: "Web Development", action: "web-dev" },
        { text: "Mobile Apps", action: "mobile" },
        { text: "UI/UX Design", action: "design" },
        { text: "Cloud Solutions", action: "cloud" },
        { text: "Get Quote", action: "quote" },
      ],
    });

    // Individual services
    this.responses.set("web-dev", {
      text: "🌐 Web Development Services:\n\n• Custom website development\n• E-commerce solutions\n• Progressive Web Apps (PWA)\n• API development and integration\n• Performance optimization\n• SEO-friendly development\n\nReady to start your web project?",
      type: "options",
      options: [
        { text: "View Web Projects", action: "projects" },
        { text: "Get Web Quote", action: "quote" },
        { text: "Contact Us", action: "contact" },
      ],
    });

    this.responses.set("mobile", {
      text: "📱 Mobile App Development:\n\n• Native iOS & Android apps\n• Cross-platform development\n• App Store optimization\n• Push notifications\n• In-app purchases\n• Analytics integration\n\nLet's build your mobile app!",
      type: "options",
      options: [
        { text: "View Mobile Projects", action: "projects" },
        { text: "Get App Quote", action: "quote" },
        { text: "Contact Us", action: "contact" },
      ],
    });

    this.responses.set("design", {
      text: "🎨 UI/UX Design Services:\n\n• User interface design\n• User experience optimization\n• Wireframing & prototyping\n• Brand identity design\n• Design systems\n• Usability testing\n\nLet's create amazing user experiences!",
      type: "options",
      options: [
        { text: "View Design Work", action: "projects" },
        { text: "Get Design Quote", action: "quote" },
        { text: "Contact Designer", action: "contact" },
      ],
    });

    this.responses.set("cloud", {
      text: "☁️ Cloud Solutions:\n\n• AWS & Azure deployment\n• Serverless architecture\n• Database management\n• DevOps & CI/CD\n• Security & monitoring\n• Scalable infrastructure\n\nScale your business with cloud!",
      type: "options",
      options: [
        { text: "View Cloud Projects", action: "projects" },
        { text: "Get Cloud Quote", action: "quote" },
        { text: "Contact Expert", action: "contact" },
      ],
    });

    // Projects
    this.responses.set("projects", {
      text: "🚀 Check out our amazing projects! We've built:\n\n• E-commerce platforms\n• SaaS applications\n• Mobile apps\n• Corporate websites\n• Custom dashboards\n\nWould you like to see our portfolio?",
      type: "options",
      options: [
        { text: "View Portfolio", action: "portfolio" },
        { text: "Similar Project Quote", action: "quote" },
        { text: "Discuss Project", action: "contact" },
      ],
    });

    // Contact
    this.responses.set("contact", {
      text: "📞 Get in touch with us:\n\n📧 Email: hello@qemem.dev\n📱 Phone: +1 (555) 123-4567\n🌐 Website: qemem.dev\n📍 Location: Remote & On-site\n\n⏰ We typically respond within 2 hours during business hours!",
      type: "options",
      options: [
        { text: "Send Message", action: "contact-form" },
        { text: "Schedule Call", action: "schedule" },
        { text: "Get Quote", action: "quote" },
      ],
    });

    // Team
    this.responses.set("team", {
      text: "👥 Meet our amazing team!\n\nWe're a group of passionate developers, designers, and strategists dedicated to bringing your ideas to life. Our team has:\n\n• 50+ successful projects\n• 5+ years average experience\n• Full-stack expertise\n• 24/7 support commitment\n\nWant to learn more about us?",
      type: "options",
      options: [
        { text: "Meet the Team", action: "team-page" },
        { text: "Our Process", action: "process" },
        { text: "Join Our Team", action: "careers" },
      ],
    });

    // Quote
    this.responses.set("quote", {
      text: "💰 Ready to get started?\n\nTo provide you with an accurate quote, I'll need some details about your project:\n\n• Project type & scope\n• Timeline requirements\n• Budget range\n• Specific features needed\n\nLet's discuss your project!",
      type: "options",
      options: [
        { text: "Contact for Quote", action: "contact-form" },
        { text: "Schedule Consultation", action: "schedule" },
        { text: "View Pricing", action: "pricing" },
      ],
    });

    // Additional responses
    this.responses.set("portfolio", {
      text: "🎯 Redirecting you to our portfolio page where you can see all our amazing projects!",
      type: "action",
    });

    this.responses.set("contact-form", {
      text: "📝 Redirecting you to our contact form. We'll get back to you soon!",
      type: "action",
    });

    this.responses.set("team-page", {
      text: "👥 Let me show you our talented team members!",
      type: "action",
    });

    this.responses.set("careers", {
      text: "🚀 Interested in joining our team? Let's see our open positions!",
      type: "action",
    });

    this.responses.set("schedule", {
      text: "📅 I'd love to help you schedule a consultation! Please use our contact form and mention you'd like to schedule a call. We'll reach out within 24 hours to arrange a convenient time.",
      type: "options",
      options: [
        { text: "Contact Form", action: "contact-form" },
        { text: "Email Us", action: "contact" },
      ],
    });

    this.responses.set("pricing", {
      text: "💵 Our pricing is project-based and depends on:\n\n• Project complexity\n• Timeline requirements\n• Features & functionality\n• Ongoing support needs\n\nTypical ranges:\n• Simple websites: $2,000-$5,000\n• Complex web apps: $10,000-$50,000\n• Mobile apps: $15,000-$100,000\n\nLet's discuss your specific needs!",
      type: "options",
      options: [
        { text: "Get Custom Quote", action: "contact-form" },
        { text: "Schedule Call", action: "schedule" },
      ],
    });

    this.responses.set("process", {
      text: "🔄 Our Development Process:\n\n1️⃣ Discovery & Planning\n2️⃣ Design & Prototyping\n3️⃣ Development & Testing\n4️⃣ Launch & Deployment\n5️⃣ Support & Maintenance\n\nWe keep you involved every step of the way!",
      type: "options",
      options: [
        { text: "Start Project", action: "contact-form" },
        { text: "Learn More", action: "contact" },
      ],
    });
  }

  public generateResponse(message: string): ChatResponse {
    const lowerMessage = message.toLowerCase();

    // Service-related keywords
    if (
      lowerMessage.includes("service") ||
      lowerMessage.includes("what do you do")
    ) {
      return this.responses.get("services")!;
    }

    if (lowerMessage.includes("web") || lowerMessage.includes("website")) {
      return this.responses.get("web-dev")!;
    }

    if (lowerMessage.includes("mobile") || lowerMessage.includes("app")) {
      return this.responses.get("mobile")!;
    }

    if (
      lowerMessage.includes("design") ||
      lowerMessage.includes("ui") ||
      lowerMessage.includes("ux")
    ) {
      return this.responses.get("design")!;
    }

    if (
      lowerMessage.includes("cloud") ||
      lowerMessage.includes("aws") ||
      lowerMessage.includes("server")
    ) {
      return this.responses.get("cloud")!;
    }

    // Project-related keywords
    if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("portfolio") ||
      lowerMessage.includes("work")
    ) {
      return this.responses.get("projects")!;
    }

    // Contact-related keywords
    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("phone")
    ) {
      return this.responses.get("contact")!;
    }

    // Team-related keywords
    if (
      lowerMessage.includes("team") ||
      lowerMessage.includes("about") ||
      lowerMessage.includes("who")
    ) {
      return this.responses.get("team")!;
    }

    // Pricing-related keywords
    if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("quote") ||
      lowerMessage.includes("budget")
    ) {
      return this.responses.get("quote")!;
    }

    // Greeting keywords
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return this.responses.get("greeting")!;
    }

    // Default response
    return {
      text: "I'm here to help! I can assist you with:\n\n🚀 Information about our services\n💼 Viewing our projects\n📞 Contact details\n👥 About our team\n💰 Getting a quote\n\nWhat would you like to know?",
      type: "options",
      options: [
        { text: "Our Services", action: "services" },
        { text: "View Projects", action: "projects" },
        { text: "Contact Info", action: "contact" },
        { text: "About Team", action: "team" },
        { text: "Get Quote", action: "quote" },
      ],
    };
  }

  public getResponseByAction(action: string): ChatResponse {
    return this.responses.get(action) || this.generateResponse("");
  }

  public handleAction(action: string): string | null {
    const actionMap: { [key: string]: string } = {
      portfolio: "/projects",
      "contact-form": "/contact",
      "team-page": "/team",
      careers: "/careers",
    };

    return actionMap[action] || null;
  }
}

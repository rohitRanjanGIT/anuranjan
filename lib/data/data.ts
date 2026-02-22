import {
  SiteConfig,
  NavItem,
  Service,
  Project,
  Value, // Wait, I didn't define Value in types.ts, I should.
  Testimonial,
  TeamMember,
  HistoryItem,
  GalleryItem,
  Career,
  FooterSection
} from "./types";

// I'll update types.ts in a bit to include missing ones.
// For now let's just use the interfaces.

export const siteConfig: SiteConfig = {
  name: "Anuranjan Infratech",
  fullName: "Anuranjan Infratech Resources Pvt Ltd",
  description: "Building Excellence, Designing Dreams",
  tagline: "Foundations of the Future",
  descriptionShort: "Excellence in infrastructure and construction since 15+ years. Building tomorrow's landmarks with precision and integrity.",
  copyright: "© 2026 Anuranjan Infratech Resources Pvt Ltd. All rights reserved.",
  experienceYears: 15,
  projectsCompleted: 200,
  logo: {
    image: "/AnuranjanLogo.png",
    text: "Anuranjan Infratech"
  },
  contact: {
    office: "123 Business Avenue, South Extension, New Delhi, India - 110049",
    corporatePark: "123 Corporate Park, Sector 62, Noida, Uttar Pradesh, India",
    phone: "+91 98765 43210 / +91 11 2345 6789",
    email: "info@anuranjaninfra.com",
    supportEmail: "support@anuranjaninfra.com",
    contactEmail: "contact@anuranjaninfra.com",
    phoneAlt: "+91 120 456 7890"
  },
  socials: [
    { name: "LinkedIn", icon: "public", url: "#" },
    { name: "Twitter", icon: "share", url: "#" },
    { name: "Instagram", icon: "mail", url: "#" }
  ],
  homeStrings: {
    hero: {
      title: "Anuranjan Infratech",
      highlightedText: "Resources Pvt Ltd",
      subtitle: "Foundations of the Future",
      primaryButton: "Explore Portfolio",
      secondaryButton: "Our Services"
    },
    overview: {
      eyebrow: "The Legacy",
      title: "We shape the landscape of modern",
      highlightedTitle: "infrastructure",
      description: "Anuranjan Infratech Resources Pvt Ltd is a premier construction and design firm dedicated to delivering structural integrity and architectural brilliance. From complex civil engineering to bespoke interiors, we merge technical expertise with creative vision.",
      yearsLabel: "Years of Mastery"
    },
    services: {
      eyebrow: "Specialized Services",
      title: "Mastering Civil & Design",
      buttonText: "All Services"
    },
    portfolio: {
      eyebrow: "Our Portfolio",
      title: "Landmarks of Excellence",
      description: "Showcasing our most iconic projects across the nation.",
      buttonText: "Explore All Projects"
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Trusted by Industry Leaders"
    },
    cta: {
      title: "Ready to build your",
      highlightedWord: "vision?",
      description: "Let's collaborate to create something extraordinary. Our team is ready to transform your ideas into structural reality.",
      primaryButton: "Start a Project",
      secondaryButton: "Contact Us"
    }
  },
  common: {
    getQuote: "Get a Quote"
  },
  aboutStrings: {
    hero: {
      title: "About Us",
      subtitle: "Legacy & Vision",
      description: "Building future-ready infrastructure with excellence and innovation since inception."
    },
    story: {
      eyebrow: "Our Story",
      title: "A Legacy of",
      highlightedTitle: "Excellence",
      p1: `Anuranjan Infratech Resources Pvt Ltd was founded with a vision to revolutionize the infrastructure sector. Over the years, we have grown from a small consultancy into a multi-disciplinary engineering powerhouse.`,
      quote: "Our journey is defined by a relentless pursuit of quality and a commitment to delivering complex projects on time."
    },
    mission: {
      title: "Our Mission",
      desc: "To provide sustainable and innovative engineering solutions that exceed client expectations while maintaining the highest safety standards."
    },
    vision: {
      title: "Our Vision",
      desc: "To become a global leader in infrastructure development, recognized for our integrity, technical prowess, and contribution to society."
    },
    leadership: {
      eyebrow: "Leadership",
      title: "The Visionaries",
      description: "Meet the specialized team driving our success."
    },
    journey: {
      eyebrow: "Evolution",
      title: "Our Journey"
    }
  },
  projectsStrings: {
    hero: {
      title: "Our Portfolio",
      subtitle: "Excellence in Execution",
      description: "Showcasing our best work across civil and interior sectors."
    },
    intro: {
      eyebrow: "Case Studies",
      title: "Iconic Infrastructure",
      description: "A chronicle of our architectural legacy, featuring projects that redefine modern living and working spaces."
    }
  },
  servicesStrings: {
    hero: {
      title: "Our Services",
      subtitle: "Expertise & Innovation",
      description: "Mastering Civil & Design with precision engineering and creative vision."
    },
    cta: {
      title: "Need a",
      highlightedWord: "customized",
      description: "Our team of experts is ready to help you with bespoke engineering and design services tailored specifically to your project requirements.",
      primaryButton: "Consult with Experts",
      secondaryButton: "Sector Brochure"
    }
  },
  careersStrings: {
    hero: {
      title: "Join Our Team",
      subtitle: "Careers & Growth",
      description: "Build your future with Anuranjan Infratech. We are always looking for passionate people to join our journey."
    },
    intro: {
      eyebrow: "Opportunities",
      title: "Open Positions",
      description: "Find your next challenge in the world of high-performance infrastructure."
    },
    culture: {
      eyebrow: "Culture",
      title: "Engineered for",
      highlightedTitle: "Success",
      description: "At Anuranjan Infratech, we believe our people are our greatest asset. We foster a culture of innovation, continuous learning, and absolute excellence.",
      points: [
        "Dynamic work environment with a focus on global innovation",
        "Elite compensation packages and comprehensive wellness",
        "Direct mentorship from world-class industry leaders",
        "Opportunities to lead nation-scale infrastructure projects"
      ],
      openAppLabel: "DON'T SEE YOUR SPECIALTY?",
      openAppButton: "Submit Open Application"
    }
  },
  galleryStrings: {
    hero: {
      title: "Visual Gallery",
      description: "A glimpse into our world of architectural excellence and design brilliance."
    },
    cta: {
      title: "Want to see more of our work?",
      description: "We have thousands of documented projects. For sector-specific portfolios, request our archival digest today.",
      primaryButton: "Request Full Archive",
      secondaryButton: "Visit Design Studio"
    }
  }
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" }
];

export const services: Service[] = [
  {
    id: "civil-construction",
    title: "Civil Construction",
    description: "End-to-end structural solutions for residential, commercial, and industrial complexes. We specialize in robust foundations, structural frameworks, and sustainable site development.",
    icon: "home_work",
    features: [
      "Foundation & Earthworks",
      "Structural Engineering",
      "Site Grading & Drainage"
    ],
    color: "primary"
  },
  {
    id: "interior-design",
    title: "Interior Design",
    description: "Bespoke interior solutions that blend functionality with aesthetic elegance. We create spaces that reflect your identity while optimizing utility and comfort.",
    icon: "format_paint",
    features: [
      "Modular Kitchens",
      "Corporate Office Fit-outs",
      "Luxury Residential Interiors"
    ],
    color: "secondary-blue"
  },
  {
    id: "road-highway",
    title: "Road & Highway",
    description: "Strategic infrastructure development including national highways, urban roads, and industrial pavement solutions with AI-driven project management.",
    icon: "add_road",
    features: [
      "Asphalt & Concrete Paving",
      "Bridge & Flyover Construction",
      "Smart Traffic Systems"
    ],
    color: "primary"
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Comprehensive oversight from conception to completion, ensuring quality assurance, timeline commitments, and cost-effective execution.",
    icon: "assignment",
    features: [
      "Regulatory Compliance",
      "Resource Optimization",
      "Risk Assessment"
    ],
    color: "secondary-blue"
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Tech Park HQ Lobby",
    category: "Corporate",
    type: "Interior Design & Execution",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrt6ecFPhx3KgvYYBTZggjRaaVfWIfMFET6jmOUFb7rNVzLa_lT5ar04_whoCO4rXJFD2I-beeIde2x3UW7nJPU13Fw7bvZJ14nXOR6UKJNHJ3jfAzr4FJv1VoP5yinmBUnccIrkNOgoD9s_GBhzPseW23WWPRIF-kEUOIE8fvG8DLdyrDll2UPY1ZJlwNWL-LvLnbODDpWElKEte_7d3HOgquPVR5l4U_jDIkhCOAUNz1BRP5Uyu16s2fC42zAsXdNkwdcy22n2UA",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrt6ecFPhx3KgvYYBTZggjRaaVfWIfMFET6jmOUFb7rNVzLa_lT5ar04_whoCO4rXJFD2I-beeIde2x3UW7nJPU13Fw7bvZJ14nXOR6UKJNHJ3jfAzr4FJv1VoP5yinmBUnccIrkNOgoD9s_GBhzPseW23WWPRIF-kEUOIE8fvG8DLdyrDll2UPY1ZJlwNWL-LvLnbODDpWElKEte_7d3HOgquPVR5l4U_jDIkhCOAUNz1BRP5Uyu16s2fC42zAsXdNkwdcy22n2UA"
  },
  {
    id: 2,
    title: "The Heights Apartments",
    category: "Residential",
    type: "Full Civil Construction",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvzrXxqpQ8_TDyMsJT4exjCTprsNAlYlS_IXXP-ffXi75jWbrT1h2albO2SCmJyoh_ZzLEaE64TT_w4k3X3BhmeEd-QjkuuKY-CJ0rP5LbJv-AtA7PZjN5SnYP60QU5GJ3B69dndAOPmtvV7GcQLc8EXhtYr10HfKnJK1DX98RHB1gwlLsgdh5r3t4jyQTtOf2zWUCB17xN1iaZAkcGsfwU0yQHDzXlKSkVjBOSbceoylVDODq2iNX7gPf6nbEvN0UkZ_MZ8ektIkK",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvzrXxqpQ8_TDyMsJT4exjCTprsNAlYlS_IXXP-ffXi75jWbrT1h2albO2SCmJyoh_ZzLEaE64TT_w4k3X3BhmeEd-QjkuuKY-CJ0rP5LbJv-AtA7PZjN5SnYP60QU5GJ3B69dndAOPmtvV7GcQLc8EXhtYr10HfKnJK1DX98RHB1gwlLsgdh5r3t4jyQTtOf2zWUCB17xN1iaZAkcGsfwU0yQHDzXlKSkVjBOSbceoylVDODq2iNX7gPf6nbEvN0UkZ_MZ8ektIkK"
  },
  {
    id: 3,
    title: "Sunset Villa Interior",
    category: "Villa",
    type: "Bespoke Furnishing",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqNDgwCldCXF5u-JyNAKrYeAeI6-ROHh-ByjyL7dgRyDkqw5vwUMwK9uRNKDtsWsjIpo0Ug14k4UTRESxHpDIXigvnOcEDgvUJAwoeWYXcXYHs9S1SwWYDZn7lzk2wked5CuOlBIEWI2nfRgxvw4f4ss5AV4OpjdUEMbNv063PGsGY7cEioAH8UdG1o6EAheeNxT1cjFE6muZzfwxRI4wM6uh-uBpO0qJKZEnPvIz7w30ZpMB3eitNk88xfIkxVU4vtb0VQwyEx-s1",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqNDgwCldCXF5u-JyNAKrYeAeI6-ROHh-ByjyL7dgRyDkqw5vwUMwK9uRNKDtsWsjIpo0Ug14k4UTRESxHpDIXigvnOcEDgvUJAwoeWYXcXYHs9S1SwWYDZn7lzk2wked5CuOlBIEWI2nfRgxvw4f4ss5AV4OpjdUEMbNv063PGsGY7cEioAH8UdG1o6EAheeNxT1cjFE6muZzfwxRI4wM6uh-uBpO0qJKZEnPvIz7w30ZpMB3eitNk88xfIkxVU4vtb0VQwyEx-s1"
  },
  {
    id: 4,
    title: "LogiHub Warehouse",
    category: "Industrial",
    type: "Structural Steel Works",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLKKarMBFmYQuJXVVzIxlf4jHZwjuBmUWnhuJ6Whw1YDuD9eCGvp0jyeqyyVMGe_qwCoXtuJzTEBjIOo0hpWnr9qWmCQNAxdkZuv3ViT8n-DYw_34TE8h01AnkPoAb0-hri3qP_ll4_e2uPVx6LT9zNN1eJju4Yq7oWmdiX9OYvcSKBcZQgt12s9PKTWuEMl8YRntB0-u3Dyf-SYZeVkL1PtHpw_hwWvlASkyb51Q2fMZpHou7xHH1-x-b2ukHu6EtopRU4PKmmxK",
    fullImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLKKarMBFmYQuJXVVzIxlf4jHZwjuBmUWnhuJ6Whw1YDuD9eCGvp0jyeqyyVMGe_qwCoXtuJzTEBjIOo0hpWnr9qWmCQNAxdkZuv3ViT8n-DYw_34TE8h01AnkPoAb0-hri3qP_ll4_e2uPVx6LT9zNN1eJju4Yq7oWmdiX9OYvcSKBcZQgt12s9PKTWuEMl8YRntB0-u3Dyf-SYZeVkL1PtHpw_hwWvlASkyb51Q2fMZpHou7xHH1-x-b2ukHu6EtopRU4PKmmxK"
  }
];

export const values = [
  {
    title: "Quality Assurance",
    description: "Rigorous quality checks at every phase of construction and design.",
    icon: "verified_user"
  },
  {
    title: "Rich Experience",
    description: "Over 15 years of industry-leading expertise in civil projects.",
    icon: "history_edu"
  },
  {
    title: "Absolute Trust",
    description: "Transparent pricing and timeline commitments you can rely on.",
    icon: "handshake"
  },
  {
    title: "Innovation",
    description: "Utilizing modern techniques and materials for lasting results.",
    icon: "lightbulb"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Rahul Mehra",
    role: "Project Manager, TechBuild",
    content: "The attention to detail in their structural work is phenomenal. They completed our corporate park 2 months ahead of schedule without compromising safety.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQJWEJuE3RJjk1BFk1S3NDx4uJn9g7kUGrjAsC7VWq8lSC9W9vS6rjdn78ddIYMwW0ZPv3ECvjiTFtAfaXGIsYtLXd0oGZwALu0HKD-QpWOvWb80bbslJv_u5NgwfXir0Qf02jtapKoNPcd-mFHbjhn9en6QP1Yu6Fd0PHQxkN1ssoe6s9y-qqbjvpdOvs5aqxso8Irkl8INLT3SCIre1NswN-jeoJKxm-KFZjgHnog_KGUWHm3R_zbiVw2vTDZJnIvCFmgXg3oNhY"
  },
  {
    name: "Sneha Kapoor",
    role: "Homeowner, Highrise Vista",
    content: "Transforming our penthouse was a dream experience. Their interior design team captures exactly what we wanted before we even knew how to explain it.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAyWny1aEoVfM3N3aJGRsX0oKh4xVavq6Cp1T_88UFoI1uQFqmK6mh8DDWUsvh2xU7guHzpxS-VRqGDpeiPBaN42Cjqkw_4dIu8ky4Ok6AGWmk8XNzoE5P7KGsqSgfgvXyyjyEDUDpRYEfXn8MEPQ254Z2NgeKkAfk17l6FdeGOSFtq8QLP-5cBIYnDhEWMT3pn6xeuRXUSMOImQwHDR4mAVYIUtK9ua5aOPRiQYcM9KVjEyjMgJvh4bFIZkHW3Ttdq9UiQF2fsSBK"
  },
  {
    name: "Animesh Das",
    role: "CEO, LogiMove India",
    content: "Professional, reliable, and innovative. Anuranjan Infratech is our go-to partner for all our commercial expansion projects across the state.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVT74OMBIOBi3yWZCMM6HURnhTrm3L0ClY7N1t2hiwTIEUJWjMRpZlvMU13go7JLBV5QVSHSZ6koJcov1yxDYUwtbKWVt0qG_r3LMppXjFRdrZBr_Aen1vS1dS_G7QTUN0IOZRbWYwRGstRvyN98t-VS32CJ8L3GoURMN0UIyVRe7zBY114rVkXuAIvDQtFmXGjyIxhByExBJCeVmTVZVgHBpcaOP8bZxBQeMPLLEm2fGm6_cXw6NBgkUov9GjwfpPEaW38kPMiF2T"
  }
];

export const team: TeamMember[] = [
  {
    name: "Anuranjan Kumar",
    role: "Managing Director",
    bio: "20+ years of experience in civil engineering and strategic infrastructure planning.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmlSRtNbpqZgIIdJ008sQk0Ui0DGphP83OPl42aXFHrU82pjECdfzYlsWUT561B074uhQMOnwElNXHl100XjyUoUQybTn6Nc78X17_b0wKn_C11XYIHFiBtsoEA7kp2gZl-WOiROiRA1bzRh3Prl_AROMGjtvUoXQNbgaGliVqIOij1gYMPgBVfl8IkUZpw86A6TJY_KqjCoLmSi-3B9RXdETpnVv2I1JkkhFVGIz8SoyKq_7yVH4IdWsAsCxJgH3ZbTdAcXkRzj05"
  },
  {
    name: "Priya Singh",
    role: "Chief Operations Officer",
    bio: "Expert in project management and operational efficiency across global markets.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXSBNJwayUtOBvlD6TdoFmjuRWh9Wr7HThRNPshbWTnDg70GqHQCk6n5xmrI8bnGg7qz0kgCliT6yyL9_jY7O5sm3XrP12B78h52BbNSa0bDKlPMCyajWeo0Q08UqNk-GQlSD7m0dLOVxg8YpgIh3hH3SM3e1HiAU0VdBTk2xUmLtw4XzoF5VLQubEZyZ_GqoncRSDkICWuC1YdB5lPs7kV0lcsIEDwTPDxW3BHb_1bJb3FOEYkMOqiRVIUyfOhWMNClMIW68yxIel"
  },
  {
    name: "Vikram Malhotra",
    role: "Head of Engineering",
    bio: "Pioneer in modern structural designs and sustainable building methodologies.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbgU8QDUh0pUwx0RPEQnPsOzaalvVKGvymbgfwTRzvPZt8Pw500ZJr5_HIpccf5sUrztLEsegS9LY0781Xlb7CDEeuAjW8fWiIQh8n-b1gelohk1B5Ys6i-SsuQAaqfB2t-9snIdTdst57_FPWnrXXK_NvcgkPNXfO1ZjRpOSurxeJ8o7Hr81w4OhvyB3rJgB_FPQW9AdPoxw19iFS4RWNGuevdyEE3Z4QT3yu4Hvw9_PYq9sJSnLL7JDIr2TcwUzQZCkEKoxe7dpx"
  }
];

export const history: HistoryItem[] = [
  { year: "2010", title: "Foundation", description: "Established with a focus on civil consultancy and small scale road projects." },
  { year: "2015", title: "Scaling Up", description: "Secured first major national highway project and expanded to 100+ workforce." },
  { year: "2020", title: "Innovation Hub", description: "Introduced AI-driven project management and green building certifications." },
  { year: "2024", title: "Global Vision", description: "Pioneering smart city infrastructure and expanding operations across Southeast Asia." }
];

export const gallery: GalleryItem[] = [
  { id: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8xU9AbMloXbzR2PuV4o998pjAjl84tN8mrr4IttSkVZcBtuPQLJQfJK1Tr76o-7GaCELjMEdZz89dzRN8L7wU37sNkqrImm8Sm1o4G6s3f26qbhKmttKJ7983XSZ1RYKBTDMbsEGxDQKmvw07yZA6uODH-5yThpen_oL1SP9y6oNf8RmE7IMW0k5v79nBKCFOpOHzkVNd9bdCv7079C-jDFQ3Hyo6q-szu9AxuE1fjqJWGtMTj_sKGh3yheYb98Z1QmMZeoayMfdb", category: "Construction" },
  { id: 2, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2y0k_xBQKkrn3o9gUO8ggpjGEmPYlARFX5st2lgx2dGPG3vRkU0i9vsJmX0Y9bcSXLs8mMdXAy1wljrgRZT-4o1uSdj60cLq4qTawiPMaU3ArdIU0pbTv3h7VM66Urpl0D1P4nXEVqOIzaT-hVRIYz7iVTdSoEPWvHiYCBXc0VCwb57ND4rl2CoVIeIFJNjv72JnSFnORI6r9jY3l3i8FNY_R10b9Ivth2Y6UV0YFA67WSJQYP7tDMZMvfYJAlvfas5ikwUdhixfq", category: "Design" },
  { id: 3, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrt6ecFPhx3KgvYYBTZggjRaaVfWIfMFET6jmOUFb7rNVzLa_lT5ar04_whoCO4rXJFD2I-beeIde2x3UW7nJPU13Fw7bvZJ14nXOR6UKJNHJ3jfAzr4FJv1VoP5yinmBUnccIrkNOgoD9s_GBhzPseW23WWPRIF-kEUOIE8fvG8DLdyrDll2UPY1ZJlwNWL-LvLnbODDpWElKEte_7d3HOgquPVR5l4U_jDIkhCOAUNz1BRP5Uyu16s2fC42zAsXdNkwdcy22n2UA", category: "Commercial" },
  { id: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvzrXxqpQ8_TDyMsJT4exjCTprsNAlYlS_IXXP-ffXi75jWbrT1h2albO2SCmJyoh_ZzLEaE64TT_w4k3X3BhmeEd-QjkuuKY-CJ0rP5LbJv-AtA7PZjN5SnYP60QU5GJ3B69dndAOPmtvV7GcQLc8EXhtYr10HfKnJK1DX98RHB1gwlLsgdh5r3t4jyQTtOf2zWUCB17xN1iaZAkcGsfwU0yQHDzXlKSkVjBOSbceoylVDODq2iNX7gPf6nbEvN0UkZ_MZ8ektIkK", category: "Residential" },
  { id: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqNDgwCldCXF5u-JyNAKrYeAeI6-ROHh-ByjyL7dgRyDkqw5vwUMwK9uRNKDtsWsjIpo0Ug14k4UTRESxHpDIXigvnOcEDgvUJAwoeWYXcXYHs9S1SwWYDZn7lzk2wked5CuOlBIEWI2nfRgxvw4f4ss5AV4OpjdUEMbNv063PGsGY7cEioAH8UdG1o6EAheeNxT1cjFE6muZzfwxRI4wM6uh-uBpO0qJKZEnPvIz7w30ZpMB3eitNk88xfIkxVU4vtb0VQwyEx-s1", category: "Interior" },
  { id: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLKKarMBFmYQuJXVVzIxlf4jHZwjuBmUWnhuJ6Whw1YDuD9eCGvp0jyeqyyVMGe_qwCoXtuJzTEBjIOo0hpWnr9qWmCQNAxdkZuv3ViT8n-DYw_34TE8h01AnkPoAb0-hri3qP_ll4_e2uPVx6LT9zNN1eJju4Yq7oWmdiX9OYvcSKBcZQgt12s9PKTWuEMl8YRntB0-u3Dyf-SYZeVkL1PtHpw_hwWvlASkyb51Q2fMZpHou7xHH1-x-b2ukHu6EtopRU4PKmmxK", category: "Industrial" }
];

export const careers: Career[] = [
  {
    id: 1,
    title: "Senior Civil Engineer",
    department: "Engineering",
    location: "Noida, India",
    type: "Full Time",
    experience: "8+ Years"
  },
  {
    id: 2,
    title: "Project Coordinator",
    department: "Operations",
    location: "New Delhi, India",
    type: "Full Time",
    experience: "3-5 Years"
  },
  {
    id: 3,
    title: "Interior Designer",
    department: "Design",
    location: "Noida, India",
    type: "Contract",
    experience: "5+ Years"
  }
];

export const footerSections: FooterSection[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Projects", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" }
    ]
  },
  {
    heading: "Services",
    links: [
      { label: "Civil Construction", href: "/services" },
      { label: "Interior Design", href: "/services" },
      { label: "Road & Highway", href: "/services" },
      { label: "Project Management", href: "/services" }
    ]
  }
];

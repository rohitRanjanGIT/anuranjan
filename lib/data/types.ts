export interface NavItem {
    label: string;
    href: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    color: string;
    href?: string;
}

export interface Value {
    title: string;
    description: string;
    icon: string;
}

export interface Project {
    id: string | number;
    title: string;
    category: string;
    type: string;
    image: string;
    fullImage: string;
    href?: string;
    location?: string;
}

export interface Stat {
    value: string;
    label: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    id?: string;
}

export interface GalleryItem {
    id: number;
    image: string;
    category: string;
}

export interface Career {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
}

export interface HistoryItem {
    year: string;
    title: string;
    description: string;
}

export interface Testimonial {
    name: string;
    role: string;
    content: string;
    avatar: string;
    quote?: string;
    author?: string;
    company?: string;
    id?: string;
}

export interface SiteConfig {
    name: string;
    fullName: string;
    description: string;
    tagline?: string;
    descriptionShort: string;
    copyright: string;
    experienceYears: number;
    projectsCompleted: number;
    logo: {
        image: string;
        text: string;
    };
    contact: {
        office: string;
        corporatePark: string;
        phone: string;
        email: string;
        supportEmail: string;
        contactEmail: string;
        phoneAlt: string;
    };
    socials: {
        name: string;
        icon: string;
        url: string;
    }[];
    homeStrings: {
        hero: {
            title: string;
            highlightedText: string;
            subtitle: string;
            primaryButton: string;
            secondaryButton: string;
        };
        overview: {
            eyebrow: string;
            title: string;
            highlightedTitle: string;
            description: string;
            yearsLabel: string;
        };
        services: {
            eyebrow: string;
            title: string;
            buttonText: string;
        };
        portfolio: {
            eyebrow: string;
            title: string;
            description: string;
            buttonText: string;
        };
        testimonials: {
            eyebrow: string;
            title: string;
        };
        cta: {
            title: string;
            highlightedWord: string;
            description: string;
            primaryButton: string;
            secondaryButton: string;
        };
    };
    common: {
        getQuote: string;
    };
    aboutStrings: {
        hero: {
            title: string;
            subtitle: string;
            description: string;
        };
        story: {
            eyebrow: string;
            title: string;
            highlightedTitle: string;
            p1: string;
            quote: string;
        };
        mission: {
            title: string;
            desc: string;
        };
        vision: {
            title: string;
            desc: string;
        };
        leadership: {
            eyebrow: string;
            title: string;
            description: string;
        };
        journey: {
            eyebrow: string;
            title: string;
        };
    };
    projectsStrings: {
        hero: {
            title: string;
            subtitle: string;
            description: string;
        };
        intro: {
            eyebrow: string;
            title: string;
            description: string;
        };
    };
    servicesStrings: {
        hero: {
            title: string;
            subtitle: string;
            description: string;
        };
        cta: {
            title: string;
            highlightedWord: string;
            description: string;
            primaryButton: string;
            secondaryButton: string;
        };
    };
    careersStrings: {
        hero: {
            title: string;
            subtitle: string;
            description: string;
        };
        intro: {
            eyebrow: string;
            title: string;
            description: string;
        };
        culture: {
            eyebrow: string;
            title: string;
            highlightedTitle: string;
            description: string;
            points: string[];
            openAppLabel: string;
            openAppButton: string;
        };
    };
    galleryStrings: {
        hero: {
            title: string;
            description: string;
        };
        cta: {
            title: string;
            description: string;
            primaryButton: string;
            secondaryButton: string;
        };
    };
}

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterSection {
    heading: string;
    links: FooterLink[];
}

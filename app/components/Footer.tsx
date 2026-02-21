import Link from "next/link";
import { siteConfig, navItems, services } from "@/lib/data/data";

export default function Footer() {
    return (
        <footer className="pt-20 pb-10 bg-white text-secondary border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <img src={siteConfig.logo.image} alt={siteConfig.logo.text} className="h-10 w-auto object-contain" />
                        </div>
                        <p className="text-sm leading-relaxed mb-8 text-slate-500 font-medium">
                            Excellence in infrastructure and construction since 1998. Building tomorrow&apos;s landmarks with precision and integrity.
                        </p>
                        <div className="flex gap-4">
                            {siteConfig.socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-all bg-slate-100 text-secondary hover:text-white shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-xl">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-6 text-secondary italic">Quick Links</h5>
                        <ul className="space-y-4">
                            {navItems.slice(1).map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="hover:text-primary transition-colors text-sm text-slate-500 font-bold">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-6 text-secondary italic">Our Services</h5>
                        <ul className="space-y-4">
                            {services.map((service) => (
                                <li key={service.id}>
                                    <Link href={`/services#${service.id}`} className="hover:text-primary transition-colors text-sm text-slate-500 font-bold">
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-6 text-secondary italic">Contact Us</h5>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <span className="text-sm text-slate-500 font-medium leading-loose">
                                    {siteConfig.contact.corporatePark}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">call</span>
                                <span className="text-sm text-slate-500 font-bold">{siteConfig.contact.phoneAlt}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <span className="text-sm text-slate-500 font-bold">{siteConfig.contact.contactEmail}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-slate-100">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 italic">
                        © 2024 {siteConfig.fullName}. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-primary text-[10px] uppercase font-bold tracking-widest text-slate-400">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary text-[10px] uppercase font-bold tracking-widest text-slate-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

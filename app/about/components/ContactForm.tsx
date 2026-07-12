"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useSiteConfig } from "@/components/siteconfig-context";

export default function ContactForm() {
    const config = useSiteConfig();

    const fullAddress = [config.address1, config.address2, config.city, config.state]
        .filter(Boolean)
        .join(", ");
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to send");
            setSent(true);
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
            setTimeout(() => setSent(false), 4000);
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    };

    const contactInfo = [
        ...(fullAddress ? [{ icon: "location_on", label: "Head Office", value: fullAddress }] : []),
        ...(config.phone ? [{ icon: "call", label: "Phone", value: config.phone }] : []),
        ...(config.email ? [{ icon: "mail", label: "Email", value: config.email }] : []),
    ];

    return (
        <section id="contact" className="scroll-mt-24 py-24 md:py-32 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4"
                >
                    <span className="eyebrow block">Get In Touch</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">
                        Let&apos;s Build Together
                    </h2>
                    <p className="text-secondary/60 text-lg font-light">
                        Have a project in mind? Reach out and our team will get back to you within 24 hours.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid lg:grid-cols-5 gap-12 lg:gap-16"
                >
                    {/* Contact Info */}
                    <motion.div variants={fadeUp} className="lg:col-span-2 space-y-8">
                        {contactInfo.map((item) => (
                            <div key={item.label} className="flex gap-5">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary/40 mb-1">{item.label}</p>
                                    <p className="text-secondary/80 text-sm leading-relaxed">{item.value}</p>
                                </div>
                            </div>
                        ))}

                        {/* Map placeholder */}
                        <div className="mt-4 aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                            <iframe
                                title="Office Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5!2d77.22!3d28.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzEyLjAiTiA3N8KwMTMnMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div variants={fadeUp} className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10 space-y-6">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary/50">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-secondary placeholder:text-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary/50">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-secondary placeholder:text-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary/50">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-secondary placeholder:text-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary/50">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={form.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                                    >
                                        <option value="" disabled>Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="project">New Project</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="careers">Careers</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary/50">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your project or inquiry..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-secondary placeholder:text-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={sending}
                                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-white px-10 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.97]"
                            >
                                {sending ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
                                {!sending && !sent && (
                                    <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5">
                                        arrow_forward
                                    </span>
                                )}
                                {sent && (
                                    <span className="material-symbols-outlined text-base">check_circle</span>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

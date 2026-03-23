"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Linkedin02Icon,
  WhatsappIcon,
  Mail01Icon,
  CallIcon,
} from "@hugeicons/core-free-icons";
import { Share2, X } from "lucide-react";
import { useSiteConfig } from "@/components/siteconfig-context";

export default function FloatingSpeedDial() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const config = useSiteConfig();

  // Hide on admin/dashboard and login pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return null;

  const actions = [
    {
      label: "LinkedIn",
      icon: Linkedin02Icon,
      href: "https://www.linkedin.com/company/anuranjan-infratech",
      color: "bg-[#0077B5]",
      show: true,
    },
    {
      label: "WhatsApp",
      icon: WhatsappIcon,
      href: config.mobile
        ? `https://wa.me/${config.mobile.replace(/\s/g, "").replace(/^\+/, "")}`
        : `https://wa.me/`,
      color: "bg-[#25D366]",
      show: !!config.mobile,
    },
    {
      label: "Email",
      icon: Mail01Icon,
      href: `mailto:${config.email}`,
      color: "bg-[#EA4335]",
      show: !!config.email,
    },
    {
      label: "Call Us",
      icon: CallIcon,
      href: `tel:${config.phone.replace(/\s/g, "")}`,
      color: "bg-[#1976D2]",
      show: !!config.phone,
    },
  ].filter((a) => a.show);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {/* Main FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className={`btn btn-circle btn-lg shadow-xl border-0 text-white transition-transform duration-300 ${
          open
            ? "bg-secondary hover:bg-secondary/90 rotate-45"
            : "bg-primary hover:bg-primary/90"
        }`}
        aria-label={open ? "Close menu" : "Open contact menu"}
      >
        {open ? (
          <X size={24} className="transition-transform duration-300" />
        ) : (
          <Share2 size={24} className="transition-transform duration-300" />
        )}
      </button>

      {/* Speed dial actions */}
      {actions.map((action, i) => (
        <div
          key={action.label}
          className={`flex items-center gap-2 transition-all duration-300 ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
        >
          {/* Tooltip label */}
          <span className="bg-secondary text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-md whitespace-nowrap select-none">
            {action.label}
          </span>

          {/* Action button */}
          <a
            href={action.href}
            target={action.label === "LinkedIn" ? "_blank" : undefined}
            rel={action.label === "LinkedIn" ? "noopener noreferrer" : undefined}
            className={`btn btn-circle btn-md shadow-lg border-0 text-white ${action.color} hover:brightness-110 transition-all`}
            aria-label={action.label}
          >
            <HugeiconsIcon icon={action.icon} size={20} />
          </a>
        </div>
      ))}
    </div>
  );
}

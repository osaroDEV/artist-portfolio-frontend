"use client";

import { Link, usePathname } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/recently", label: t("recently") },
    { href: "/paintings", label: t("paintings") },
    { href: "/drawings", label: t("drawings") },
    { href: "/photography", label: t("photography") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="z-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col p-12 border-r border-transparent">
        {/* Logo */}
        <Link href="/" className="group mb-16">
          <h1 className="text-3xl md:text-4xl font-light leading-[1.1] tracking-[-0.02em] text-brand-charcoal">
            Ella
            <br />
            Becker
          </h1>
        </Link>

        {/* Desktop Nav Items */}
        <div className="flex flex-col space-y-4 mb-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as any}
              className={`text-xs uppercase tracking-[0.2em] transition-all hover:translate-x-1 hover:text-brand-pink ${
                isActive(item.href)
                  ? "text-brand-pink font-medium"
                  : "text-brand-charcoal/80"
              }`}
            >
              {isActive(item.href) && <span className="mr-2">—</span>}
              {item.label}
            </Link>
          ))}
        </div>


      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 px-6 py-6 border-b border-brand-charcoal/5 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-light tracking-tight">Ella Becker</h1>
        </Link>
        <button className="p-2" onClick={() => setIsOpen(true)}>
          <Menu size={20} strokeWidth={1} />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-60 bg-brand-cream p-12 flex flex-col pointer-events-auto"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsOpen(false)}>
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl font-serif font-light transition-colors hover:text-brand-pink ${
                    isActive(item.href) ? "text-brand-pink italic" : "opacity-70"
                  }`}
                >
                  {item.label}
                  <div className="h-px w-0 bg-brand-charcoal transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-brand-charcoal/10 flex flex-col space-y-8">
              <LanguageSwitcher />
              <div className="text-[10px] uppercase tracking-widest opacity-70">
                <span>© 2026 Ella Becker. All rights reserved.</span>
                <br />
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest opacity-70">
                  {" "}
                  Website by{" "}
                  <a
                    href="https://codeillustrated.com/labs"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code Illustrated Labs
                  </a>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop Language Switcher (Top Right) */}
      <div className="hidden md:block fixed top-12 right-12 z-50">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

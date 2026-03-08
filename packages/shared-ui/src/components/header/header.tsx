"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type CtaButton = {
  label: string;
  href: string;
};

export type NavStyle = "flat" | "dropdown" | "mega";

export type HeaderProps = {
  logo: string;
  logoAlt: string;
  navItems: NavItem[];
  ctaButton: CtaButton;
  sticky: boolean;
  navStyle?: NavStyle;
};

function scrollToAnchor(
  anchorId: string,
  behavior: ScrollBehavior = "smooth",
  attempt = 0
) {
  if (typeof window === "undefined") {
    return;
  }

  const target = document.getElementById(anchorId);

  if (target) {
    target.scrollIntoView({ behavior, block: "start" });

    if (window.location.hash !== `#${anchorId}`) {
      window.history.replaceState(null, "", `/#${anchorId}`);
    }

    return;
  }

  if (attempt < 12) {
    window.setTimeout(() => scrollToAnchor(anchorId, behavior, attempt + 1), 90);
  }
}

function DesktopDropdown({ children }: { children: NavItem[] }) {
  return (
    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
      <div className="rounded-lg py-2 shadow-lg bg-[var(--surface)] border border-[color:var(--border)]">
        {children.map((child) => (
          <a
            key={child.href}
            href={child.href}
            className="block px-4 py-2 text-sm font-medium transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--primary)]"
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function DesktopMegaMenu({ items }: { items: NavItem[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-[90vw] max-w-[600px]">
      <div className="rounded-lg p-6 shadow-lg grid grid-cols-2 gap-6 bg-[var(--surface)] border border-[color:var(--border)]">
        {items.map((child) => (
          <a
            key={child.href}
            href={child.href}
            className="block text-sm font-medium py-1 transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--primary)]"
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function MobileAccordion({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.children || item.children.length === 0) {
    return (
      <a
        href={item.href}
        className="text-sm font-medium py-1 text-[color:var(--text-secondary)]"
        onClick={(event) => onNavigate(event, item.href)}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="w-full flex items-center justify-between text-sm font-medium py-1 text-[color:var(--text-secondary)]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-80" : "max-h-0"}`}>
        <div>
          <div className="flex flex-col gap-2 pl-4 pt-2">
            {item.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className="text-sm py-1 text-[color:var(--text-secondary)]"
                onClick={(event) => onNavigate(event, child.href)}
              >
                {child.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header({
  logo,
  logoAlt,
  navItems,
  ctaButton,
  sticky,
  navStyle = "flat",
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { body } = document;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    if (menuOpen && isMobile) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === "undefined" || !menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleHashScroll = () => {
      if (window.location.pathname !== "/") {
        return;
      }

      const anchorId = window.location.hash.replace(/^#/, "").trim();

      if (!anchorId) {
        return;
      }

      scrollToAnchor(anchorId, "auto");
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false
  ) => {
    if (closeMenu) {
      setMenuOpen(false);
    }

    if (typeof window === "undefined" || !href.includes("#")) {
      return;
    }

    const [pathPart, hashPart] = href.split("#");
    const anchorId = hashPart?.trim();

    if (!anchorId) {
      return;
    }

    const isHomeAnchor = pathPart === "" || pathPart === "/";
    const isOnHomePage = window.location.pathname === "/";

    if (!isHomeAnchor) {
      return;
    }

    if (!isOnHomePage) {
      event.preventDefault();
      window.location.assign(`/#${anchorId}`);
      return;
    }

    event.preventDefault();
    scrollToAnchor(anchorId, "smooth");
  };

  return (
    <header
      className={`${sticky ? "sticky top-0" : "relative"} z-50 border-b border-[color:var(--border)] backdrop-blur-xl bg-[color:color-mix(in_oklch,var(--surface)_92%,transparent)] shadow-[0_6px_22px_color-mix(in_oklch,var(--foreground)_8%,transparent)]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            {logo ? (
              <img
                src={logo}
                alt={logoAlt}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="text-xl font-bold text-[color:var(--primary)]">
                {logoAlt}
              </span>
            )}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const hasChildren =
                item.children &&
                item.children.length > 0 &&
                navStyle !== "flat";

              if (!hasChildren) {
                return (
                  <a
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className="text-sm font-medium transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--primary)]"
                    onClick={(event) => handleNavClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <div key={item.label} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-medium transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--primary)]"
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </button>
                  {navStyle === "mega" ? (
                    <DesktopMegaMenu items={item.children!} />
                  ) : (
                    <DesktopDropdown children={item.children!} />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href={ctaButton.href}
              className="px-4 py-2 text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:opacity-95 bg-[var(--primary)] text-[color:var(--primary-foreground)]"
            >
              {ctaButton.label}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
            aria-controls="mobile-main-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className={`block w-5 h-0.5 transition-transform duration-200 bg-[var(--text-primary)] ${
                menuOpen ? "rotate-45 translate-x-[2px] translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 transition-opacity duration-200 bg-[var(--text-primary)] ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-0.5 transition-transform duration-200 bg-[var(--text-primary)] ${
                menuOpen ? "-rotate-45 translate-x-[2px] -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t bg-[var(--surface)]/98 border-[color:var(--border)]">
          <nav id="mobile-main-menu" className="flex flex-col px-4 py-4 gap-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) =>
              navStyle !== "flat" &&
              item.children &&
              item.children.length > 0 ? (
                <MobileAccordion
                  key={item.label}
                  item={item}
                  onNavigate={(event, href) => handleNavClick(event, href, true)}
                />
              ) : (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="text-sm font-medium py-2 text-[color:var(--text-secondary)]"
                  onClick={(event) => handleNavClick(event, item.href, true)}
                >
                  {item.label}
                </a>
              ),
            )}
            <a
              href={ctaButton.href}
              className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-full text-center bg-[var(--primary)] text-[color:var(--primary-foreground)]"
              onClick={() => setMenuOpen(false)}
            >
              {ctaButton.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

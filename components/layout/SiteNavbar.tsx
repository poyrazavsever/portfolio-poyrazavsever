"use client";

import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarTopBar,
  NavbarMain,
  NavbarBrand,
  NavbarLinks,
  NavbarDropdown,
  NavbarMegaMenu,
  NavbarMegaMenuItem,
  NavbarActions,
  NavbarMobileToggle,
  NavbarMobileMenu,
  NavbarMobileLink,
  NavbarMobileGroup,
  NavbarMobileActions,
} from "poyraz-ui/organisms";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "poyraz-ui/molecules";
import { Button, Badge, Logo } from "poyraz-ui/atoms";
import { Icon } from "@iconify/react";

const SOCIAL_LINKS = [
  {
    id: "email",
    label: "E-Mail",
    href: "mailto:poyrazavsever@gmail.com",
    icon: "mdi:email",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/poyrazavsever/",
    icon: "mdi:linkedin",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/poyrazavsever",
    icon: "mdi:github",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/poyraz_avsever",
    icon: "mdi:instagram",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@poyrazavsever",
    icon: "mdi:youtube",
  },
  {
    id: "medium",
    label: "Medium",
    href: "https://medium.com/@poyrazavsever",
    icon: "mdi:medium",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/poyrazavsever",
    icon: "ri:twitter-x-fill",
  },
  {
    id: "behance",
    label: "Behance",
    href: "https://behance.net/poyrazavsever",
    icon: "mdi:behance",
  },
  {
    id: "spotify",
    label: "Spotify",
    href: "https://open.spotify.com/user/3136fdjkc5p4cbzmuxhvqdd4b2hu",
    icon: "mdi:spotify",
  },
] as const;

function TopBarClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Istanbul",
        }),
      );
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      Based in <strong>Ankara</strong>, {time}
    </span>
  );
}

export function SiteNavbar() {
  return (
    <Navbar
      variant="bordered"
      sticky
      autoHide
      containerClassName="max-w-6xl mx-auto px-4"
    >
      {/* ── Top Bar ── */}
      <NavbarTopBar>
        <div className="flex items-center justify-between w-full text-xs py-0.5">
          <TopBarClock />
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <Drawer>
              <DrawerTrigger asChild>
                <Badge className="cursor-pointer">Social Links</Badge>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Social Links</DrawerTitle>
                  </DrawerHeader>
                  <div className="grid grid-cols-3 gap-3 px-4 pb-2">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5 border border-dashed border-neutral-300 dark:border-neutral-700 p-3 hover:border-red-600 hover:text-red-600 transition-colors"
                      >
                        <Icon icon={link.icon} width={24} height={24} />
                        <span className="text-xs font-medium">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className="w-full">
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <a href="/rss.xml">
              <Badge className="cursor-pointer text-xs">RSS</Badge>
            </a>
            <a
              href="https://stats.uptimerobot.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge className="cursor-pointer text-xs">Status</Badge>
            </a>

            <Drawer>
              <DrawerTrigger asChild>
                <Badge className="cursor-pointer text-xs">Settings</Badge>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Settings</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col gap-4 px-4 pb-2">
                    <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="mdi:theme-light-dark"
                          width={20}
                          height={20}
                        />
                        <span className="text-sm font-medium">Theme</span>
                      </div>
                      <Badge>System</Badge>
                    </div>
                    <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:translate" width={20} height={20} />
                        <span className="text-sm font-medium">Language</span>
                      </div>
                      <Badge>EN</Badge>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className="w-full">
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </NavbarTopBar>

      {/* ── Main Row ── */}
      <NavbarMain>
        <NavbarBrand>
          <Logo
            src="/logo/logo.jpeg"
            href="/"
            alt="Poyraz Avsever"
            width={40}
            height={40}
          />
        </NavbarBrand>

        <NavbarLinks>
          {/* ── 1. Showcase ── */}
          <NavbarDropdown label="Showcase">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Featured Projects"
                description="End-to-end platforms like Freelancer Portal"
                href="/showcase/portfolio"
              />
              <NavbarMegaMenuItem
                title="Full-Stack Architecture Cases"
                description="Database and server architecture breakdowns"
                href="/showcase/fullstack-cases"
              />
              <NavbarMegaMenuItem
                title="UI/UX & Brand Identity Cases"
                description="User experience research and design stories"
                href="/showcase/design-cases"
              />
              <NavbarMegaMenuItem
                title="Open Source & Packages"
                description="GitHub contributions and community work"
                href="/showcase/open-source"
              />
              <NavbarMegaMenuItem
                title="Poyraz UI Kit ↗"
                description="ui.poyrazavsever.com — brutalist design system"
                href="https://ui.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title="All Projects (Archive)"
                description="Complete project archive from past to present"
                href="/showcase/archive"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 2. Products ── */}
          <NavbarDropdown label="Products">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Freelancer & Agency Workspace ↗"
                description="portal.poyrazavsever.com — project management hub"
                href="https://portal.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title="SaaS Projects"
                description="Software as a Service solutions"
                href="/products/saas"
              />
              <NavbarMegaMenuItem
                title="Mobile Applications"
                description="iOS and Android apps built with React Native"
                href="/products/mobile-apps"
              />
              <NavbarMegaMenuItem
                title="Figma Templates"
                description="Ready-to-use UI design kits and templates"
                href="/products/figma-templates"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 3. Client Portal ── */}
          <NavbarDropdown label="Client Portal">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Client Login ↗"
                description="portal.poyrazavsever.com/login"
                href="https://portal.poyrazavsever.com/login"
              />
              <NavbarMegaMenuItem
                title="My Services"
                description="Full-Stack Development, UI/UX Design"
                href="/services"
              />
              <NavbarMegaMenuItem
                title="Workflow & Process"
                description="How I take a project from zero to production"
                href="/services/workflow"
              />
              <NavbarMegaMenuItem
                title="Pricing & Retainers"
                description="Transparent pricing policy and packages"
                href="/services/pricing"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 4. Media & Insights ── */}
          <NavbarDropdown label="Media">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Poyraz ile Masa Başı"
                description="Live series — every Wednesday at 20:00"
                href="/media/masa-basi"
              />
              <NavbarMegaMenuItem
                title="Past Episodes & Guests"
                description="Archive of previous broadcasts"
                href="/media/masa-basi/archive"
              />
              <NavbarMegaMenuItem
                title="Poyraz ile Yazılıma Dair"
                description="Podcast series - Tech & Engineering"
                href="/media/yazilima-dair"
              />
              <NavbarMegaMenuItem
                title="Tech & Engineering Blog"
                description="Articles on software and engineering"
                href="/media/blog"
              />
              <NavbarMegaMenuItem
                title="Social Hub"
                description="YouTube, Instagram, LinkedIn and more"
                href="/media/social-hub"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 5. Academy ── */}
          <NavbarDropdown label="Academy">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="The 52-Week Journey ↗"
                description="js.poyrazavsever.com — weekly full-stack plan"
                href="https://js.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title="Certifications"
                description="BTK Akademi, Udemy and other course notes"
                href="/academy/certifications"
              />
              <NavbarMegaMenuItem
                title="My Reading & Watch List"
                description="Books, videos and recommended resources"
                href="/academy/reading-list"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 6. Ecosystem ── */}
          <NavbarDropdown label="Ecosystem">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="System Status ↗"
                description="status.poyrazavsever.com — uptime monitor"
                href="https://status.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title="Self-Hosted Architecture"
                description="Coolify, Supabase, Monorepo & Reverse Proxy"
                href="/ecosystem/architecture"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 7. About ── */}
          <NavbarDropdown label="About">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="My Story & Vision"
                description="Who I am and where I'm headed"
                href="/about"
              />
              <NavbarMegaMenuItem
                title="Career & Experience"
                description="Professional roles and positions"
                href="/career/experience"
              />
              <NavbarMegaMenuItem
                title="Academic Education"
                description="Software engineering degree journey"
                href="/career/education"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>
        </NavbarLinks>

        <NavbarActions>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://portal.poyrazavsever.com/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="/contact">Contact</a>
          </Button>
        </NavbarActions>

        <NavbarMobileToggle />
      </NavbarMain>

      {/* ── Mobile Menu ── */}
      <NavbarMobileMenu>
        <div className="flex flex-wrap gap-2 px-4 py-3">
          <Drawer>
            <DrawerTrigger asChild>
              <Badge className="cursor-pointer">Social Links</Badge>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Social Links</DrawerTitle>
                </DrawerHeader>
                <div className="grid grid-cols-3 gap-3 px-4 pb-2">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1.5 border border-dashed border-neutral-300 dark:border-neutral-700 p-3 hover:border-red-600 hover:text-red-600 transition-colors"
                    >
                      <Icon icon={link.icon} width={24} height={24} />
                      <span className="text-xs font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <a href="/rss.xml">
            <Badge className="cursor-pointer">RSS</Badge>
          </a>
          <a
            href="https://stats.uptimerobot.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge className="cursor-pointer">Status</Badge>
          </a>

          <Drawer>
            <DrawerTrigger asChild>
              <Badge className="cursor-pointer">Settings</Badge>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Settings</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 px-4 pb-2">
                  <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:theme-light-dark"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm font-medium">Theme</span>
                    </div>
                    <Badge>System</Badge>
                  </div>
                  <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:translate" width={20} height={20} />
                      <span className="text-sm font-medium">Language</span>
                    </div>
                    <Badge>EN</Badge>
                  </div>
                  <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:format-font" width={20} height={20} />
                      <span className="text-sm font-medium">Font Size</span>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <NavbarMobileGroup label="Showcase">
          <NavbarMobileLink href="/showcase/saas">
            SaaS & Platform Solutions
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/ecommerce">
            Global E-Commerce & B2B
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/fullstack-cases">
            Full-Stack Architecture Cases
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/design-cases">
            UI/UX & Brand Identity Cases
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/open-source">
            Open Source & Packages
          </NavbarMobileLink>
          <NavbarMobileLink href="https://ui.poyrazavsever.com">
            Poyraz UI Kit ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/archive">
            All Projects (Archive)
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Products">
          <NavbarMobileLink href="https://portal.poyrazavsever.com">
            Freelancer & Agency Workspace ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/saas">
            SaaS Projects
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/mobile-apps">
            Mobile Applications
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/figma-templates">
            Premium Figma Templates
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/micro-tools">
            Developer Micro-Tools
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/apis">
            Open APIs & Endpoints
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Client Portal">
          <NavbarMobileLink href="https://portal.poyrazavsever.com/login">
            Client Login ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/services">My Services</NavbarMobileLink>
          <NavbarMobileLink href="/services/workflow">
            Workflow & Process
          </NavbarMobileLink>
          <NavbarMobileLink href="/pricing">
            Pricing & Retainers
          </NavbarMobileLink>
          <NavbarMobileLink href="/client/meeting">
            Book a Discovery Call
          </NavbarMobileLink>
          <NavbarMobileLink href="/client/proposal">
            Project Inquiry Form
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Media">
          <NavbarMobileLink href="/media/masa-basi">
            Poyraz ile Masa Başı
          </NavbarMobileLink>
          <NavbarMobileLink href="/media/masa-basi/archive">
            Past Episodes & Guests
          </NavbarMobileLink>
          <NavbarMobileLink href="/media/masa-basi/apply">
            Apply to be a Guest
          </NavbarMobileLink>
          <NavbarMobileLink href="/blog">
            Tech & Engineering Blog
          </NavbarMobileLink>
          <NavbarMobileLink href="/research/system-design">
            System Design Deep Dives
          </NavbarMobileLink>
          <NavbarMobileLink href="/research/ui-ux">
            UI/UX Principles & Trends
          </NavbarMobileLink>
          <NavbarMobileLink href="/media/social">Social Hub</NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Academy">
          <NavbarMobileLink href="https://js.poyrazavsever.com">
            The 52-Week Journey ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/academy/course-notes">
            Course Notes & Certifications
          </NavbarMobileLink>
          <NavbarMobileLink href="/academy/reading-list">
            My Reading & Watch List
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Ecosystem">
          <NavbarMobileLink href="https://status.poyrazavsever.com">
            System Status ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/ecosystem/architecture">
            Self-Hosted Architecture
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="About">
          <NavbarMobileLink href="/about">My Story & Vision</NavbarMobileLink>
          <NavbarMobileLink href="/career/experience">
            Career & Experience
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/education">
            Academic Education
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/resume">
            Interactive Resume
          </NavbarMobileLink>
          <NavbarMobileLink href="/contact">Contact Me</NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileActions>
          <Button variant="outline" className="w-full" asChild>
            <a
              href="https://portal.poyrazavsever.com/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login
            </a>
          </Button>
          <Button className="w-full" asChild>
            <a href="/contact">Contact</a>
          </Button>
        </NavbarMobileActions>
      </NavbarMobileMenu>
    </Navbar>
  );
}

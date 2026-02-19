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
import { Button, Badge, Logo } from "poyraz-ui/atoms";

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
            <a
              href="https://linktr.ee/poyrazavsever"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge className="cursor-pointer">Social Links</Badge>
            </a>
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
            <a href="/settings">
              <Badge className="cursor-pointer text-xs">Settings</Badge>
            </a>
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
                title="Web Applications"
                description="Next.js & Node.js full-stack projects"
                href="/showcase/web"
              />
              <NavbarMegaMenuItem
                title="Mobile Applications"
                description="React Native cross-platform apps"
                href="/showcase/mobile"
              />
              <NavbarMegaMenuItem
                title="Desktop Applications"
                description="Electron.js desktop solutions"
                href="/showcase/desktop"
              />
              <NavbarMegaMenuItem
                title="UI/UX Design Projects"
                description="Interface design and prototyping work"
                href="/showcase/design"
              />
              <NavbarMegaMenuItem
                title="Technical Case Studies"
                description="In-depth breakdowns of real projects"
                href="/showcase/case-studies"
              />
              <NavbarMegaMenuItem
                title="Open Source Contributions"
                description="GitHub repositories and community work"
                href="/showcase/open-source"
              />
              <NavbarMegaMenuItem
                title="Tech Stack & Arsenal"
                description="Frontend, Backend & DevOps tools I use"
                href="/showcase/tech-stack"
              />
              <NavbarMegaMenuItem
                title="Poyraz UI Kit ↗"
                description="ui.poyrazavsever.com — brutalist component kit"
                href="https://ui.poyrazavsever.com"
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
                title="Figma Design Templates"
                description="Ready-to-use UI design kits and templates"
                href="/products/figma-templates"
              />
              <NavbarMegaMenuItem
                title="Mobile Utilities & Apps"
                description="Utility apps published on app stores"
                href="/products/mobile-apps"
              />
              <NavbarMegaMenuItem
                title="Developer Micro-Tools"
                description="Small utilities built for developers"
                href="/products/micro-tools"
              />
              <NavbarMegaMenuItem
                title="Open APIs & Endpoints"
                description="Public APIs and open data endpoints"
                href="/products/apis"
              />
              <NavbarMegaMenuItem
                title="CLI Tools & Packages"
                description="Command-line tools and npm packages"
                href="/products/cli"
              />
              <NavbarMegaMenuItem
                title="Notion / Productivity Templates"
                description="Workflows, dashboards and productivity systems"
                href="/products/notion-templates"
              />
              <NavbarMegaMenuItem
                title="Upcoming Beta Releases"
                description="Products currently in active development"
                href="/products/beta"
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
                title="Full-Stack Development Services"
                description="End-to-end web & app development"
                href="/services/fullstack"
              />
              <NavbarMegaMenuItem
                title="UI/UX & Brand Identity Design"
                description="Design systems, branding and prototyping"
                href="/services/design"
              />
              <NavbarMegaMenuItem
                title="System Architecture Consulting"
                description="Scalable, production-ready system design"
                href="/services/architecture"
              />
              <NavbarMegaMenuItem
                title="Project Process & Workflow"
                description="How I manage projects from start to delivery"
                href="/services/workflow"
              />
              <NavbarMegaMenuItem
                title="Pricing & Packages"
                description="Transparent pricing for every scope"
                href="/pricing"
              />
              <NavbarMegaMenuItem
                title="Book a Meeting"
                description="Schedule a discovery call via Calendly"
                href="/client/meeting"
              />
              <NavbarMegaMenuItem
                title="Request a Proposal"
                description="Submit your project brief for a custom quote"
                href="/client/proposal"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 4. Content & Research ── */}
          <NavbarDropdown label="Content">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Blog & Tech Articles"
                description="Software, design and engineering posts"
                href="/blog"
              />
              <NavbarMegaMenuItem
                title="System Design Researches"
                description="Deep dives into architecture patterns"
                href="/research/system-design"
              />
              <NavbarMegaMenuItem
                title="PoC & R&D Notes"
                description="Proof of concept experiments and findings"
                href="/research/poc"
              />
              <NavbarMegaMenuItem
                title="UI/UX Best Practices"
                description="Principles, patterns and design guidelines"
                href="/research/ui-ux-practices"
              />
              <NavbarMegaMenuItem
                title="Poyraz ile Masa Başı"
                description="YouTube live series — every Sunday at 20:00"
                href="/content/masa-basi"
              />
              <NavbarMegaMenuItem
                title="Live Broadcast & Guest Schedule"
                description="Upcoming streams and guest appearances"
                href="/content/broadcast-schedule"
              />
              <NavbarMegaMenuItem
                title="Sponsorship & Collab Inquiries"
                description="Brand deals and collaboration opportunities"
                href="/content/sponsorship"
              />
              <NavbarMegaMenuItem
                title="Social Media Hub"
                description="YouTube, Instagram, LinkedIn and more"
                href="/content/social"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 5. Learning & Academy ── */}
          <NavbarDropdown label="Learning">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="52-Week Engineering Plan"
                description="Weekly full-stack and system design goals"
                href="/learning/52-week-plan"
              />
              <NavbarMegaMenuItem
                title="Playgrounds & Labs ↗"
                description="js.poyrazavsever.com — interactive code experiments"
                href="https://js.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title="Live Broadcast Clones ↗"
                description="meet.poyrazavsever.com — projects built live"
                href="https://meet.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title="BTK Akademi & Udemy Notes"
                description="Course summaries and takeaways"
                href="/learning/course-notes"
              />
              <NavbarMegaMenuItem
                title="Certifications & Badges"
                description="Earned certificates and achievements"
                href="/learning/certifications"
              />
              <NavbarMegaMenuItem
                title="Technical English Journey"
                description="English learning progress and resources"
                href="/learning/english"
              />
              <NavbarMegaMenuItem
                title="My Reading & Watch List"
                description="Books, videos and resources I recommend"
                href="/learning/reading-list"
              />
              <NavbarMegaMenuItem
                title="Personal Coding Guidelines"
                description="My conventions, standards and best practices"
                href="/learning/coding-guidelines"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 6. About ── */}
          <NavbarDropdown label="About">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="My Story & Vision"
                description="Who I am and where I'm headed"
                href="/about"
              />
              <NavbarMegaMenuItem
                title="Academic Education"
                description="Software engineering degree journey"
                href="/career/education"
              />
              <NavbarMegaMenuItem
                title="Work Experience"
                description="Professional roles and positions"
                href="/career/experience"
              />
              <NavbarMegaMenuItem
                title="Interactive Resume (CV)"
                description="Downloadable PDF and online CV"
                href="/career/resume"
              />
              <NavbarMegaMenuItem
                title="System Status ↗"
                description="status.poyrazavsever.com — uptime monitor"
                href="https://status.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title="Infrastructure Architecture"
                description="Coolify, Supabase & self-hosted stack"
                href="/about/infrastructure"
              />
              <NavbarMegaMenuItem
                title="Brand Guidelines & Press Kit"
                description="Logos, colors, typography and media assets"
                href="/about/brand"
              />
              <NavbarMegaMenuItem
                title="Contact Information"
                description="Email, social links and booking"
                href="/contact"
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
            <a href="/contact">Let&apos;s Start</a>
          </Button>
        </NavbarActions>

        <NavbarMobileToggle />
      </NavbarMain>

      {/* ── Mobile Menu ── */}
      <NavbarMobileMenu>
        <div className="flex flex-wrap gap-2 px-4 py-3">
          <a
            href="https://linktr.ee/poyrazavsever"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge className="cursor-pointer">Social Links</Badge>
          </a>
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
          <a href="/settings">
            <Badge className="cursor-pointer">Settings</Badge>
          </a>
        </div>

        <NavbarMobileGroup label="Showcase">
          <NavbarMobileLink href="/showcase/web">
            Web Applications
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/mobile">
            Mobile Applications
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/desktop">
            Desktop Applications
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/design">
            UI/UX Design Projects
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/case-studies">
            Technical Case Studies
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/open-source">
            Open Source Contributions
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/tech-stack">
            Tech Stack & Arsenal
          </NavbarMobileLink>
          <NavbarMobileLink href="https://ui.poyrazavsever.com">
            Poyraz UI Kit ↗
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Products">
          <NavbarMobileLink href="https://portal.poyrazavsever.com">
            Freelancer & Agency Workspace ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/figma-templates">
            Figma Design Templates
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/mobile-apps">
            Mobile Utilities & Apps
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/micro-tools">
            Developer Micro-Tools
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/apis">
            Open APIs & Endpoints
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/cli">
            CLI Tools & Packages
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/notion-templates">
            Notion / Productivity Templates
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/beta">
            Upcoming Beta Releases
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Client Portal">
          <NavbarMobileLink href="https://portal.poyrazavsever.com/login">
            Client Login ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/services/fullstack">
            Full-Stack Development Services
          </NavbarMobileLink>
          <NavbarMobileLink href="/services/design">
            UI/UX & Brand Identity Design
          </NavbarMobileLink>
          <NavbarMobileLink href="/services/architecture">
            System Architecture Consulting
          </NavbarMobileLink>
          <NavbarMobileLink href="/services/workflow">
            Project Process & Workflow
          </NavbarMobileLink>
          <NavbarMobileLink href="/pricing">
            Pricing & Packages
          </NavbarMobileLink>
          <NavbarMobileLink href="/client/meeting">
            Book a Meeting
          </NavbarMobileLink>
          <NavbarMobileLink href="/client/proposal">
            Request a Proposal
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Content">
          <NavbarMobileLink href="/blog">Blog & Tech Articles</NavbarMobileLink>
          <NavbarMobileLink href="/research/system-design">
            System Design Researches
          </NavbarMobileLink>
          <NavbarMobileLink href="/research/poc">
            PoC & R&D Notes
          </NavbarMobileLink>
          <NavbarMobileLink href="/research/ui-ux-practices">
            UI/UX Best Practices
          </NavbarMobileLink>
          <NavbarMobileLink href="/content/masa-basi">
            Poyraz ile Masa Başı
          </NavbarMobileLink>
          <NavbarMobileLink href="/content/broadcast-schedule">
            Live Broadcast & Guest Schedule
          </NavbarMobileLink>
          <NavbarMobileLink href="/content/sponsorship">
            Sponsorship & Collab Inquiries
          </NavbarMobileLink>
          <NavbarMobileLink href="/content/social">
            Social Media Hub
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Learning">
          <NavbarMobileLink href="/learning/52-week-plan">
            52-Week Engineering Plan
          </NavbarMobileLink>
          <NavbarMobileLink href="https://js.poyrazavsever.com">
            Playgrounds & Labs ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="https://meet.poyrazavsever.com">
            Live Broadcast Clones ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/learning/course-notes">
            BTK Akademi & Udemy Notes
          </NavbarMobileLink>
          <NavbarMobileLink href="/learning/certifications">
            Certifications & Badges
          </NavbarMobileLink>
          <NavbarMobileLink href="/learning/english">
            Technical English Journey
          </NavbarMobileLink>
          <NavbarMobileLink href="/learning/reading-list">
            My Reading & Watch List
          </NavbarMobileLink>
          <NavbarMobileLink href="/learning/coding-guidelines">
            Personal Coding Guidelines
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="About">
          <NavbarMobileLink href="/about">My Story & Vision</NavbarMobileLink>
          <NavbarMobileLink href="/career/education">
            Academic Education
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/experience">
            Work Experience
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/resume">
            Interactive Resume (CV)
          </NavbarMobileLink>
          <NavbarMobileLink href="https://status.poyrazavsever.com">
            System Status ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/about/infrastructure">
            Infrastructure Architecture
          </NavbarMobileLink>
          <NavbarMobileLink href="/about/brand">
            Brand Guidelines & Press Kit
          </NavbarMobileLink>
          <NavbarMobileLink href="/contact">
            Contact Information
          </NavbarMobileLink>
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
            <a href="/contact">Let&apos;s Start</a>
          </Button>
        </NavbarMobileActions>
      </NavbarMobileMenu>
    </Navbar>
  );
}

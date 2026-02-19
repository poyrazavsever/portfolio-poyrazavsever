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
  NavbarLink,
  NavbarDivider,
} from "poyraz-ui/organisms";
import { Button, Logo } from "poyraz-ui/atoms";

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
          <div className="flex items-center gap-5">
            <a
              href="https://linktr.ee/poyrazavsever"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-dashed"
            >
              Social Links
            </a>
            <a href="/rss.xml" className="hover:underline decoration-dashed">
              RSS
            </a>
            <a
              href="https://stats.uptimerobot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-dashed"
            >
              Status
            </a>
            <a href="/settings" className="hover:underline decoration-dashed">
              Settings
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
          {/* Showcase */}
          <NavbarDropdown label="Showcase">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Portfolio"
                description="Web, Mobile & Desktop projeleri"
              />
              <NavbarMegaMenuItem
                title="Case Studies"
                description="Derinlemesine vaka çalışmaları"
              />
              <NavbarMegaMenuItem
                title="Tech Stack & Arsenal"
                description="Frontend, Backend & DevOps araçları"
              />
              <NavbarMegaMenuItem
                title="Open Source"
                description="GitHub katkıları ve açık projeler"
              />
              <NavbarMegaMenuItem
                title="Design System ↗"
                description="Poyraz UI — brutalist component kit"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* Client Portal */}
          <NavbarDropdown label="Client Portal">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Freelancer Workspace ↗"
                description="portal.poyrazavsever.com'a git"
              />
              <NavbarMegaMenuItem
                title="Request a Proposal"
                description="Proje teklifini buradan ilet"
              />
              <NavbarMegaMenuItem
                title="Schedule a Meeting"
                description="Calendly ile toplantı ayarla"
              />
              <NavbarMegaMenuItem
                title="Client Login ↗"
                description="Devam eden projeni takip et"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* Products */}
          <NavbarDropdown label="Products">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Full-Stack Development"
                description="End-to-end uygulama geliştirme"
              />
              <NavbarMegaMenuItem
                title="UI/UX Design & Prototyping"
                description="Figma tabanlı tasarım ve prototipleme"
              />
              <NavbarMegaMenuItem
                title="System Architecture"
                description="Ölçeklenebilir mimari danışmanlığı"
              />
              <NavbarMegaMenuItem
                title="Micro-Tools & APIs"
                description="Açık kaynaklı araçlar ve API'ler"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* Resources */}
          <NavbarDropdown label="Resources">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="Blog & Articles"
                description="Yazılım ve tasarım üzerine yazılar"
              />
              <NavbarMegaMenuItem
                title="Research & Deep Dives"
                description="System design araştırmaları ve PoC notları"
              />
              <NavbarMegaMenuItem
                title="Masa Başı — YouTube"
                description="Her pazar 20:00 canlı yayın serisi"
              />
              <NavbarMegaMenuItem
                title="Social Media Hub"
                description="YouTube, Instagram ve LinkedIn akışları"
              />
              <NavbarMegaMenuItem
                title="52-Week Engineering Plan"
                description="Haftalık System Design & Full-Stack hedefleri"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* Career & Life */}
          <NavbarDropdown label="Career & Life">
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title="About Me"
                description="Hikayem, vizyonum ve hedeflerim"
              />
              <NavbarMegaMenuItem
                title="Experience"
                description="Profesyonel iş deneyimlerim"
              />
              <NavbarMegaMenuItem
                title="Education"
                description="Yazılım mühendisliği öğrencilik yolculuğum"
              />
              <NavbarMegaMenuItem
                title="Resume / CV"
                description="İndirilebilir PDF ve interaktif özgeçmiş"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          <NavbarDivider />

          <NavbarLink href="/pricing">Pricing</NavbarLink>
          <NavbarLink href="/contact">Contact</NavbarLink>
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
        <NavbarMobileGroup label="Showcase">
          <NavbarMobileLink href="/showcase/portfolio">
            Portfolio
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/case-studies">
            Case Studies
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/tech-stack">
            Tech Stack & Arsenal
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/open-source">
            Open Source
          </NavbarMobileLink>
          <NavbarMobileLink href="https://ui.poyrazavsever.com">
            Design System ↗
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Client Portal">
          <NavbarMobileLink href="https://portal.poyrazavsever.com">
            Freelancer Workspace ↗
          </NavbarMobileLink>
          <NavbarMobileLink href="/client/proposal">
            Request a Proposal
          </NavbarMobileLink>
          <NavbarMobileLink href="/client/meeting">
            Schedule a Meeting
          </NavbarMobileLink>
          <NavbarMobileLink href="https://portal.poyrazavsever.com/login">
            Client Login ↗
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Products">
          <NavbarMobileLink href="/services/fullstack">
            Full-Stack Development
          </NavbarMobileLink>
          <NavbarMobileLink href="/services/design">
            UI/UX Design & Prototyping
          </NavbarMobileLink>
          <NavbarMobileLink href="/services/architecture">
            System Architecture
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/tools">
            Micro-Tools & APIs
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Resources">
          <NavbarMobileLink href="/blog">Blog & Articles</NavbarMobileLink>
          <NavbarMobileLink href="/research">
            Research & Deep Dives
          </NavbarMobileLink>
          <NavbarMobileLink href="/content/youtube">
            Masa Başı — YouTube
          </NavbarMobileLink>
          <NavbarMobileLink href="/content/social">
            Social Media Hub
          </NavbarMobileLink>
          <NavbarMobileLink href="/learning/52-week-plan">
            52-Week Engineering Plan
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label="Career & Life">
          <NavbarMobileLink href="/about">About Me</NavbarMobileLink>
          <NavbarMobileLink href="/career/experience">
            Experience
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/education">
            Education
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/resume">Resume / CV</NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup>
          <NavbarMobileLink href="/pricing">Pricing</NavbarMobileLink>
          <NavbarMobileLink href="/contact">Contact</NavbarMobileLink>
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

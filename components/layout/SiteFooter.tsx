import {
  Footer,
  FooterGrid,
  FooterSection,
  FooterHeading,
  FooterLink,
  FooterBrand,
  FooterSocials,
  FooterSocialLink,
  FooterDivider,
  FooterBottom,
  FooterBottomLinks,
} from "poyraz-ui/organisms";
import { Logo, Separator } from "poyraz-ui/atoms";
import { Icon } from "@iconify/react";

export function SiteFooter() {
  return (
    <Footer variant="full" containerClassName="max-w-6xl mx-auto px-4">
      <FooterGrid>
        {/* Brand */}
        <FooterBrand>
          <Logo
            src="/logo/logo.jpeg"
            href="/"
            alt="Poyraz Avsever"
            width={44}
            height={44}
          />
          <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-xs">
            Fullstack Developer &amp; UI/UX Designer. Freelance developer based
            in Ankara, specializing in scalable systems and user-focused
            interfaces.
          </p>
          <FooterSocials>
            <FooterSocialLink href="https://github.com/poyrazavsever">
              <Icon icon="mdi:github" className="h-5 w-5" />
            </FooterSocialLink>
            <FooterSocialLink href="https://linkedin.com/in/poyrazavsever">
              <Icon icon="mdi:linkedin" className="h-5 w-5" />
            </FooterSocialLink>
            <FooterSocialLink href="https://youtube.com/@poyrazavsever">
              <Icon icon="mdi:youtube" className="h-5 w-5" />
            </FooterSocialLink>
            <FooterSocialLink href="https://instagram.com/poyraz_avsever">
              <Icon icon="mdi:instagram" className="h-5 w-5" />
            </FooterSocialLink>
          </FooterSocials>
        </FooterBrand>

        {/* Explore */}
        <FooterSection>
          <FooterHeading>Explore</FooterHeading>
          <FooterLink href="/showcase/web">Web Applications</FooterLink>
          <FooterLink href="/showcase/case-studies">Case Studies</FooterLink>
          <FooterLink href="/showcase/open-source">Open Source</FooterLink>
          <FooterLink href="/showcase/tech-stack">Tech Stack</FooterLink>
          <FooterLink href="https://ui.poyrazavsever.com">
            Poyraz UI Kit ↗
          </FooterLink>
        </FooterSection>

        {/* Services */}
        <FooterSection>
          <FooterHeading>Services</FooterHeading>
          <FooterLink href="/services/fullstack">
            Full-Stack Development
          </FooterLink>
          <FooterLink href="/services/design">
            UI/UX & Brand Identity
          </FooterLink>
          <FooterLink href="/pricing">Pricing & Packages</FooterLink>
          <FooterLink href="/client/meeting">Book a Meeting</FooterLink>
          <FooterLink href="https://portal.poyrazavsever.com">
            Client Portal ↗
          </FooterLink>
        </FooterSection>

        {/* Company */}
        <FooterSection>
          <FooterHeading>Company</FooterHeading>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/career/resume">Resume / CV</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="https://status.poyrazavsever.com">
            System Status ↗
          </FooterLink>
        </FooterSection>
      </FooterGrid>

      <FooterDivider />

      <FooterBottom>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Poyraz Avsever. All rights reserved.
        </p>
        <FooterBottomLinks>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
        </FooterBottomLinks>
      </FooterBottom>
    </Footer>
  );
}

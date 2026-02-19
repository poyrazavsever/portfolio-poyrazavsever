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
            Fullstack Developer & UI/UX Designer. Ankara&apos;dan çalışan,
            ölçeklenebilir sistemler ve kullanıcı odaklı arayüzler üzerine
            uzmanlaşmış freelancer yazılımcı.
          </p>
          <FooterSocials>
            <FooterSocialLink href="https://github.com/poyrazavsever">
              GH
            </FooterSocialLink>
            <FooterSocialLink href="https://linkedin.com/in/poyrazavsever">
              LN
            </FooterSocialLink>
            <FooterSocialLink href="https://youtube.com/@poyrazavsever">
              YT
            </FooterSocialLink>
            <FooterSocialLink href="https://instagram.com/poyrazavsever">
              IG
            </FooterSocialLink>
          </FooterSocials>
        </FooterBrand>

        {/* Showcase */}
        <FooterSection>
          <FooterHeading>Showcase</FooterHeading>
          <FooterLink href="/showcase/portfolio">Portfolio</FooterLink>
          <FooterLink href="/showcase/case-studies">Case Studies</FooterLink>
          <FooterLink href="/showcase/tech-stack">
            Tech Stack & Arsenal
          </FooterLink>
          <FooterLink href="/showcase/open-source">Open Source</FooterLink>
          <FooterLink href="https://ui.poyrazavsever.com">
            Design System ↗
          </FooterLink>
        </FooterSection>

        {/* Services */}
        <FooterSection>
          <FooterHeading>Services</FooterHeading>
          <FooterLink href="/services/fullstack">
            Full-Stack Development
          </FooterLink>
          <FooterLink href="/services/design">
            UI/UX Design & Prototyping
          </FooterLink>
          <FooterLink href="/services/architecture">
            System Architecture
          </FooterLink>
          <FooterLink href="/products/tools">Micro-Tools & APIs</FooterLink>
          <FooterLink href="/client/proposal">Request a Proposal</FooterLink>
          <FooterLink href="/client/meeting">Schedule a Meeting</FooterLink>
        </FooterSection>

        {/* Explore */}
        <FooterSection>
          <FooterHeading>Explore</FooterHeading>
          <FooterLink href="/blog">Blog & Articles</FooterLink>
          <FooterLink href="/research">Research & Deep Dives</FooterLink>
          <FooterLink href="/content/youtube">Masa Başı — YouTube</FooterLink>
          <FooterLink href="/learning/52-week-plan">
            52-Week Engineering Plan
          </FooterLink>
          <FooterLink href="/about">About Me</FooterLink>
          <FooterLink href="/career/resume">Resume / CV</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
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

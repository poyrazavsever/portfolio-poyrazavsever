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
import { Logo, Typography } from "poyraz-ui/atoms";
import { Icon } from "@iconify/react";

import { Dictionary } from "@/types/dictionary";

export function SiteFooter({ dictionary }: { dictionary: Dictionary }) {
  const t = dictionary.layout.footer;

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
          <Typography variant="muted" className="mt-3 leading-relaxed max-w-xs">
            {t.brand.description}
          </Typography>
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
          <FooterHeading>{t.sections.explore.title}</FooterHeading>
          <FooterLink href="/showcase/portfolio">
            {t.sections.explore.items.featured}
          </FooterLink>
          <FooterLink href="/showcase/fullstack-cases">
            {t.sections.explore.items.fullstack}
          </FooterLink>
          <FooterLink href="/showcase/open-source">
            {t.sections.explore.items.opensource}
          </FooterLink>
          <FooterLink href="https://ui.poyrazavsever.com">
            {t.sections.explore.items.uiKit}
          </FooterLink>
        </FooterSection>

        {/* Services */}
        <FooterSection>
          <FooterHeading>{t.sections.services.title}</FooterHeading>
          <FooterLink href="/services">
            {t.sections.services.items.fullstack}
          </FooterLink>
          <FooterLink href="/services">
            {t.sections.services.items.uiux}
          </FooterLink>
          <FooterLink href="/services/pricing">
            {t.sections.services.items.pricing}
          </FooterLink>
          <FooterLink href="/client/meeting">
            {t.sections.services.items.meeting}
          </FooterLink>
          <FooterLink href="https://portal.poyrazavsever.com">
            {t.sections.services.items.portal}
          </FooterLink>
        </FooterSection>

        {/* Company */}
        <FooterSection>
          <FooterHeading>{t.sections.company.title}</FooterHeading>
          <FooterLink href="/about">
            {t.sections.company.items.about}
          </FooterLink>
          <FooterLink href="/media/blog">
            {t.sections.company.items.blog}
          </FooterLink>
          <FooterLink href="/career/resume">
            {t.sections.company.items.resume}
          </FooterLink>
          <FooterLink href="/contact">
            {t.sections.company.items.contact}
          </FooterLink>
          <FooterLink href="https://status.poyrazavsever.com">
            {t.sections.company.items.status}
          </FooterLink>
        </FooterSection>
      </FooterGrid>

      <FooterDivider />

      <FooterBottom>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Poyraz Avsever. {t.bottom.rights}
        </p>
        <FooterBottomLinks>
          <FooterLink href="/contact">{t.bottom.links.contact}</FooterLink>
          <FooterLink href="/privacy">{t.bottom.links.privacy}</FooterLink>
          <FooterLink href="/terms">{t.bottom.links.terms}</FooterLink>
          <FooterLink href="/sitemap.xml">{t.bottom.links.sitemap}</FooterLink>
        </FooterBottomLinks>
      </FooterBottom>
    </Footer>
  );
}

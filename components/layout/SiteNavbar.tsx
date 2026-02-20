"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Button, Badge, Logo, Typography } from "poyraz-ui/atoms";
import { Icon } from "@iconify/react";
import { Dictionary } from "@/types/dictionary";

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

function TopBarClock({ city, basedIn }: { city: string; basedIn: string }) {
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
    <Typography variant="small">
      {basedIn} <strong>{city}</strong>, {time}
    </Typography>
  );
}

export function SiteNavbar({
  dictionary,
  currentLocale,
}: {
  dictionary: Dictionary;
  currentLocale: string;
}) {
  const t = dictionary.layout.navbar;
  const router = useRouter();

  const switchLanguage = () => {
    const newLocale = currentLocale === "tr" ? "en" : "tr";
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

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
          <TopBarClock basedIn={t.topbar.basedIn} city={t.topbar.city} />
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <Drawer>
              <DrawerTrigger asChild>
                <Badge className="cursor-pointer">{t.topbar.socialLinks}</Badge>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>{t.topbar.socialLinks}</DrawerTitle>
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
                        <Typography
                          variant="muted"
                          className="text-xs font-medium"
                        >
                          {link.label}
                        </Typography>
                      </a>
                    ))}
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className="w-full">
                        {t.topbar.settings.close}
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <a href="/rss.xml">
              <Badge className="cursor-pointer text-xs">{t.topbar.rss}</Badge>
            </a>
            <a
              href="https://stats.uptimerobot.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge className="cursor-pointer text-xs">
                {t.topbar.status}
              </Badge>
            </a>

            <Drawer>
              <DrawerTrigger asChild>
                <Badge className="cursor-pointer text-xs">
                  {t.topbar.settings.title}
                </Badge>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>{t.topbar.settings.title}</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col gap-4 px-4 pb-2">
                    <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="mdi:theme-light-dark"
                          width={20}
                          height={20}
                        />
                        <Typography variant="small" className="font-medium">
                          {t.topbar.settings.theme}
                        </Typography>
                      </div>
                      <Badge>{t.topbar.settings.system}</Badge>
                    </div>
                    <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:translate" width={20} height={20} />
                        <Typography variant="small" className="font-medium">
                          {t.topbar.settings.language}
                        </Typography>
                      </div>
                      <Badge
                        className="cursor-pointer hover:bg-neutral-800 hover:text-white transition-colors"
                        onClick={switchLanguage}
                      >
                        {currentLocale.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:format-font" width={20} height={20} />
                        <Typography variant="small" className="font-medium">
                          {t.topbar.settings.fontSize}
                        </Typography>
                      </div>
                      <Badge>{t.topbar.settings.default}</Badge>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className="w-full">
                        {t.topbar.settings.close}
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
          <NavbarDropdown label={t.menu.showcase.label}>
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title={t.menu.showcase.items.featured.title}
                description={t.menu.showcase.items.featured.desc}
                href="/showcase/portfolio"
              />
              <NavbarMegaMenuItem
                title={t.menu.showcase.items.fullstack.title}
                description={t.menu.showcase.items.fullstack.desc}
                href="/showcase/fullstack-cases"
              />
              <NavbarMegaMenuItem
                title={t.menu.showcase.items.design.title}
                description={t.menu.showcase.items.design.desc}
                href="/showcase/design-cases"
              />
              <NavbarMegaMenuItem
                title={t.menu.showcase.items.opensource.title}
                description={t.menu.showcase.items.opensource.desc}
                href="/showcase/open-source"
              />
              <NavbarMegaMenuItem
                title={t.menu.showcase.items.uiKit.title}
                description={t.menu.showcase.items.uiKit.desc}
                href="https://ui.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title={t.menu.showcase.items.archive.title}
                description={t.menu.showcase.items.archive.desc}
                href="/showcase/archive"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 2. Products ── */}
          <NavbarDropdown label={t.menu.products.label}>
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title={t.menu.products.items.workspace.title}
                description={t.menu.products.items.workspace.desc}
                href="https://portal.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title={t.menu.products.items.saas.title}
                description={t.menu.products.items.saas.desc}
                href="/products/saas"
              />
              <NavbarMegaMenuItem
                title={t.menu.products.items.mobile.title}
                description={t.menu.products.items.mobile.desc}
                href="/products/mobile-apps"
              />
              <NavbarMegaMenuItem
                title={t.menu.products.items.figma.title}
                description={t.menu.products.items.figma.desc}
                href="/products/figma-templates"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 3. Client Portal ── */}
          <NavbarDropdown label={t.menu.clientPortal.label}>
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title={t.menu.clientPortal.items.login.title}
                description={t.menu.clientPortal.items.login.desc}
                href="https://portal.poyrazavsever.com/login"
              />
              <NavbarMegaMenuItem
                title={t.menu.clientPortal.items.services.title}
                description={t.menu.clientPortal.items.services.desc}
                href="/services"
              />
              <NavbarMegaMenuItem
                title={t.menu.clientPortal.items.workflow.title}
                description={t.menu.clientPortal.items.workflow.desc}
                href="/services/workflow"
              />
              <NavbarMegaMenuItem
                title={t.menu.clientPortal.items.pricing.title}
                description={t.menu.clientPortal.items.pricing.desc}
                href="/services/pricing"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 4. Media & Insights ── */}
          <NavbarDropdown label={t.menu.media.label}>
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title={t.menu.media.items.masabasi.title}
                description={t.menu.media.items.masabasi.desc}
                href="/media/masa-basi"
              />
              <NavbarMegaMenuItem
                title={t.menu.media.items.archive.title}
                description={t.menu.media.items.archive.desc}
                href="/media/masa-basi/archive"
              />
              <NavbarMegaMenuItem
                title={t.menu.media.items.podcast.title}
                description={t.menu.media.items.podcast.desc}
                href="/media/yazilima-dair"
              />
              <NavbarMegaMenuItem
                title={t.menu.media.items.blog.title}
                description={t.menu.media.items.blog.desc}
                href="/media/blog"
              />
              <NavbarMegaMenuItem
                title={t.menu.media.items.social.title}
                description={t.menu.media.items.social.desc}
                href="/media/social-hub"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 5. Academy ── */}
          <NavbarDropdown label={t.menu.academy.label}>
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title={t.menu.academy.items.journey.title}
                description={t.menu.academy.items.journey.desc}
                href="https://js.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title={t.menu.academy.items.certs.title}
                description={t.menu.academy.items.certs.desc}
                href="/academy/certifications"
              />
              <NavbarMegaMenuItem
                title={t.menu.academy.items.reading.title}
                description={t.menu.academy.items.reading.desc}
                href="/academy/reading-list"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 6. Ecosystem ── */}
          <NavbarDropdown label={t.menu.ecosystem.label}>
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title={t.menu.ecosystem.items.status.title}
                description={t.menu.ecosystem.items.status.desc}
                href="https://status.poyrazavsever.com"
              />
              <NavbarMegaMenuItem
                title={t.menu.ecosystem.items.architecture.title}
                description={t.menu.ecosystem.items.architecture.desc}
                href="/ecosystem/architecture"
              />
            </NavbarMegaMenu>
          </NavbarDropdown>

          {/* ── 7. About ── */}
          <NavbarDropdown label={t.menu.about.label}>
            <NavbarMegaMenu>
              <NavbarMegaMenuItem
                title={t.menu.about.items.story.title}
                description={t.menu.about.items.story.desc}
                href="/about"
              />
              <NavbarMegaMenuItem
                title={t.menu.about.items.experience.title}
                description={t.menu.about.items.experience.desc}
                href="/career/experience"
              />
              <NavbarMegaMenuItem
                title={t.menu.about.items.education.title}
                description={t.menu.about.items.education.desc}
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
              {t.actions.login}
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="/contact">{t.actions.contact}</a>
          </Button>
        </NavbarActions>

        <NavbarMobileToggle />
      </NavbarMain>

      {/* ── Mobile Menu ── */}
      <NavbarMobileMenu>
        <div className="flex flex-wrap gap-2 px-4 py-3">
          <Drawer>
            <DrawerTrigger asChild>
              <Badge className="cursor-pointer">{t.topbar.socialLinks}</Badge>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>{t.topbar.socialLinks}</DrawerTitle>
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
                      <Typography
                        variant="muted"
                        className="text-xs font-medium"
                      >
                        {link.label}
                      </Typography>
                    </a>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      {t.topbar.settings.close}
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <a href="/rss.xml">
            <Badge className="cursor-pointer">{t.topbar.rss}</Badge>
          </a>
          <a
            href="https://stats.uptimerobot.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge className="cursor-pointer">{t.topbar.status}</Badge>
          </a>

          <Drawer>
            <DrawerTrigger asChild>
              <Badge className="cursor-pointer">
                {t.topbar.settings.title}
              </Badge>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>{t.topbar.settings.title}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 px-4 pb-2">
                  <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:theme-light-dark"
                        width={20}
                        height={20}
                      />
                      <Typography variant="small" className="font-medium">
                        {t.topbar.settings.theme}
                      </Typography>
                    </div>
                    <Badge>{t.topbar.settings.system}</Badge>
                  </div>
                  <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:translate" width={20} height={20} />
                      <Typography variant="small" className="font-medium">
                        {t.topbar.settings.language}
                      </Typography>
                    </div>
                    <Badge
                      className="cursor-pointer hover:bg-neutral-800 hover:text-white transition-colors"
                      onClick={switchLanguage}
                    >
                      {currentLocale.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 p-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:format-font" width={20} height={20} />
                      <Typography variant="small" className="font-medium">
                        {t.topbar.settings.fontSize}
                      </Typography>
                    </div>
                    <Badge>{t.topbar.settings.default}</Badge>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      {t.topbar.settings.close}
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <NavbarMobileGroup label={t.menu.showcase.label}>
          <NavbarMobileLink href="/showcase/saas">
            {t.menu.showcase.items.saas.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/ecommerce">
            {t.menu.showcase.items.ecommerce.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/fullstack-cases">
            {t.menu.showcase.items.fullstack.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/design-cases">
            {t.menu.showcase.items.design.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/open-source">
            {t.menu.showcase.items.opensource.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="https://ui.poyrazavsever.com">
            {t.menu.showcase.items.uiKit.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/showcase/archive">
            {t.menu.showcase.items.archive.title}
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label={t.menu.products.label}>
          <NavbarMobileLink href="https://portal.poyrazavsever.com">
            {t.menu.products.items.workspace.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/saas">
            {t.menu.products.items.saas.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/mobile-apps">
            {t.menu.products.items.mobile.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/figma-templates">
            {t.menu.products.items.figma.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/micro-tools">
            {t.menu.products.items.microTools.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/products/apis">
            {t.menu.products.items.apis.title}
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label={t.menu.clientPortal.label}>
          <NavbarMobileLink href="https://portal.poyrazavsever.com/login">
            {t.menu.clientPortal.items.login.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/services">
            {t.menu.clientPortal.items.services.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/services/workflow">
            {t.menu.clientPortal.items.workflow.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/pricing">
            {t.menu.clientPortal.items.pricing.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/client/meeting">
            {t.menu.clientPortal.items.meeting.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/client/proposal">
            {t.menu.clientPortal.items.proposal.title}
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label={t.menu.media.label}>
          <NavbarMobileLink href="/media/masa-basi">
            {t.menu.media.items.masabasi.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/media/masa-basi/archive">
            {t.menu.media.items.archive.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/media/masa-basi/apply">
            {t.menu.media.items.apply.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/blog">
            {t.menu.media.items.blog.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/research/system-design">
            {t.menu.media.items.systemDesign.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/research/ui-ux">
            {t.menu.media.items.uiUx.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/media/social">
            {t.menu.media.items.social.title}
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label={t.menu.academy.label}>
          <NavbarMobileLink href="https://js.poyrazavsever.com">
            {t.menu.academy.items.journey.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/academy/course-notes">
            {t.menu.academy.items.certs.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/academy/reading-list">
            {t.menu.academy.items.reading.title}
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label={t.menu.ecosystem.label}>
          <NavbarMobileLink href="https://status.poyrazavsever.com">
            {t.menu.ecosystem.items.status.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/ecosystem/architecture">
            {t.menu.ecosystem.items.architecture.title}
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileGroup label={t.menu.about.label}>
          <NavbarMobileLink href="/about">
            {t.menu.about.items.story.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/experience">
            {t.menu.about.items.experience.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/education">
            {t.menu.about.items.education.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/career/resume">
            {t.menu.about.items.resume.title}
          </NavbarMobileLink>
          <NavbarMobileLink href="/contact">
            {t.menu.about.items.contact.title}
          </NavbarMobileLink>
        </NavbarMobileGroup>

        <NavbarMobileActions>
          <Button variant="outline" className="w-full" asChild>
            <a
              href="https://portal.poyrazavsever.com/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.actions.login}
            </a>
          </Button>
          <Button className="w-full" asChild>
            <a href="/contact">{t.actions.contact}</a>
          </Button>
        </NavbarMobileActions>
      </NavbarMobileMenu>
    </Navbar>
  );
}

"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
  SidebarTrigger,
  SidebarUserProfile,
} from "poyraz-ui/organisms";
import { Logo } from "poyraz-ui/atoms";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Video,
  Briefcase,
  Award,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const menuItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    href: "/admin/projects",
    label: "Projeler",
    icon: <FolderKanban className="w-4 h-4" />,
  },
  {
    href: "/admin/blog",
    label: "Blog Yazıları",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    href: "/admin/media",
    label: "Medya",
    icon: <Video className="w-4 h-4" />,
  },
  {
    href: "/admin/career",
    label: "Kariyer",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    href: "/admin/certifications",
    label: "Sertifikalar",
    icon: <Award className="w-4 h-4" />,
  },
  {
    href: "/admin/reading-list",
    label: "Okuma Listesi",
    icon: <BookOpen className="w-4 h-4" />,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="collapsible" className="h-screen sticky top-0 border-r">
      <SidebarHeader>
        <Logo width={40} height={40} />
        <SidebarTrigger action="collapse" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>İçerik Yönetimi</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                active={pathname === item.href}
              >
                {item.label}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Diğer</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem
              href="/"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Siteye Dön
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUserProfile
          name="Poyraz Avsever"
          role="Admin"
          avatarUrl="/logo/logo.jpeg"
          initials="PA"
        />
      </SidebarFooter>
    </Sidebar>
  );
}

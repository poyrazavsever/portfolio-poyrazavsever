"use client";

import { usePathname, useRouter } from "next/navigation";
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
import { Logo, Button } from "poyraz-ui/atoms";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Video,
  Briefcase,
  Award,
  BookOpen,
  ExternalLink,
  LogOut,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useSupabase } from "@/lib/supabase/hooks";

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
    href: "/admin/testimonials",
    label: "Referanslar",
    icon: <MessageSquare className="w-4 h-4" />,
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
  {
    href: "/admin/contact",
    label: "Gelen Mesajlar",
    icon: <Mail className="w-4 h-4" />,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Sidebar
      variant="collapsible"
      className="h-screen sticky top-0 border-r flex flex-col"
    >
      <SidebarHeader>
        <Logo width={40} height={40} />
        <SidebarTrigger action="collapse" />
      </SidebarHeader>

      <SidebarContent className="flex-1">
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

      <SidebarFooter className="border-t p-4 flex flex-col gap-4">
        <SidebarUserProfile
          name="Poyraz Avsever"
          role="Admin"
          avatarUrl="/logo/logo.jpeg"
          initials="PA"
        />
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Çıkış Yap
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

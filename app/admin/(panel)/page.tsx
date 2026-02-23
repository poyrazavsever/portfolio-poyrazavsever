import { Typography, Card, CardContent, Separator } from "poyraz-ui/atoms";
import { DashboardStats } from "@/components/futures/admin/DashboardStats";
import { FolderKanban, FileText, Video, Plus } from "lucide-react";

const recentItems = [
  {
    title: "Portfolio Projesi Eklendi",
    type: "Proje",
    date: "2 saat önce",
    icon: <FolderKanban className="w-4 h-4 text-red-600" />,
  },
  {
    title: "Yeni Blog Yazısı Taslağı",
    type: "Blog",
    date: "5 saat önce",
    icon: <FileText className="w-4 h-4 text-blue-600" />,
  },
  {
    title: "Masa Başı Bölüm 12 Yayınlandı",
    type: "Medya",
    date: "1 gün önce",
    icon: <Video className="w-4 h-4 text-purple-600" />,
  },
];

const quickActions = [
  {
    label: "Yeni Proje",
    href: "/admin/projects",
    icon: <FolderKanban className="w-4 h-4" />,
  },
  {
    label: "Yeni Yazı",
    href: "/admin/blog",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: "Yeni Bölüm",
    href: "/admin/media",
    icon: <Video className="w-4 h-4" />,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <Typography variant="h1">
          Hoş geldin,{" "}
          <Typography
            variant="h1"
            component="span"
            secondaryFont
            className="text-red-600"
          >
            Poyraz
          </Typography>
        </Typography>
        <Typography variant="lead">
          İçeriklerini buradan yönetebilirsin.
        </Typography>
      </div>

      {/* Stats */}
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card variant="bordered" className="lg:col-span-2">
          <CardContent className="p-6">
            <Typography variant="h4" className="mb-4">
              Son Aktiviteler
            </Typography>
            <div className="space-y-1">
              {recentItems.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 py-3">
                    <div className="w-8 h-8 flex items-center justify-center border border-dashed border-slate-200 bg-white">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <Typography variant="small">{item.title}</Typography>
                      <Typography variant="muted">{item.type}</Typography>
                    </div>
                    <Typography variant="muted">{item.date}</Typography>
                  </div>
                  {i < recentItems.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="bordered">
          <CardContent className="p-6">
            <Typography variant="h4" className="mb-4">
              Hızlı Erişim
            </Typography>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 border border-dashed border-slate-200 hover:border-red-600 hover:bg-red-50 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    {action.icon}
                    <Typography variant="small">{action.label}</Typography>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, Typography } from "poyraz-ui/atoms";
import { FolderKanban, FileText, Video, Award } from "lucide-react";

const stats = [
  {
    label: "Projeler",
    value: "12",
    icon: <FolderKanban className="w-5 h-5" />,
    color: "text-red-600 bg-red-50",
  },
  {
    label: "Blog Yazıları",
    value: "8",
    icon: <FileText className="w-5 h-5" />,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Medya İçeriği",
    value: "24",
    icon: <Video className="w-5 h-5" />,
    color: "text-purple-600 bg-purple-50",
  },
  {
    label: "Sertifikalar",
    value: "6",
    icon: <Award className="w-5 h-5" />,
    color: "text-emerald-600 bg-emerald-50",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} variant="bordered">
          <CardContent className="flex items-center gap-4 p-6">
            <div
              className={`w-12 h-12 flex items-center justify-center border border-dashed border-slate-300 ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <Typography variant="h3">{stat.value}</Typography>
              <Typography variant="muted">{stat.label}</Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

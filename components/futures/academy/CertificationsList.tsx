import {
  Card,
  CardHeader,
  CardImage,
  CardTitle,
  CardContent,
  CardFooter,
  Badge,
  Button,
} from "poyraz-ui/atoms";
import { Icon } from "@iconify/react";
import { Dictionary } from "@/types/dictionary";

const staticCertifications = [
  {
    credentialId: "BTK-123456",
    link: "#",
    image: "https://www.color-hex.com/palettes/36931.png",
  },
  {
    credentialId: "UC-554123",
    link: "#",
    image: "https://www.color-hex.com/palettes/36931.png",
  },
  {
    credentialId: "TGY-98765",
    link: "#",
    image: "https://www.color-hex.com/palettes/36931.png",
  },
];

interface CertificationsListProps {
  dictionary: Dictionary;
}

export function CertificationsList({ dictionary }: CertificationsListProps) {
  const { certifications: certsDict } = dictionary.academy;

  const mergedCertifications = staticCertifications.map((cert, index) => ({
    ...cert,
    ...certsDict.items[index],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mergedCertifications.map((cert) => (
        <Card
          key={cert.title}
          variant="default"
          className="group hover:border-red-600 transition-colors"
        >
          <CardImage className="aspect-video relative overflow-hidden border-b border-dashed border-slate-200">
            <img
              src={cert.image}
              alt={cert.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </CardImage>

          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-3">
              {cert.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-xl group-hover:text-red-600 transition-colors line-clamp-2">
              {cert.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:domain" className="w-4 h-4 text-slate-400" />
                <span>{cert.organization}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:calendar-blank-outline"
                  className="w-4 h-4 text-slate-400"
                />
                <span>
                  {certsDict.labels.issued} {cert.issueDate}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:certificate-outline"
                  className="w-4 h-4 text-slate-400"
                />
                <span className="font-mono text-xs">{cert.credentialId}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-auto border-t border-dashed border-slate-200 pt-4">
            <Button
              className="w-full gap-2"
              variant="outline"
              size="sm"
              asChild
            >
              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                <Icon icon="mdi:open-in-new" className="w-4 h-4" />
                {certsDict.labels.showCredential}
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

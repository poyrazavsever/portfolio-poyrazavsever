/* eslint-disable @next/next/no-img-element */
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
import { AdminCertification } from "@/types/admin";
import { Locale } from "@/i18n-config";

interface CertificationsListProps {
  dictionary: Dictionary;
  certifications: AdminCertification[];
  locale: Locale;
}

export function CertificationsList({
  dictionary,
  certifications,
  locale,
}: CertificationsListProps) {
  const { certifications: certsDict } = dictionary.academy;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {certifications.map((cert) => (
        <Card
          key={cert.id}
          variant="default"
          className="group hover:border-red-600 transition-colors flex flex-col h-full"
        >
          <CardImage className="aspect-video relative overflow-hidden border-b border-dashed border-slate-200 bg-slate-50">
            {cert.image ? (
              <img
                src={cert.image}
                alt={locale === "tr" ? cert.title_tr : cert.title_en}
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon
                  icon="mdi:certificate-outline"
                  className="w-16 h-16 text-slate-300"
                />
              </div>
            )}
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
              {locale === "tr" ? cert.title_tr : cert.title_en}
            </CardTitle>
          </CardHeader>

          <CardContent className="grow">
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:domain" className="w-4 h-4 text-slate-400" />
                <span>
                  {locale === "tr"
                    ? cert.organization_tr
                    : cert.organization_en}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:calendar-blank-outline"
                  className="w-4 h-4 text-slate-400"
                />
                <span>
                  {certsDict.labels.issued}{" "}
                  {locale === "tr" ? cert.issue_date_tr : cert.issue_date_en}
                </span>
              </div>
              {cert.credential_id && (
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:certificate-outline"
                    className="w-4 h-4 text-slate-400"
                  />
                  <span className="font-mono text-xs">
                    {cert.credential_id}
                  </span>
                </div>
              )}
            </div>
          </CardContent>

          {cert.link && (
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
          )}
        </Card>
      ))}
    </div>
  );
}

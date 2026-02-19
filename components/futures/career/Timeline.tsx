"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from "poyraz-ui/atoms";
import { cn } from "poyraz-ui";

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  date: string;
  location?: string;
  type?: string;
  description?: string[];
  skills?: string[];
  logo?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative border-l-2 border-dashed border-slate-300 ml-4 md:ml-6 space-y-12 pb-12">
      {items.map((item) => (
        <div key={item.id} className="relative pl-8 md:pl-12">
          {/* Node */}
          <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-sm bg-red-600 border-2 border-white shadow-sm" />

          {/* Date Label (Desktop: Left aligned outside, Mobile: Top) */}
          <div className="mb-2 md:absolute md:-left-[200px] md:top-5 md:w-[160px] md:text-right">
            <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold border border-dashed border-red-200 rounded-sm">
              {item.date}
            </span>
          </div>

          <Card
            variant="bordered"
            className="bg-slate-50 transition-all hover:border-red-600/50 hover:shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-slate-900 leading-tight">
                    {item.role}
                  </CardTitle>
                  {item.type && (
                    <Badge
                      variant="outline"
                      className="ml-2 shrink-0 text-[10px] uppercase"
                    >
                      {item.type}
                    </Badge>
                  )}
                </div>

                <h4 className="text-base font-medium text-slate-500 font-secondary">
                  {item.company}
                </h4>

                {item.location && (
                  <span className="text-xs text-slate-400 font-medium">
                    {item.location}
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {item.description && item.description.length > 0 && (
                <ul className="mb-4 space-y-2">
                  {item.description.map((desc, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-600 flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" />
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-dashed border-slate-200">
                  {item.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-[10px] px-1.5 h-5 bg-white border-slate-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

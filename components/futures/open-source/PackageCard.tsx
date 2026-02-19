"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "poyraz-ui/atoms";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { Copy, Check, Package, Download } from "lucide-react";
import { PackageItem } from "@/data/open-source-data";
import { cn } from "poyraz-ui";

interface PackageCardProps {
  item: PackageItem;
}

export function PackageCard({ item }: PackageCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="flex flex-col h-full border-2 border-slate-200 hover:border-red-500 transition-colors duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "p-2 rounded-md",
                item.type === "npm"
                  ? "bg-red-50 text-red-600"
                  : "bg-blue-50 text-blue-600",
              )}
            >
              <Package className="w-5 h-5" />
            </div>
            <div>
              <Typography
                variant="small"
                className="font-bold uppercase text-slate-400 text-[10px] tracking-widest"
              >
                {item.type}
              </Typography>
              <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
            </div>
          </div>
          <Badge variant="secondary" className="font-mono text-xs">
            v{item.version}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <Typography variant="muted" className="text-sm">
          {item.description}
        </Typography>
      </CardContent>

      <CardFooter className="pt-0 flex flex-col gap-3">
        <div
          className="w-full bg-slate-900 rounded-md p-3 flex items-center justify-between group cursor-pointer"
          onClick={handleCopy}
        >
          <code className="text-xs font-mono text-slate-300 truncate mr-2">
            {`> ${item.installCommand}`}
          </code>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-slate-400 hover:text-white hover:bg-white/10"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>

        <div className="w-full flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span>{item.downloads} downloads</span>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 hover:underline transition-colors"
          >
            View on Registry
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

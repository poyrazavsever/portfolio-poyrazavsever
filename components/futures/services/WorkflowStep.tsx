import { Card, CardContent, Typography } from "poyraz-ui/atoms";
import { CheckCircle2, Circle } from "lucide-react";

interface WorkflowStepProps {
  number: string;
  title: string;
  description: string;
  action: string;
  result: string;
  actionLabel?: string;
  resultLabel?: string;
  isLast?: boolean;
}

export function WorkflowStep({
  number,
  title,
  description,
  action,
  result,
  actionLabel = "Action",
  resultLabel = "Result",
  isLast,
}: WorkflowStepProps) {
  return (
    <div className="relative flex gap-8 md:gap-12">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[28px] top-16 bottom-[-48px] w-[2px] border-l-2 border-dashed border-slate-200" />
      )}

      {/* Number Badge */}
      <div className="relative z-10 shrink-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-none border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <Typography variant="h3" className="font-black">
            {number}
          </Typography>
        </div>
      </div>

      {/* Content */}
      <div className="grow pb-12">
        <div className="mb-2">
          <Typography variant="h3" className="mb-1">
            {title}
          </Typography>
        </div>

        <Typography variant="lead" className="mb-6 max-w-3xl">
          {description}
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
          {/* Action Card */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4 flex gap-3">
              <div className="mt-1 bg-white p-1.5 border border-slate-200 shadow-sm h-fit">
                <Circle className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <Typography
                  variant="muted"
                  className="font-bold uppercase tracking-wider block mb-1 text-xs"
                >
                  {actionLabel}
                </Typography>
                <Typography variant="small" className="m-0 leading-relaxed">
                  {action}
                </Typography>
              </div>
            </CardContent>
          </Card>

          {/* Result Card */}
          <Card className="bg-red-50/50 border-red-100">
            <CardContent className="p-4 flex gap-3">
              <div className="mt-1 bg-white p-1.5 border border-red-100 shadow-sm h-fit">
                <CheckCircle2 className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <Typography
                  variant="muted"
                  className="font-bold uppercase tracking-wider block mb-1 text-red-400 text-xs"
                >
                  {resultLabel}
                </Typography>
                <Typography variant="small" className="m-0 leading-relaxed">
                  {result}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

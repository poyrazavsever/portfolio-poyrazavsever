import { Typography, Card, CardContent } from "poyraz-ui/atoms";
import { Code2, PenTool } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

interface AboutEngineeringDesignProps {
  dictionary: Dictionary;
}

export function AboutEngineeringDesign({
  dictionary,
}: AboutEngineeringDesignProps) {
  const { engineeringDesign } = dictionary.about;

  return (
    <section className="container mx-auto px-4 max-w-6xl py-12 md:py-20">
      <Typography
        variant="h2"
        className="text-3xl md:text-4xl font-bold mb-8 text-left"
      >
        {engineeringDesign.title}{" "}
        <span className="text-red-600 font-secondary">
          {engineeringDesign.highlight}
        </span>
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card variant="bordered" className="bg-slate-50 border-dashed">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white border border-dashed border-slate-300">
                <Code2 className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold font-sans">
                {engineeringDesign.engineering.title}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              {engineeringDesign.engineering.description}
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside marker:text-red-600">
              {engineeringDesign.engineering.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card variant="bordered" className="bg-slate-50 border-dashed">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white border border-dashed border-slate-300">
                <PenTool className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold font-sans">
                {engineeringDesign.design.title}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              {engineeringDesign.design.description}
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside marker:text-red-600">
              {engineeringDesign.design.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-slate-600 leading-relaxed">
        <p>{engineeringDesign.philosophy}</p>
      </div>
    </section>
  );
}

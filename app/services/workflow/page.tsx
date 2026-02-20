import { WorkflowHero } from "@/components/futures/services/WorkflowHero";
import { WorkflowStep } from "@/components/futures/services/WorkflowStep";
import { Button } from "poyraz-ui/atoms";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function WorkflowPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);
  const { servicesWorkflow: workflow } = dictionary;

  return (
    <div className="min-h-screen pb-32 bg-white">
      <WorkflowHero
        title={workflow.hero.title}
        highlight={workflow.hero.highlight}
        description={workflow.hero.description}
        badge={workflow.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-20">
        <div className="space-y-4">
          {workflow.steps.map((step, index) => (
            <WorkflowStep
              key={step.number}
              {...step}
              isLast={index === workflow.steps.length - 1}
            />
          ))}
        </div>

        <div className="mt-20 p-12 bg-slate-50 border-2 border-dashed border-slate-200 text-center rounded-lg">
          <div className="max-w-xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{workflow.cta.title}</h3>
            <p className="text-slate-600 mb-8">{workflow.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="/contact">
                  {workflow.cta.buttons.start}{" "}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/services">{workflow.cta.buttons.services}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cookies } from "next/headers";
import { PricingHero } from "@/components/futures/services/PricingHero";
import { PricingModelCard } from "@/components/futures/services/PricingModelCard";
import { Typography } from "poyraz-ui/atoms";
import {
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Receipt,
} from "lucide-react";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function PricingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as any;
  const dictionary = await getDictionary(locale);
  const { servicesPricing: pricing } = dictionary;

  return (
    <div className="min-h-screen pb-32 bg-white">
      <PricingHero
        title={pricing.hero.title}
        highlight={pricing.hero.highlight}
        description={pricing.hero.description}
        badge={pricing.hero.badge}
      />

      {/* Pricing Models */}
      <div className="container mx-auto px-4 max-w-6xl -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingModelCard
            title={pricing.models.custom.title}
            description={pricing.models.custom.description}
            scope={pricing.models.custom.scope}
            priceInfo={pricing.models.custom.priceInfo}
            variant="elevated"
          />
          <PricingModelCard
            title={pricing.models.design.title}
            description={pricing.models.design.description}
            scope={pricing.models.design.scope}
            priceInfo={pricing.models.design.priceInfo}
          />
          <PricingModelCard
            title={pricing.models.retainer.title}
            description={pricing.models.retainer.description}
            scope={pricing.models.retainer.scope}
            priceInfo={pricing.models.retainer.priceInfo}
          />
        </div>
      </div>

      {/* Payment Terms */}
      <div className="container mx-auto px-4 max-w-6xl mt-32">
        <div className="mb-12 text-center md:text-left">
          <Typography variant="h2" className="mb-4">
            {pricing.terms.title}
          </Typography>
          <p className="text-xl text-slate-600 max-w-2xl font-light">
            {pricing.terms.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 border-t-2 border-dashed border-red-200 -z-10" />

          {pricing.terms.phases.map((phase, index) => (
            <div
              key={index}
              className="bg-white p-6 border-2 border-slate-100 shadow-sm relative"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center font-bold text-lg mb-4 absolute -top-6 left-6 border-4 border-white ${index === 2 ? "bg-red-600 text-white" : "bg-slate-900 text-white"}`}
              >
                {phase.percentage}
              </div>
              <h3
                className={`text-xl font-bold mt-4 mb-2 ${index === 2 ? "text-red-600" : ""}`}
              >
                {phase.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portal Finance */}
      <div className="container mx-auto px-4 max-w-6xl mt-32">
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Typography variant="h2" className="mb-6">
                {pricing.portal.title}
              </Typography>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {pricing.portal.description}
              </p>
              <ul className="space-y-4">
                {pricing.portal.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="bg-white p-2 border border-slate-200 shadow-sm">
                      {index === 0 && (
                        <FileText className="w-5 h-5 text-red-600" />
                      )}
                      {index === 1 && (
                        <CheckCircle2 className="w-5 h-5 text-red-600" />
                      )}
                      {index === 2 && (
                        <CircleDollarSign className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <span className="font-medium text-slate-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              {/* Abstract Illustration of Portal */}
              <div className="aspect-square bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Receipt className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="font-bold text-xl mb-2">
                  {pricing.portal.invoiceLabel} #2024-001
                </h4>
                <p className="text-slate-500 mb-4">$X,XXX.00 USD</p>
                <div className="w-full h-2 bg-green-500 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full animate-pulse" />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-green-600 mt-2">
                  {pricing.portal.paidLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

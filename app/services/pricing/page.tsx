"use client";

import { PricingHero } from "@/components/futures/services/PricingHero";
import { PricingModelCard } from "@/components/futures/services/PricingModelCard";
import { Typography, Card, CardContent } from "poyraz-ui/atoms";
import {
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Receipt,
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen pb-32 bg-white">
      <PricingHero />

      {/* Pricing Models */}
      <div className="container mx-auto px-4 max-w-6xl -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingModelCard
            title="Custom Development"
            description="End-to-end scalable web & mobile apps built for growth."
            scope={[
              "UI/UX Design & Prototyping",
              "Frontend (Next.js / React Native)",
              "Backend (NestJS / Supabase)",
              "Server Setup (Coolify)",
              "Source Code Delivery",
            ]}
            priceInfo="Starts from $X.XXX"
            variant="elevated"
          />
          <PricingModelCard
            title="UI/UX Design Sprints"
            description="Visualize your idea with high-fidelity prototypes before coding."
            scope={[
              "User Research & Wireframing",
              "High-Fidelity UI Design",
              "Interactive Prototypes (Figma)",
              "Design System & Style Guide",
              "2-Week Sprint Delivery",
            ]}
            priceInfo="Fixed Sprint Price"
          />
          <PricingModelCard
            title="Retainers & Support"
            description="Ongoing maintenance to keep your product healthy and growing."
            scope={[
              "Monthly Server Maintenance",
              "Database Backups & Security",
              "Critical Bug Fixes",
              "X Hours of New Development",
              "Priority Support",
            ]}
            priceInfo="Monthly Subscription"
          />
        </div>
      </div>

      {/* Payment Terms */}
      <div className="container mx-auto px-4 max-w-6xl mt-32">
        <div className="mb-12 text-center md:text-left">
          <Typography variant="h2" className="mb-4">
            Payment Schedule & Terms
          </Typography>
          <p className="text-xl text-slate-600 max-w-2xl font-light">
            Secure and milestone-based payments to ensure mutual trust and
            project momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 border-t-2 border-dashed border-red-200 -z-10" />

          <div className="bg-white p-6 border-2 border-slate-100 shadow-sm relative">
            <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center font-bold text-lg mb-4 absolute -top-6 left-6 border-4 border-white">
              40%
            </div>
            <h3 className="text-xl font-bold mt-4 mb-2">Deposit</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Official project kickoff. Paid upon agreement and Portal account
              creation. Work begins after this secure payment.
            </p>
          </div>

          <div className="bg-white p-6 border-2 border-slate-100 shadow-sm relative">
            <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center font-bold text-lg mb-4 absolute -top-6 left-6 border-4 border-white">
              40%
            </div>
            <h3 className="text-xl font-bold mt-4 mb-2">
              Mid-Project Milestone
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Paid upon approval of key deliverables (e.g., Final Design
              Approval or Functional MVP on staging).
            </p>
          </div>

          <div className="bg-white p-6 border-2 border-slate-100 shadow-sm relative">
            <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center font-bold text-lg mb-4 absolute -top-6 left-6 border-4 border-white">
              20%
            </div>
            <h3 className="text-xl font-bold mt-4 mb-2 text-red-600">Launch</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Final balance before Production deployment and Source Code
              handover. Complete ownership transfer.
            </p>
          </div>
        </div>
      </div>

      {/* Portal Finance */}
      <div className="container mx-auto px-4 max-w-6xl mt-32">
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Typography variant="h2" className="mb-6">
                Financial Management via Portal
              </Typography>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Say goodbye to lost invoices in email threads. All financial
                aspects are managed centrally in your dedicated Client Portal.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-white p-2 border border-slate-200 shadow-sm">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-slate-700">
                    Digital Invoicing & PDFs
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white p-2 border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-slate-700">
                    Easy Payment Confirmation
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white p-2 border border-slate-200 shadow-sm">
                    <CircleDollarSign className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-slate-700">
                    Transparent Contract Signing
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              {/* Abstract Illustration of Portal */}
              <div className="aspect-square bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Receipt className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="font-bold text-xl mb-2">Invoice #2024-001</h4>
                <p className="text-slate-500 mb-4">$X,XXX.00 USD</p>
                <div className="w-full h-2 bg-green-500 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full animate-pulse" />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-green-600 mt-2">
                  Paid
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

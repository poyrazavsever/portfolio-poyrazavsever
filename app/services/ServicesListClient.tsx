"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { SearchInput, Typography } from "poyraz-ui/atoms";
import {
  ServiceCard,
  Service,
} from "@/components/futures/services/ServiceCard";
import { Dictionary } from "@/types/dictionary";

interface ServicesListClientProps {
  services: Service[];
  dictionary: Dictionary;
}

export function ServicesListClient({
  services,
  dictionary,
}: ServicesListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { search } = dictionary.servicesCommon;

  const filteredServices = services.filter((service) => {
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
        <SearchInput
          placeholder={search.placeholder}
          className="bg-white text-lg placeholder:text-slate-400 font-light h-14"
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-16">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                dictionary={dictionary}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Typography variant="h3" className="text-slate-400">
              {search.noResults}
            </Typography>
            <p className="text-slate-500 mt-2">{search.tryAdjusting}</p>
          </div>
        )}
      </div>
    </>
  );
}

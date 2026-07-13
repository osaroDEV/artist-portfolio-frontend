"use client";

import { useState, useMemo } from "react";
import { GalleryItem as GalleryItemType } from "@/lib/types";
import GalleryGrid from "./GalleryGrid";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface Props {
  initialItems: GalleryItemType[];
}

type FilterType = "all" | "painting_drawing" | "photography" | "spatial_performative";
type SortType = "order" | "newest" | "oldest";

export default function PortfolioView({ initialItems }: Props) {
  const t = useTranslations("Portfolio");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeSort, setActiveSort] = useState<SortType>("order");

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: t("all") },
    { value: "painting_drawing", label: t("painting_drawing") },
    { value: "photography", label: t("photography") },
    { value: "spatial_performative", label: t("spatial_performative") },
  ];

  const filteredAndSortedItems = useMemo(() => {
    // 1. Filter
    let filtered = initialItems;
    if (activeFilter !== "all") {
      filtered = initialItems.filter((item) => {
        const cat = item.category || "";
        if (activeFilter === "painting_drawing") {
          return ["paintings", "drawings", "works-on-paper"].includes(cat);
        }
        if (activeFilter === "photography") {
          return cat === "photography";
        }
        if (activeFilter === "spatial_performative") {
          return cat === "installations";
        }
        return true;
      });
    }

    // 2. Sort
    return [...filtered].sort((a, b) => {
      if (activeSort === "newest") {
        return (b.year || 0) - (a.year || 0);
      }
      if (activeSort === "oldest") {
        return (a.year || 0) - (b.year || 0);
      }
      // 'order' is default based on how it came from Sanity.
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      // If order is equal, fall back to year newest first (optional but nice)
      if (orderA === orderB) {
         return (b.year || 0) - (a.year || 0);
      }
      return orderA - orderB;
    });
  }, [initialItems, activeFilter, activeSort]);

  return (
    <div className="space-y-12">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`text-[10px] md:text-xs uppercase tracking-[0.1em] px-4 py-2 rounded-full border transition-all ${
                activeFilter === filter.value
                  ? "bg-brand-charcoal text-brand-cream border-brand-charcoal"
                  : "bg-transparent text-brand-charcoal/60 border-brand-charcoal/20 hover:border-brand-charcoal"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-brand-charcoal/60">
            Sort by:
          </label>
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value as SortType)}
            className="text-[10px] md:text-xs uppercase tracking-[0.1em] bg-transparent border-b border-brand-charcoal/20 pb-1 focus:outline-none focus:border-brand-charcoal cursor-pointer"
          >
            <option value="order">{t("sort_order")}</option>
            <option value="newest">{t("sort_newest")}</option>
            <option value="oldest">{t("sort_oldest")}</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="min-h-[50vh]"
      >
        <GalleryGrid items={filteredAndSortedItems} />
      </motion.div>
      
      {filteredAndSortedItems.length === 0 && (
        <div className="h-[20vh] flex items-center justify-center opacity-30 italic text-sm">
          No works found for this filter.
        </div>
      )}
    </div>
  );
}

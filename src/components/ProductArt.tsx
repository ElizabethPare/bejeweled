"use client";

import { categoryIcon, SparkleIcon } from "./icons";
import type { Category } from "@/lib/products";

export default function ProductArt({
  category,
  colorway,
  accent,
  size = "md",
}: {
  category: Category;
  colorway: string;
  accent: string;
  size?: "sm" | "md" | "lg";
}) {
  const Icon = categoryIcon[category];
  const iconSize =
    size === "lg" ? "w-24 h-24 md:w-32 md:h-32" : size === "sm" ? "w-10 h-10" : "w-16 h-16";

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorway}22 0%, ${accent}55 55%, ${colorway}33 100%)`,
      }}
    >
      <div
        className="absolute -left-10 -top-10 h-32 w-32 rounded-full blur-2xl"
        style={{ background: `${colorway}55` }}
      />
      <div
        className="absolute -bottom-10 -right-6 h-28 w-28 rounded-full blur-2xl"
        style={{ background: `${accent}66` }}
      />
      <Icon
        className={`${iconSize} relative z-10 drop-shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
        style={{ color: colorway === "#fbf7f2" ? "#2e1b3b" : colorway }}
      />
      <SparkleIcon className="absolute right-[18%] top-[20%] h-3 w-3 text-gold animate-sparkle-float" />
      <SparkleIcon
        className="absolute left-[20%] bottom-[24%] h-2.5 w-2.5 text-ink/50 animate-sparkle-float"
        style={{ animationDelay: "1.2s" }}
      />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-100" />
    </div>
  );
}

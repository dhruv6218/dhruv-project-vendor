"use client";

import React from "react";
import { useI18n } from "@/app/components/i18n/LanguageProvider";

export default function DpaPage() {
  const { t } = useI18n();
  const items = [
    t("legal.dpa.section1"),
    t("legal.dpa.section2"),
    t("legal.dpa.section3"),
    t("legal.dpa.section4"),
    t("legal.dpa.section5"),
    t("legal.dpa.section6"),
    t("legal.dpa.section7"),
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-medium" style={{ fontFamily: "var(--font-geist)" }}><span>{t("legal.dpa.title")}</span></h1>
      <div className="mt-4 space-y-3 text-sm text-[#475569]">
        {items.map((text, idx) => (
          <p key={idx}><span>{text}</span></p>
        ))}
      </div>
    </div>
  );
}

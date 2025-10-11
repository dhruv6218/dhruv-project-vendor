"use client";

import React from "react";
import ProductsGrid, { type ProductItem } from "@/app/components/ProductsGrid";

const ITEMS: ProductItem[] = [
  { name: "GST Verification", price: "₹30 / check", description: "Validate GSTIN status, filings and basic firm info.", href: "/pricing" },
  { name: "PAN Verification", price: "₹20 / check", description: "Verify PAN details and detect name mismatches.", href: "/pricing" },
  { name: "Aadhaar VID", price: "₹25 / check", description: "Mask & verify with OTP for secure identity validation.", href: "/pricing" },
  { name: "Passport Check", price: "₹45 / check", description: "Validate passport status for KYC workflows.", href: "/pricing" },
  { name: "MCA / CIN / DIN", price: "₹40 / check", description: "Company and director lookups with status & charges.", href: "/pricing" },
  { name: "Bank Account Match", price: "₹30 / check", description: "Match account holder name with PAN or invoice.", href: "/pricing" },
];

export default function ProductsPage() {
  return (
    <div>
      <ProductsGrid items={ITEMS} title="Verification Products" />
    </div>
  );
}

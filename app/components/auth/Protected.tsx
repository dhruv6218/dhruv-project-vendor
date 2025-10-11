"use client";

import React from "react";

export type AllowedRole = "user" | "manager" | "admin" | "service";

interface ProtectedProps {
  children: React.ReactNode;
  allowedRoles: AllowedRole[];
}

// Frontend-only build: this wrapper intentionally does nothing and simply renders children.
// All pages are publicly accessible; roles are non-functional in this static demo.
export default function Protected({ children }: ProtectedProps) {
  return <>{children}</>;
}

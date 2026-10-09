"use client";
import { createContext } from "react";
import type { ComponentType } from "react";
import { interactives as defaultInteractives } from "@/content/interactives";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InteractiveRegistry = Record<string, ComponentType<any>>;
export const InteractiveRegistryContext = createContext<InteractiveRegistry>(defaultInteractives);

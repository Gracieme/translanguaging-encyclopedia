import { boundariesContent } from "./boundaries.ts";
import { foundationsContent } from "./foundations.ts";
import type { ManualConceptContent } from "./types.ts";

export const manualConceptContent: Record<string, ManualConceptContent> = {
  ...foundationsContent,
  ...boundariesContent,
};

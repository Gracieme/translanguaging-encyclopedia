import { boundariesContent } from "./boundaries.ts";
import { foundationsContent } from "./foundations.ts";
import { powerContent } from "./power.ts";
import { praxisContent } from "./praxis.ts";
import { cognitionContent } from "./cognition.ts";
import { educationContent } from "./education.ts";
import { literacyContent } from "./literacy.ts";
import type { ManualConceptContent } from "./types.ts";

export const manualConceptContent: Record<string, ManualConceptContent> = {
  ...foundationsContent,
  ...boundariesContent,
  ...powerContent,
  ...praxisContent,
  ...cognitionContent,
  ...educationContent,
  ...literacyContent,
};

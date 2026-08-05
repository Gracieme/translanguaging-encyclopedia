import { boundariesContent } from "./boundaries.ts";
import { foundationsContent } from "./foundations.ts";
import { powerContent } from "./power.ts";
import { praxisContent } from "./praxis.ts";
import { cognitionContent } from "./cognition.ts";
import { educationContent } from "./education.ts";
import { literacyContent } from "./literacy.ts";
import { assessmentContent } from "./assessment.ts";
import { methodContent } from "./method.ts";
import { extensionsContent } from "./extensions.ts";
import { handbookTopicsContent } from "./handbookTopics.ts";
import { sociolinguisticsAContent } from "./sociolinguisticsA.ts";
import { sociolinguisticsBContent } from "./sociolinguisticsB.ts";
import { discourseContent } from "./discourse.ts";
import { slaContent } from "./sla.ts";
import { policyContent } from "./policy.ts";
import { revitalizationContent } from "./revitalization.ts";
import { testingContent } from "./testing.ts";
import { methodologyContent } from "./methodology.ts";
import type { ManualConceptContent } from "./types.ts";

export const manualConceptContent: Record<string, ManualConceptContent> = {
  ...foundationsContent,
  ...boundariesContent,
  ...powerContent,
  ...praxisContent,
  ...cognitionContent,
  ...educationContent,
  ...literacyContent,
  ...assessmentContent,
  ...methodContent,
  ...extensionsContent,
  ...handbookTopicsContent,
  ...sociolinguisticsAContent,
  ...sociolinguisticsBContent,
  ...discourseContent,
  ...slaContent,
  ...policyContent,
  ...revitalizationContent,
  ...testingContent,
  ...methodologyContent,
};

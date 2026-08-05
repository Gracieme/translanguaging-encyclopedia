import { allConcepts, conceptGroups } from "../app/concepts.ts";
import { manualConceptContent } from "../app/manualContent/index.ts";

const terms = new Set(allConcepts.map((concept) => concept.term));
const failures = [];

for (const [term, content] of Object.entries(manualConceptContent)) {
  if (!terms.has(term)) failures.push(`Unknown concept: ${term}`);
  if (content.plain.length < 18) failures.push(`Plain Chinese too short: ${term}`);
  if (content.exampleZh.length < 45) failures.push(`Chinese example too short: ${term}`);
  if (content.exampleEn.length < 70) failures.push(`English example too short: ${term}`);
  if (!content.kind) failures.push(`Missing example kind: ${term}`);
}

const duplicate = (field) => Object.keys(manualConceptContent).length - new Set(Object.values(manualConceptContent).map((content) => content[field])).size;
for (const field of ["plain", "exampleZh", "exampleEn"]) {
  const count = duplicate(field);
  if (count) failures.push(`${count} duplicate values in ${field}`);
}

const coverage = Object.fromEntries(conceptGroups.map((group) => {
  const complete = group.terms.filter((term) => manualConceptContent[term]).length;
  return [group.id, { complete, total: group.terms.length }];
}));

console.log(JSON.stringify({
  complete: Object.keys(manualConceptContent).length,
  total: allConcepts.length,
  remaining: allConcepts.length - Object.keys(manualConceptContent).length,
  coverage,
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;

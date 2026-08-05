import { buildConceptExample, buildPlainChinese } from "../app/conceptExamples.ts";
import { allConcepts, conceptGroups } from "../app/concepts.ts";
import { levelForConcept } from "../app/learningLevels.ts";
import { manualConceptContent } from "../app/manualContent/index.ts";

const failures = [];
const examples = [];
const glosses = [];

const dummyEntry = { number: 0, title: "", fields: [] };
for (const concept of allConcepts) {
  const manual = manualConceptContent[concept.term];
  if (!manual) {
    failures.push(`Missing manual content: ${concept.term}`);
    continue;
  }
  const level = levelForConcept(concept);
  const example = buildConceptExample(dummyEntry, concept, "", level);
  const plain = buildPlainChinese(dummyEntry, concept, level);
  examples.push({ concept, level, example });
  glosses.push({ concept, plain });

  if (plain !== manual.plain) failures.push(`Plain-content mismatch: ${concept.term}`);
  if (example.chinese !== manual.exampleZh) failures.push(`Chinese-example mismatch: ${concept.term}`);
  if (example.english !== manual.exampleEn) failures.push(`English-example mismatch: ${concept.term}`);
  if (example.kind !== manual.kind) failures.push(`Example-kind mismatch: ${concept.term}`);
  if (plain.length < 18) failures.push(`Plain Chinese too short: ${concept.term}`);
  if (example.chinese.length < 45) failures.push(`Chinese example too short: ${concept.term}`);
  if (example.english.length < 70) failures.push(`English example too short: ${concept.term}`);
  if (/生活例子：小林在家说方言|关键片段呈现出以下现象|这个例子体现了/.test(example.chinese)) failures.push(`Legacy template phrase remains: ${concept.term}`);
}

const duplicateCount = (values) => values.length - new Set(values).size;
const duplicateChinese = duplicateCount(examples.map(({ example }) => example.chinese));
const duplicateEnglish = duplicateCount(examples.map(({ example }) => example.english));
const duplicatePlainChinese = duplicateCount(glosses.map(({ plain }) => plain));
if (duplicateChinese) failures.push(`${duplicateChinese} duplicate Chinese examples`);
if (duplicateEnglish) failures.push(`${duplicateEnglish} duplicate English examples`);
if (duplicatePlainChinese) failures.push(`${duplicatePlainChinese} duplicate Plain Chinese glosses`);

const shingles = (value, size) => {
  const normalized = value.toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
  return new Set(Array.from({ length: Math.max(0, normalized.length - size + 1) }, (_, index) => normalized.slice(index, index + size)));
};
const jaccard = (left, right) => {
  const intersection = [...left].filter((item) => right.has(item)).length;
  return intersection / (left.size + right.size - intersection || 1);
};
const nearDuplicates = [];
for (let left = 0; left < examples.length; left += 1) {
  const leftSet = shingles(examples[left].example.chinese, 3);
  for (let right = left + 1; right < examples.length; right += 1) {
    const score = jaccard(leftSet, shingles(examples[right].example.chinese, 3));
    if (score >= 0.72) nearDuplicates.push(`${examples[left].concept.term} <> ${examples[right].concept.term} (${score.toFixed(2)})`);
  }
}
if (nearDuplicates.length) failures.push(...nearDuplicates.map((pair) => `Near-duplicate Chinese examples: ${pair}`));

const groupIds = new Set(conceptGroups.map((group) => group.id));
for (const concept of allConcepts) if (!groupIds.has(concept.groupId)) failures.push(`Unknown group: ${concept.term}`);

console.log(JSON.stringify({
  concepts: allConcepts.length,
  examples: examples.length,
  glosses: glosses.length,
  groups: groupIds.size,
  levels: Object.fromEntries(["undergraduate", "graduate", "doctoral"].map((level) => [level, examples.filter((item) => item.level === level).length])),
  kinds: Object.fromEntries(["生活例子", "课堂例子", "研究示例", "分析示例", "思想实验"].map((kind) => [kind, examples.filter(({ example }) => example.kind === kind).length])),
  duplicateChinese,
  duplicateEnglish,
  duplicatePlainChinese,
  nearDuplicateChinese: nearDuplicates.length,
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;

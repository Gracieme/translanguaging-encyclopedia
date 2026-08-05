import { readFile } from "node:fs/promises";
import { buildConceptExample } from "../app/conceptExamples.ts";
import { allConcepts, conceptGroups } from "../app/concepts.ts";
import { levelForConcept } from "../app/learningLevels.ts";
import { sourceDefinitions } from "../app/sourceDefinitions.ts";

const markdown = await readFile(new URL("../public/encyclopedia.md", import.meta.url), "utf8");
const blocks = markdown.split(/(?=^### \d+\. )/m).slice(1);
const entries = blocks.flatMap((block) => {
  const lines = block.trim().split("\n");
  const heading = lines[0].match(/^### (\d+)\. (.+)$/);
  if (!heading) return [];
  const fields = lines.slice(1).flatMap((line) => {
    const field = line.match(/^\d+\. \*\*(.+?)\*\*：(.+)$/);
    return field ? [{ label: field[1], text: field[2] }] : [];
  });
  return [{ number: Number(heading[1]), title: heading[2], fields }];
});

const normalize = (value) => value.toLowerCase().replace(/[（）()／/–—-]/g, " ").replace(/\s+/g, " ").trim();
const englishTitle = (title) => title.match(/^(.+?)（/)?.[1]?.trim() || title;
const entryMap = new Map(entries.map((entry) => [normalize(englishTitle(entry.title)), entry]));
const failures = [];
const examples = [];

for (const concept of allConcepts) {
  const entry = entryMap.get(normalize(concept.term));
  if (!entry) { failures.push(`Missing entry: ${concept.term}`); continue; }
  const source = sourceDefinitions[entry.number];
  if (!source?.english) { failures.push(`Missing English definition: ${concept.term}`); continue; }
  const level = levelForConcept(concept);
  const example = buildConceptExample(entry, concept, source.english, level);
  examples.push({ concept, example });
  if (!example.chinese.includes(concept.term)) failures.push(`Chinese example lacks term: ${concept.term}`);
  if (!example.english.includes(concept.term)) failures.push(`English example lacks term: ${concept.term}`);
  if (example.chinese.length < (level === "undergraduate" ? 95 : 150)) failures.push(`Chinese example too short: ${concept.term}`);
  if (example.english.length < (level === "undergraduate" ? 160 : 180)) failures.push(`English example too short: ${concept.term}`);
  if (level === "undergraduate" && /研究者|分析者|关键片段|分析关系/.test(example.chinese.split("为什么：")[0])) failures.push(`Undergraduate example is too research-oriented: ${concept.term}`);
  if (level === "graduate" && !["实际例子：", "这是什么：", "怎样研究：", "别混淆："].every((label) => example.chinese.includes(label))) failures.push(`Graduate example lacks teaching structure: ${concept.term}`);
  if (level === "doctoral" && !["先用例子理解：", "它是什么：", "研究方向：", "理论边界："].every((label) => example.chinese.includes(label))) failures.push(`Doctoral example lacks teaching structure: ${concept.term}`);
}

const groupIds = new Set(conceptGroups.map((group) => group.id));
for (const concept of allConcepts) {
  if (!groupIds.has(concept.groupId)) failures.push(`Unknown group: ${concept.term} -> ${concept.groupId}`);
}

const duplicateChinese = examples.length - new Set(examples.map(({ example }) => example.chinese)).size;
const duplicateEnglish = examples.length - new Set(examples.map(({ example }) => example.english)).size;
if (duplicateChinese) failures.push(`${duplicateChinese} duplicate Chinese examples`);
if (duplicateEnglish) failures.push(`${duplicateEnglish} duplicate English examples`);

const average = (values) => Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
console.log(JSON.stringify({
  concepts: allConcepts.length,
  entries: entries.length,
  examples: examples.length,
  groups: groupIds.size,
  levels: Object.fromEntries(["undergraduate", "graduate", "doctoral"].map((level) => [level, allConcepts.filter((concept) => levelForConcept(concept) === level).length])),
  chineseLength: { min: Math.min(...examples.map(({ example }) => example.chinese.length)), average: average(examples.map(({ example }) => example.chinese.length)) },
  englishLength: { min: Math.min(...examples.map(({ example }) => example.english.length)), average: average(examples.map(({ example }) => example.english.length)) },
  duplicateChinese,
  duplicateEnglish,
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;

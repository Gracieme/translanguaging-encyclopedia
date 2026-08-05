import { manualConceptContent } from "./manualContent/index.ts";

export type ExampleEntry = {
  number: number;
  title: string;
  fields: { label: string; text: string }[];
};

export type ExampleConcept = {
  term: string;
  groupId: string;
  groupLabel: string;
};

export type ConceptExample = {
  chinese: string;
  english: string;
  kind: "生活例子" | "课堂例子" | "研究示例" | "分析示例" | "思想实验";
};

export type ExampleLevel = "undergraduate" | "graduate" | "doctoral";

function requiredContent(term: string) {
  const content = manualConceptContent[term];
  if (!content) throw new Error(`Missing manual content for ${term}`);
  return content;
}

export function buildPlainChinese(entry: ExampleEntry, concept: ExampleConcept, level: ExampleLevel): string {
  void entry;
  void level;
  return requiredContent(concept.term).plain;
}

export function buildConceptExample(
  entry: ExampleEntry,
  concept: ExampleConcept,
  englishDefinition: string,
  level: ExampleLevel = "doctoral",
): ConceptExample {
  void entry;
  void englishDefinition;
  void level;
  const content = requiredContent(concept.term);
  return { chinese: content.exampleZh, english: content.exampleEn, kind: content.kind };
}

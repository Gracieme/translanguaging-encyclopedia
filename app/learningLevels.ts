export type LearningLevel = "undergraduate" | "graduate" | "doctoral";

export const levelProfiles: { id: LearningLevel; label: string; eyebrow: string; description: string; outcome: string }[] = [
  { id: "undergraduate", label: "本科生基础概念", eyebrow: "先把基本概念弄清楚", description: "语言、双语、多语、变异、互动、语篇、身份与教育常识。", outcome: "目标：能准确理解术语，并说清基本概念差异" },
  { id: "graduate", label: "硕士生研究入门", eyebrow: "开始提出和研究问题", description: "文献比较、课堂应用、研究设计、资料分析、测量与证据质量。", outcome: "目标：能完成文献综述、课程论文与可行研究设计" },
  { id: "doctoral", label: "博士生理论深化", eyebrow: "进入深层理论与原创论证", description: "本体论、认识论、殖民性、权力伦理、批判谱系与理论边界。", outcome: "目标：能建构理论立场，并提出可辩护的原创论证" },
];

const undergraduateGroups = new Set(["boundaries", "sociolinguistics", "discourse", "sla", "policy"]);
const graduateGroups = new Set(["education", "literacy", "assessment", "testing", "cognition", "revitalization", "method", "methodology", "translation_ext", "technology_ext", "extensions"]);
const doctoralGroups = new Set(["foundations", "power", "praxis", "identity", "handbook_topics"]);
const undergraduateCore = new Set(["Translanguaging", "Languaging", "Multimodality", "Meaning-making", "Bilingualism", "Multilingualism", "Plurilingualism", "Code-switching", "Language ideology", "Communicative competence", "Belonging", "Othering", "Stereotype", "Prejudice", "Discrimination"]);
const graduateResearchCore = new Set(["Ethnography", "Discourse analysis", "Conversation analysis", "Interactional sociolinguistics", "Corpus linguistics", "Case study", "Mixed methods", "Validity", "Reliability", "Reflexivity", "Positionality", "Triangulation", "Informed consent", "Process consent", "Confidentiality", "Anonymity", "Authorship", "Intellectual property", "Transparency", "Narrative identity", "Passing", "Misrecognition", "In-betweenness", "Identity approach to SLA", "Usage-based learning", "Emergentism", "Complex dynamic systems theory", "Ecological approach to SLA"]);

export function levelForConcept(concept: { term: string; groupId: string }): LearningLevel {
  if (undergraduateCore.has(concept.term)) return "undergraduate";
  if (graduateResearchCore.has(concept.term)) return "graduate";
  if (doctoralGroups.has(concept.groupId)) return "doctoral";
  if (graduateGroups.has(concept.groupId)) return "graduate";
  if (undergraduateGroups.has(concept.groupId)) return "undergraduate";
  return "doctoral";
}

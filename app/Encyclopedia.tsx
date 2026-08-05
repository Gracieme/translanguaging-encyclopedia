"use client";

import { useEffect, useMemo, useState } from "react";
import { allConcepts, conceptGroups } from "./concepts";
import { sourceDefinitions } from "./sourceDefinitions";

type DeepEntry = {
  number: number;
  title: string;
  fields: { label: string; text: string }[];
};

type LearningLevel = "undergraduate" | "graduate" | "doctoral";

const levelProfiles: { id: LearningLevel; label: string; eyebrow: string; description: string; outcome: string }[] = [
  { id: "undergraduate", label: "本科生基础", eyebrow: "先建立共同语言", description: "核心术语、经典区分与应用语言学常识。", outcome: "适合入门、课程预习与建立概念框架" },
  { id: "graduate", label: "研究生进阶", eyebrow: "开始比较与应用", description: "理论流派、课堂实践、研究方法与分析工具。", outcome: "适合文献综述、课程论文与研究设计" },
  { id: "doctoral", label: "博士生研究", eyebrow: "进入争议与原创研究", description: "本体论、认识论、殖民性、批判谱系与方法论边界。", outcome: "适合开题、理论建构与可审查的学术论证" },
];

const undergraduateGroups = new Set(["boundaries", "sociolinguistics", "discourse", "sla", "policy"]);
const graduateGroups = new Set(["education", "literacy", "assessment", "testing", "cognition", "revitalization", "method"]);
const undergraduateCore = new Set(["Translanguaging", "Languaging", "Multimodality", "Meaning-making", "Bilingualism", "Multilingualism", "Plurilingualism", "Code-switching", "Language ideology", "Communicative competence"]);

function levelForConcept(concept: { term: string; groupId: string }): LearningLevel {
  if (undergraduateCore.has(concept.term) || undergraduateGroups.has(concept.groupId)) return "undergraduate";
  if (graduateGroups.has(concept.groupId)) return "graduate";
  return "doctoral";
}

const normalize = (value: string) => value.toLowerCase().replace(/[（）()／/–—-]/g, " ").replace(/\s+/g, " ").trim();

function entryParts(title: string) {
  const match = title.match(/^(.+?)（(.+)）$/);
  const chinese = match?.[2].replace(/；本百科保留英文作总称$/, "").trim();
  return match ? { english: match[1].trim(), chinese: chinese || "中文译名待校订" } : { english: title, chinese: "中文译名待校订" };
}

function matchingEntry(term: string, entries: DeepEntry[]) {
  const target = normalize(term);
  return entries.find((entry) => {
    const title = normalize(entryParts(entry.title).english);
    return title === target || title.startsWith(target) || target.startsWith(title);
  });
}

function parseMarkdown(markdown: string): DeepEntry[] {
  const entries: DeepEntry[] = [];
  const blocks = markdown.split(/(?=^### \d+\. )/m).slice(1);
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const match = lines[0].match(/^### (\d+)\. (.+)$/);
    if (!match) continue;
    const fields = lines.slice(1).flatMap((line) => {
      const field = line.match(/^\d+\. \*\*(.+?)\*\*：(.+)$/);
      return field ? [{ label: field[1], text: field[2] }] : [];
    });
    entries.push({ number: Number(match[1]), title: match[2], fields });
  }
  return entries;
}

export default function Encyclopedia() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [level, setLevel] = useState<LearningLevel | "all">("all");
  const [deepEntries, setDeepEntries] = useState<DeepEntry[]>([]);
  const [selected, setSelected] = useState<DeepEntry | null>(null);

  useEffect(() => {
    fetch("/encyclopedia.md")
      .then((response) => response.text())
      .then((text) => setDeepEntries(parseMarkdown(text)));
  }, []);

  const deepIndex = useMemo(() => new Set(deepEntries.map((entry) => normalize(entry.title.split("（")[0]))), [deepEntries]);
  const filtered = useMemo(() => {
    const needle = normalize(query);
    return allConcepts.filter((concept) => {
      const bilingualTitle = matchingEntry(concept.term, deepEntries)?.title || "";
      const inGroup = group === "all" || concept.groupId === group;
      const inLevel = level === "all" || levelForConcept(concept) === level;
      const inSearch = !needle || normalize(`${concept.term} ${bilingualTitle} ${concept.groupLabel}`).includes(needle);
      return inGroup && inLevel && inSearch;
    });
  }, [deepEntries, group, level, query]);

  const chooseLevel = (next: LearningLevel) => {
    setLevel(next);
    setGroup("all");
    document.querySelector("#lexicon")?.scrollIntoView({ behavior: "smooth" });
  };

  const openConcept = (term: string) => {
    const exact = matchingEntry(term, deepEntries);
    if (exact) setSelected(exact);
  };

  return (
    <main>
      <header className="masthead">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">TL</span>
          <span>跨语实践概念百科</span>
        </a>
        <nav aria-label="主要导航">
          <a href="#paths">学习路径</a>
          <a href="#lexicon">查概念</a>
          <a href="#about">关于</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">Translanguaging · Applied Linguistics</div>
        <h1>从你现在的阶段，<br /><em>开始理解语言。</em></h1>
        <p className="lede">一部按学习阶段组织的中英双语概念百科。先选路径，再读概念。</p>
        <label className="hero-search">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => document.querySelector("#lexicon")?.scrollIntoView({ behavior: "smooth" })} placeholder="搜索中文或英文，例如：跨语实践 / Translanguaging" aria-label="搜索中英文概念" />
        </label>
      </section>

      <section className="paths" id="paths">
        <div className="simple-heading"><span>选择学习路径</span><h2>你现在需要知道到哪一步？</h2></div>
        <div className="path-grid">
          {levelProfiles.map((item, index) => {
            const count = allConcepts.filter((concept) => levelForConcept(concept) === item.id).length;
            return <button key={item.id} className={`path-card path-${item.id}`} onClick={() => chooseLevel(item.id)}>
              <span className="path-number">0{index + 1}</span><small>{item.eyebrow}</small><h3>{item.label}</h3><p>{item.description}</p><em>{item.outcome}</em><b>{count} 个概念 →</b>
            </button>;
          })}
        </div>
      </section>

      <section className="lexicon" id="lexicon">
        <div className="section-heading">
          <div><span className="kicker">CONCEPT LIBRARY</span><h2>{level === "all" ? "全部概念" : levelProfiles.find((item) => item.id === level)?.label}</h2></div>
          <button className="reset-link" onClick={() => { setLevel("all"); setGroup("all"); setQuery(""); }}>清除筛选</button>
        </div>
        <div className="toolbar">
          <label className="search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索中文、英文或研究领域…" aria-label="搜索中英文概念" />
          </label>
          <select value={group} onChange={(event) => setGroup(event.target.value)} aria-label="按类别筛选">
            <option value="all">全部类别</option>
            {conceptGroups.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </div>
        <div className="level-tabs" aria-label="学习阶段">
          <button className={level === "all" ? "active" : ""} onClick={() => setLevel("all")}>全部</button>
          {levelProfiles.map((item) => <button key={item.id} className={level === item.id ? "active" : ""} onClick={() => setLevel(item.id)}>{item.label}</button>)}
        </div>
        <details className="advanced-filter"><summary>更多学科分类</summary><div className="filter-row" aria-label="概念类别">
          <button className={group === "all" ? "active" : ""} onClick={() => setGroup("all")}>全部</button>
          {conceptGroups.map((item) => <button key={item.id} className={group === item.id ? "active" : ""} onClick={() => setGroup(item.id)}>{item.label}</button>)}
        </div></details>
        <div className="result-line">{filtered.length} 个概念 · 其中 {filtered.filter((concept) => [...deepIndex].some((title) => title.startsWith(normalize(concept.term)) || normalize(concept.term).startsWith(title))).length} 个可阅读全文</div>
        <div className="concept-grid">
          {filtered.map((concept) => {
            const entry = matchingEntry(concept.term, deepEntries);
            const deep = Boolean(entry);
            const bilingual = entry ? entryParts(entry.title) : { english: concept.term, chinese: "中文译名待校订" };
            return (
              <article className={`concept-card ${concept.color}`} key={`${concept.groupId}-${concept.term}`}>
                <div className="card-meta"><span>{concept.groupLabel}</span>{deep && <b>双语深度词条</b>}</div>
                <h3 lang="en">{bilingual.english}</h3>
                <h4>{bilingual.chinese}</h4>
                <button onClick={() => openConcept(concept.term)} disabled={!deep}>{deep ? "阅读全文 →" : "译名校订中"}</button>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && <div className="empty">没有匹配概念。尝试缩短关键词或切换类别。</div>}
      </section>

      <section className="about" id="about">
        <details><summary>这部百科如何解释每个概念？</summary><p>每个完整词条依次说明：定义、问题来源、理论背景、学者谱系、应用、相近概念辨析、手册用法、历时变化、优势与批评，以及研究操作化。</p></details>
        <details><summary>内容依据是什么？</summary><p>以《The Handbook of Translanguaging》为主文献，以《The Handbook of Applied Linguistics》重建学科背景；它是一部概念百科，不是章节摘要。</p></details>
        <p className="quiet-stat">已编目 {allConcepts.length} 个概念 · 已完成 {deepEntries.length} 个十维深度词条</p>
      </section>

      <footer><span>跨语实践概念百科</span><p>Evidence-controlled · Concept-led · Research-ready</p><a href="#top">回到顶部 ↑</a></footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <article className="modal" role="dialog" aria-modal="true" aria-labelledby="entry-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭词条">×</button>
            <span className="entry-no">ENTRY {String(selected.number).padStart(3, "0")}</span>
            <div className="bilingual-heading" id="entry-title">
              <h2 lang="en">{entryParts(selected.title).english}</h2>
              <h3>{entryParts(selected.title).chinese}</h3>
            </div>
            <aside className="translation-note"><b>译名说明</b><p>英文原词是稳定的检索锚点；中文部分呈现推荐译名及常见异译。斜线“／”表示并存译法，不表示它们在理论上完全等价。具体语义差异见下方“概念辨析”。</p></aside>
            <div className="entry-fields">
              {selected.fields.map((field, index) => <section key={`${field.label}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{field.label}</h3><p>{field.text}</p>{index === 0 && sourceDefinitions[selected.number] && <div className="english-definition"><span>ENGLISH DEFINITION · {sourceDefinitions[selected.number].sourceType}</span><p lang="en">{sourceDefinitions[selected.number].english}</p><small>{sourceDefinitions[selected.number].location}</small></div>}</div></section>)}
            </div>
          </article>
        </div>
      )}
    </main>
  );
}

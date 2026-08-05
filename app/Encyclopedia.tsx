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
  return match ? { english: match[1].trim(), chinese: match[2].trim() } : { english: title, chinese: "" };
}

function matchingEntry(term: string, entries: DeepEntry[]) {
  const target = normalize(term);
  return entries.find((entry) => normalize(entryParts(entry.title).english) === target);
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
  const [isBrowsing, setIsBrowsing] = useState(false);

  useEffect(() => {
    fetch("/encyclopedia.md")
      .then((response) => response.text())
      .then((text) => setDeepEntries(parseMarkdown(text)));
  }, []);

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
    setIsBrowsing(true);
    setLevel(next);
    setGroup("all");
    document.querySelector("#lexicon")?.scrollIntoView({ behavior: "smooth" });
  };

  const openConcept = (term: string) => {
    const exact = matchingEntry(term, deepEntries);
    if (exact) setSelected(exact);
  };

  const startBrowsing = () => {
    setIsBrowsing(true);
    document.querySelector("#lexicon")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <header className="masthead">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">TL</span>
          <span>应用语言学 × 社会语言学：超语概念百科</span>
        </a>
        <nav aria-label="主要导航">
          <a href="#paths">学习路径</a>
          <a href="#lexicon" onClick={() => setIsBrowsing(true)}>查概念</a>
          <a href="#about">关于</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">Translanguaging · Applied Linguistics · Sociolinguistics</div>
        <h1>从应用语言学与社会语言学，<br /><em>拆解超语。</em></h1>
        <p className="lede">先补足语言、社会、变异、互动与教育的基础知识，再进入超语的理论争议与研究方法。</p>
        <label className="hero-search">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => { setQuery(event.target.value); setIsBrowsing(true); }} onFocus={() => document.querySelector("#lexicon")?.scrollIntoView({ behavior: "smooth" })} placeholder="搜索中文或英文，例如：跨语实践 / Translanguaging" aria-label="搜索中英文概念" />
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
          <div><span className="kicker">CONCEPT LIBRARY</span><h2>{isBrowsing ? (level === "all" ? "概念索引" : levelProfiles.find((item) => item.id === level)?.label) : "怎样使用这部百科？"}</h2></div>
          {isBrowsing && <button className="reset-link" onClick={() => { setLevel("all"); setGroup("all"); setQuery(""); }}>清除筛选</button>}
        </div>
        {!isBrowsing ? <div className="guide-card">
          <article className="concept-card red">
            <div className="card-meta"><span>基础理论与本体论</span><b>示范词条</b></div>
            <h3 lang="en">Translanguaging</h3>
            <h4>跨语实践／跨语用</h4>
            <p>每张卡片都通向一个双语深度词条：先看英文原词与中文译名，再依次阅读定义、理论谱系、应用、辨析、批评和研究操作化。</p>
            <button onClick={() => openConcept("Translanguaging")}>打开示范词条 →</button>
          </article>
          <div className="guide-copy">
            <span>三种进入方式</span>
            <ol><li>直接搜索中文或英文术语</li><li>按本科、研究生或博士阶段选择学习路径</li><li>进入索引后按学科类别继续筛选</li></ol>
            <button className="browse-button" onClick={startBrowsing}>进入完整概念索引 →</button>
          </div>
        </div> : <>
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
        <div className="result-line">{filtered.length} 个概念 · {filtered.filter((concept) => Boolean(matchingEntry(concept.term, deepEntries))).length} 个可阅读全文</div>
        {deepEntries.length === 0 ? <div className="empty">正在载入完整百科内容…</div> : <div className="concept-grid">
          {filtered.flatMap((concept) => {
            const entry = matchingEntry(concept.term, deepEntries);
            if (!entry) return [];
            const bilingual = entryParts(entry.title);
            return [
              <article className={`concept-card ${concept.color}`} key={`${concept.groupId}-${concept.term}`}>
                <div className="card-meta"><span>{concept.groupLabel}</span><b>双语深度词条</b></div>
                <h3 lang="en">{bilingual.english}</h3>
                <h4>{bilingual.chinese}</h4>
                <button onClick={() => openConcept(concept.term)}>阅读全文 →</button>
              </article>
            ];
          })}
        </div>}
        {filtered.length === 0 && <div className="empty">没有匹配概念。尝试缩短关键词或切换类别。</div>}
        </>}
      </section>

      <section className="about" id="about">
        <details><summary>这部百科如何解释每个概念？</summary><p>每个完整词条依次说明：定义、问题来源、理论背景、学者谱系、应用、相近概念辨析、手册用法、历时变化、优势与批评，以及研究操作化。</p></details>
        <details><summary>内容依据是什么？</summary><p>以《The Handbook of Translanguaging》为主文献，以《The Handbook of Applied Linguistics》重建应用语言学背景，并以 Allan Bell 的《The Guidebook to Sociolinguistics》补足多语、语言接触、变异、互动、身份与社会意义等基础。它是一部概念百科，不是章节摘要。</p></details>
        <p className="quiet-stat">已编目 {allConcepts.length} 个概念 · 已完成 {deepEntries.length} 个十维深度词条</p>
      </section>

      <footer><span>应用语言学 × 社会语言学：超语概念百科</span><p>Evidence-controlled · Concept-led · Research-ready</p><a href="#top">回到顶部 ↑</a></footer>

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

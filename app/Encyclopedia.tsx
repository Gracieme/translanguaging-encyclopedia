"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { allConcepts, conceptGroups } from "./concepts";
import { buildConceptExample } from "./conceptExamples";
import { sourceDefinitions } from "./sourceDefinitions";

type DeepEntry = {
  number: number;
  title: string;
  fields: { label: string; text: string }[];
};

type LearningLevel = "undergraduate" | "graduate" | "doctoral";

const levelProfiles: { id: LearningLevel; label: string; eyebrow: string; description: string; outcome: string }[] = [
  { id: "undergraduate", label: "本科生基础概念", eyebrow: "先把基本概念弄清楚", description: "语言、双语、多语、变异、互动、语篇、身份与教育常识。", outcome: "目标：能准确理解术语，并说清基本概念差异" },
  { id: "graduate", label: "硕士生研究入门", eyebrow: "开始提出和研究问题", description: "文献比较、课堂应用、研究设计、资料分析、测量与证据质量。", outcome: "目标：能完成文献综述、课程论文与可行研究设计" },
  { id: "doctoral", label: "博士生理论深化", eyebrow: "进入深层理论与原创论证", description: "本体论、认识论、殖民性、权力伦理、批判谱系与理论边界。", outcome: "目标：能建构理论立场，并提出可辩护的原创论证" },
];

const undergraduateGroups = new Set(["boundaries", "sociolinguistics", "discourse", "sla", "policy"]);
const graduateGroups = new Set(["education", "literacy", "assessment", "testing", "cognition", "revitalization", "method", "methodology", "translation_ext", "technology_ext", "extensions"]);
const doctoralGroups = new Set(["foundations", "power", "praxis", "identity", "handbook_topics"]);
const undergraduateCore = new Set(["Translanguaging", "Languaging", "Multimodality", "Meaning-making", "Bilingualism", "Multilingualism", "Plurilingualism", "Code-switching", "Language ideology", "Communicative competence", "Belonging", "Othering", "Stereotype", "Prejudice", "Discrimination"]);
const graduateResearchCore = new Set(["Ethnography", "Discourse analysis", "Conversation analysis", "Interactional sociolinguistics", "Corpus linguistics", "Case study", "Mixed methods", "Validity", "Reliability", "Reflexivity", "Positionality", "Triangulation", "Informed consent", "Process consent", "Confidentiality", "Anonymity", "Authorship", "Intellectual property", "Transparency", "Narrative identity", "Passing", "Misrecognition", "In-betweenness", "Identity approach to SLA", "Usage-based learning", "Emergentism", "Complex dynamic systems theory", "Ecological approach to SLA"]);

function levelForConcept(concept: { term: string; groupId: string }): LearningLevel {
  if (undergraduateCore.has(concept.term)) return "undergraduate";
  if (graduateResearchCore.has(concept.term)) return "graduate";
  if (doctoralGroups.has(concept.groupId)) return "doctoral";
  if (graduateGroups.has(concept.groupId)) return "graduate";
  if (undergraduateGroups.has(concept.groupId)) return "undergraduate";
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

function sourceLabel(sourceType: string) {
  if (sourceType === "Direct formulation") return "原书直接表述";
  if (sourceType === "Bell sociolinguistics foundation") return "依据 Bell 改写的社会语言学定义";
  return "百科综合改写（非原书原句）";
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
  const [loadError, setLoadError] = useState(false);
  const [copied, setCopied] = useState<"link" | "citation" | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("encyclopedia.md")
      .then((response) => { if (!response.ok) throw new Error("load failed"); return response.text(); })
      .then((text) => setDeepEntries(parseMarkdown(text)))
      .catch(() => setLoadError(true));
  }, []);

  useEffect(() => {
    if (!deepEntries.length) return;
    const syncFromUrl = () => {
      const term = new URL(window.location.href).searchParams.get("concept");
      setSelected(term ? matchingEntry(term, deepEntries) || null : null);
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [deepEntries]);

  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeConcept();
      if (event.key === "Tab" && modalRef.current) {
        const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute("disabled"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const filtered = useMemo(() => {
    const needle = normalize(query);
    return allConcepts.filter((concept) => {
      const entry = matchingEntry(concept.term, deepEntries);
      const bilingualTitle = entry?.title || "";
      const source = entry ? sourceDefinitions[entry.number] : undefined;
      const example = entry && source ? buildConceptExample(entry, concept, source.english) : undefined;
      const searchableText = `${concept.term} ${bilingualTitle} ${concept.groupLabel} ${entry?.fields.map((field) => `${field.label} ${field.text}`).join(" ") || ""} ${source?.english || ""} ${source?.location || ""} ${example?.chinese || ""} ${example?.english || ""}`;
      const inGroup = group === "all" || concept.groupId === group;
      const inLevel = level === "all" || levelForConcept(concept) === level;
      const inSearch = !needle || normalize(searchableText).includes(needle);
      return inGroup && inLevel && inSearch;
    });
  }, [deepEntries, group, level, query]);

  const relatedConcepts = useMemo(() => {
    if (!selected) return [];
    const selectedEnglish = entryParts(selected.title).english;
    const indexed = allConcepts.find((concept) => normalize(concept.term) === normalize(selectedEnglish));
    if (!indexed) return [];
    return allConcepts.filter((concept) => concept.groupId === indexed.groupId && normalize(concept.term) !== normalize(indexed.term)).slice(0, 6);
  }, [selected]);

  const chooseLevel = (next: LearningLevel) => {
    setIsBrowsing(true);
    setLevel(next);
    setGroup("all");
    document.querySelector("#lexicon")?.scrollIntoView({ behavior: "smooth" });
  };

  const openConcept = (term: string) => {
    const exact = matchingEntry(term, deepEntries);
    if (exact) {
      setSelected(exact);
      setCopied(null);
      const url = new URL(window.location.href);
      url.searchParams.set("concept", entryParts(exact.title).english);
      window.history.pushState({}, "", url);
    }
  };

  const closeConcept = () => {
    setSelected(null);
    setCopied(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("concept");
    window.history.pushState({}, "", url);
  };

  const copyConceptLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied("link");
  };

  const copyConceptCitation = async () => {
    if (!selected) return;
    const title = entryParts(selected.title);
    const citation = `《应用语言学 × 社会语言学：超语概念百科》，“${title.english}（${title.chinese}）”，词条 ${selected.number}，${window.location.href}（访问日期：${new Date().toISOString().slice(0, 10)}）。`;
    await navigator.clipboard.writeText(citation);
    setCopied("citation");
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
        <h1><span>从应用语言学与社会语言学出发</span><em>拆解超语</em></h1>
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
            <p>每张卡片都通向一个双语深度词条：先看英文原词与中文译名，再依次阅读定义、理论谱系、应用、辨析、批评、研究操作化与中英双语例子。</p>
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
        {loadError ? <div className="empty">百科内容暂时载入失败，请刷新页面重试。</div> : deepEntries.length === 0 ? <div className="empty">正在载入完整百科内容…</div> : <div className="concept-grid">
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
        <details><summary>这部百科如何解释每个概念？</summary><p>每个完整词条依次说明：定义、问题来源、理论背景、学者谱系、应用、相近概念辨析、手册用法、历时变化、优势与批评、研究操作化，以及中英双语例子与判断依据。</p></details>
        <details><summary>内容依据是什么？</summary><p>以《The Handbook of Translanguaging》为主文献，以《The Handbook of Applied Linguistics》重建应用语言学背景，并以 Allan Bell 的《The Guidebook to Sociolinguistics》补足多语、语言接触、变异、互动、身份与社会意义等基础。它是一部概念百科，不是章节摘要。</p></details>
        <details><summary>英文定义是不是原书原句？</summary><p>只有标为“原书直接表述”的定义可视为紧贴原书措辞；“依据手册综合改写”和“依据 Bell 改写”均为本百科为便于理解而作的英文综合定义，不应作为原书直接引文。引用论文时请回到所列章节或页码核对原文。</p></details>
        <details><summary>“超语”“跨语实践”和“跨语用”是什么关系？</summary><p>网站标题使用较简洁的“超语”；词条正文以“跨语实践”为推荐分析译名，并保留“跨语用”这一常见异译。三者均以英文 Translanguaging 为检索锚点；涉及具体理论差异时以英文原词和词条辨析为准。</p></details>
        <details><summary>核心参考文献</summary><p>Li Wei, Phyak, Lee 与 García 编《The Handbook of Translanguaging》（2025）；Davies 与 Elder 编《The Handbook of Applied Linguistics》（2004）；Allan Bell《The Guidebook to Sociolinguistics》（2014）。词条中的来源位置用于回查方向，不替代正式版本的页码核验。</p></details>
        <p className="quiet-stat">已编目 {allConcepts.length} 个概念 · 已完成 {deepEntries.length} 个十一维双语深度词条</p>
      </section>

      <footer><span>应用语言学 × 社会语言学：超语概念百科</span><p>Evidence-controlled · Concept-led · Research-ready</p><a href="#top">回到顶部 ↑</a></footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={closeConcept}>
          <article ref={modalRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="entry-title" onMouseDown={(event) => event.stopPropagation()}>
            <button ref={closeButtonRef} className="modal-close" onClick={closeConcept} aria-label="关闭词条">×</button>
            <span className="entry-no">ENTRY {String(selected.number).padStart(3, "0")}</span>
            <div className="bilingual-heading" id="entry-title">
              <h2 lang="en">{entryParts(selected.title).english}</h2>
              <h3>{entryParts(selected.title).chinese}</h3>
            </div>
            <div className="entry-actions"><button className="copy-link" onClick={copyConceptLink}>{copied === "link" ? "链接已复制" : "复制本词条链接"}</button><button className="copy-link" onClick={copyConceptCitation}>{copied === "citation" ? "引用已复制" : "复制中文引用"}</button></div>
            <aside className="translation-note"><b>译名说明</b><p>英文原词是稳定的检索锚点；中文部分呈现推荐译名及常见异译。斜线“／”表示并存译法，不表示它们在理论上完全等价。具体语义差异见下方“概念辨析”。</p></aside>
            <div className="entry-fields">
              {selected.fields.map((field, index) => <section key={`${field.label}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{field.label}</h3><p>{field.text}</p>{index === 0 && sourceDefinitions[selected.number] && <div className="english-definition"><span>ENGLISH DEFINITION · {sourceLabel(sourceDefinitions[selected.number].sourceType)}</span><p lang="en">{sourceDefinitions[selected.number].english}</p><small>{sourceDefinitions[selected.number].location}</small><em>来源类型已明确区分；综合改写不是可直接引用的原书引文。</em></div>}</div></section>)}
              {sourceDefinitions[selected.number] && (() => {
                const indexedConcept = allConcepts.find((concept) => normalize(concept.term) === normalize(entryParts(selected.title).english));
                if (!indexedConcept) return null;
                const example = buildConceptExample(selected, indexedConcept, sourceDefinitions[selected.number].english);
                return <section className="concept-example"><b>11</b><div><h3>例子 / Example</h3><div className="example-language"><span>中文情境与判断</span><p>{example.chinese}</p></div><div className="example-language english-example"><span>ENGLISH EXAMPLE &amp; DIAGNOSTIC</span><p lang="en">{example.english}</p></div><small>本例由百科根据词条定义与应用场景编写，用于概念辨析，不是原书案例或实证资料引文。</small></div></section>;
              })()}
            </div>
            {relatedConcepts.length > 0 && <section className="related-concepts"><span>同类概念</span><div>{relatedConcepts.map((concept) => <button key={`${concept.groupId}-${concept.term}`} onClick={() => openConcept(concept.term)}>{concept.term}</button>)}</div></section>}
          </article>
        </div>
      )}
    </main>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { allConcepts, conceptGroups } from "./concepts";

type DeepEntry = {
  number: number;
  title: string;
  fields: { label: string; text: string }[];
};

const normalize = (value: string) => value.toLowerCase().replace(/[（）()／/–—-]/g, " ").replace(/\s+/g, " ").trim();

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
      const inGroup = group === "all" || concept.groupId === group;
      const inSearch = !needle || normalize(`${concept.term} ${concept.groupLabel}`).includes(needle);
      return inGroup && inSearch;
    });
  }, [group, query]);

  const openConcept = (term: string) => {
    const target = normalize(term);
    const exact = deepEntries.find((entry) => {
      const title = normalize(entry.title.split("（")[0]);
      return title === target || title.startsWith(target) || target.startsWith(title);
    });
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
          <a href="#lexicon">概念库</a>
          <a href="#method">研究工具</a>
          <a href="#sources">文献依据</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">Doctoral Encyclopedia · 2026 Edition</div>
        <h1>语言从来不是<br /><em>一座座孤岛。</em></h1>
        <p className="lede">以《The Handbook of Translanguaging》为主文献、以《The Handbook of Applied Linguistics》为学科背景的中文研究型百科。</p>
        <div className="hero-stats" aria-label="百科统计">
          <div><strong>{allConcepts.length}</strong><span>概念已编目</span></div>
          <div><strong>{deepEntries.length || 50}</strong><span>十维深度词条</span></div>
          <div><strong>33</strong><span>主手册章节</span></div>
          <div><strong>10</strong><span>分析维度</span></div>
        </div>
        <a className="primary-link" href="#lexicon">开始探索 <span>↓</span></a>
      </section>

      <section className="principle">
        <p>不是章节摘要</p>
        <h2>从“这是什么”一直追问到<br />“如何把它变成可审查的研究”。</h2>
        <ol>
          <li>清晰定义</li><li>问题来源</li><li>理论背景</li><li>学者谱系</li><li>应用语言学用途</li>
          <li>相近概念辨析</li><li>本手册用法</li><li>历时变化</li><li>优势与批评</li><li>研究操作化</li>
        </ol>
      </section>

      <section className="lexicon" id="lexicon">
        <div className="section-heading">
          <div><span className="kicker">CONCEPT ATLAS</span><h2>概念地图</h2></div>
          <p>350 个经筛选概念构成完整导航；带“深度”标记的词条已完成十项解释，其余词条按证据顺序继续扩写。</p>
        </div>
        <div className="toolbar">
          <label className="search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索英文概念或研究领域…" aria-label="搜索概念" />
          </label>
          <select value={group} onChange={(event) => setGroup(event.target.value)} aria-label="按类别筛选">
            <option value="all">全部类别</option>
            {conceptGroups.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </div>
        <div className="filter-row" aria-label="概念类别">
          <button className={group === "all" ? "active" : ""} onClick={() => setGroup("all")}>全部 <b>{allConcepts.length}</b></button>
          {conceptGroups.map((item) => (
            <button key={item.id} className={group === item.id ? "active" : ""} onClick={() => setGroup(item.id)}>{item.label} <b>{item.terms.length}</b></button>
          ))}
        </div>
        <div className="result-line">显示 {filtered.length} 个概念</div>
        <div className="concept-grid">
          {filtered.map((concept) => {
            const deep = [...deepIndex].some((title) => title.startsWith(normalize(concept.term)) || normalize(concept.term).startsWith(title));
            return (
              <article className={`concept-card ${concept.color}`} key={`${concept.groupId}-${concept.term}`}>
                <div className="card-meta"><span>{concept.groupLabel}</span>{deep && <b>深度词条</b>}</div>
                <h3>{concept.term}</h3>
                <p>{deep ? "已完成定义、谱系、辨析、批评与研究操作化。" : "已进入扩展词条注册表，正在按十维证据模板深化。"}</p>
                <button onClick={() => openConcept(concept.term)} disabled={!deep}>{deep ? "阅读全文 →" : "编目完成"}</button>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && <div className="empty">没有匹配概念。尝试缩短关键词或切换类别。</div>}
      </section>

      <section className="method" id="method">
        <span className="kicker">RESEARCH DISCIPLINE</span>
        <h2>六级证据阶梯</h2>
        <p>跨语资源“出现”并不自动证明抵抗、去殖民或结构转化。网站把每项研究主张放回它真正能够支持的证据层级。</p>
        <div className="ladder">
          {["出现：资源并置", "功能：完成行动", "参与者意义", "机制与反例", "可观察后果", "持续结构转化"].map((item, index) => <div key={item}><b>0{index + 1}</b><span>{item}</span></div>)}
        </div>
      </section>

      <section className="sources" id="sources">
        <div>
          <span className="kicker">SOURCE CONTROL</span>
          <h2>两部手册，<br />不同责任。</h2>
        </div>
        <article><b>PRIMARY · 2026</b><h3>The Handbook of Translanguaging</h3><p>用于确定概念在本手册中的定义、争议、章节位置与研究扩展。文件名虽标作 2025，书内版权页与 CIP 均为 2026。</p></article>
        <article><b>BACKGROUND · 2004</b><h3>The Handbook of Applied Linguistics</h3><p>用于重建跨语理论出现前的学科背景，不被倒写成早期 translanguaging 文献。</p></article>
      </section>

      <footer><span>跨语实践概念百科</span><p>Evidence-controlled · Concept-led · Research-ready</p><a href="#top">回到顶部 ↑</a></footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <article className="modal" role="dialog" aria-modal="true" aria-labelledby="entry-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭词条">×</button>
            <span className="entry-no">ENTRY {String(selected.number).padStart(3, "0")}</span>
            <h2 id="entry-title">{selected.title}</h2>
            <div className="entry-fields">
              {selected.fields.map((field, index) => <section key={`${field.label}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{field.label}</h3><p>{field.text}</p></div></section>)}
            </div>
          </article>
        </div>
      )}
    </main>
  );
}


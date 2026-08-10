"use client";

import { useState } from "react";
import { doctoralSeminars, handbookChapters, handbookUnits, type HandbookChapter } from "./handbookGuide";
import { handbookEnglishQA } from "./handbookEnglishQA";

export default function HandbookReader() {
  const [unit, setUnit] = useState("all");
  const [selected, setSelected] = useState<HandbookChapter | null>(null);
  return <main className="handbook-page">
    <header className="masthead">
      <a className="brand" href="./" aria-label="返回概念百科首页"><span className="brand-mark">TL</span><span>《The Handbook of Translanguaging》批判性导读</span></a>
      <nav aria-label="导读导航"><a href="./">概念百科</a><a href="#chapters">章节目录</a></nav>
    </header>
    <section className="handbook handbook-standalone" id="chapters">
      <div className="handbook-intro"><div><span className="kicker">THE HANDBOOK READING LAB</span><h1>33 章，不顺读。<br />带着问题与反驳去读。</h1></div><p>这是一条从语言能力、语言本体与权力出发，经过研究方法和教育实践，最终抵达媒介、身份与理论边界的批判性阅读路线。每章都有理解题、应用题和 rebuttal；答案统一放在最后并默认折叠。</p></div>
      <div className="handbook-rules" aria-label="导读原则"><span><b>01</b> 先准确重建作者论证</span><span><b>02</b> 再检查证据与替代解释</span><span><b>03</b> 最后判断还能守住什么</span></div>
      <div className="unit-tabs" aria-label="导读单元"><button className={unit === "all" ? "active" : ""} onClick={() => setUnit("all")}>全部 33 章</button>{handbookUnits.map((item) => <button key={item} className={unit === item ? "active" : ""} onClick={() => setUnit(item)}>{item}</button>)}</div>
      <div className="chapter-grid">{handbookChapters.filter((chapter) => unit === "all" || chapter.unit === unit).map((chapter) => <article className="chapter-card" key={chapter.chapter}><div><span>导读 {String(chapter.order).padStart(2,"0")}</span><b>原书第 {chapter.chapter} 章</b></div><small>{chapter.unit}</small><h3 lang="en">{chapter.title}</h3><h4>{chapter.chinese}</h4><button onClick={() => setSelected(chapter)}>进入章节导读 →</button></article>)}</div>
    </section>
    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <article className="modal chapter-modal" role="dialog" aria-modal="true" aria-labelledby="chapter-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭章节导读">×</button><span className="entry-no">导读 {String(selected.order).padStart(2,"0")} · 原书第 {selected.chapter} 章</span>
        <div className="bilingual-heading" id="chapter-title"><h2 lang="en">{selected.title}</h2><h3>{selected.chinese}</h3></div>
        <section className="reading-purpose"><span>READING PURPOSE</span><h3>这一章为什么现在读？</h3><p>{selected.purpose}</p></section>
        <section className="critical-rebuttal"><span>CRITICAL REBUTTAL</span><h3>不要轻易接受什么？</h3><p>{selected.critical}</p></section>
        <section className="doctoral-seminar" lang="en"><span>DOCTORAL SUPERVISOR’S SEMINAR</span><h3>Now let me teach this chapter.</h3><p>{doctoralSeminars[selected.chapter].lecture}</p><aside><b>Your doctoral challenge</b><p>{doctoralSeminars[selected.chapter].challenge}</p></aside></section>
        <section className="chapter-questions"><span>READ WITHOUT THE ANSWERS</span><h3>本章问题 / Chapter Questions</h3><ol>{selected.questions.map((item,index) => <li key={item.question}><b>{String(index+1).padStart(2,"0")}</b><div><p>{item.question}</p><p className="parallel-english" lang="en">{handbookEnglishQA[selected.chapter][index][0]}</p></div></li>)}</ol></section>
        <section className="answer-key"><span>ANSWER KEY · 放在最后</span><h3>参考答案 / Defensible Answers</h3><details><summary>完成问题后再展开答案 / Open only after answering</summary><ol>{selected.questions.map((item,index) => <li key={item.answer}><b>问题 {index+1} / Question {index+1}</b><p>{item.answer}</p><p className="parallel-english" lang="en">{handbookEnglishQA[selected.chapter][index][1]}</p></li>)}</ol><small>答案不是唯一措辞。能用章节证据提出更强解释、处理反例并守住推论边界，也应视为更好的答案。 / These are defensible answers, not the only acceptable wording.</small></details></section>
        <div className="chapter-nav"><button disabled={selected.order===1} onClick={() => setSelected(handbookChapters[selected.order-2])}>← 上一篇</button><span>{selected.order} / 33</span><button disabled={selected.order===33} onClick={() => setSelected(handbookChapters[selected.order])}>下一篇 →</button></div>
      </article>
    </div>}
    <footer><span>《The Handbook of Translanguaging》批判性导读</span><p>Read · Question · Rebut · Rebuild</p><a href="./">返回概念百科 →</a></footer>
  </main>;
}

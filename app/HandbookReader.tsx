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
      <section className="book-orientation" aria-labelledby="orientation-title">
        <div className="orientation-heading"><span>WHOLE-BOOK ORIENTATION</span><h2 id="orientation-title">全书总体导读<br /><em>What to read—and why</em></h2><p>目标不是记住 33 篇摘要，而是建立一个可以定义、比较、应用并反驳 translanguaging 的理论系统。<br /><i>The goal is not to memorize 33 summaries, but to build a theory you can define, compare, apply, and challenge.</i></p></div>
        <div className="orientation-thesis"><b>全书的中心争论 / The central controversy</b><p>人是在调用边界清楚的“语言”，还是在情境中调动一个整合、具身、多模态的资源系统？一旦接受后一种看法，我们是否也必须改变研究方法、课堂设计、语言评估和制度权力？</p><p lang="en">Do people select from bounded “languages,” or coordinate an integrated, embodied and multimodal repertoire? If we accept the latter view, must we also redesign research, pedagogy, assessment and institutional authority?</p></div>
        <div className="reading-tiers">
          <article className="tier-card essential"><span>01 · ESSENTIAL CORE</span><h3>先读这 10 章<br /><small>Read these 10 first</small></h3><p><b>1 → 6 → 9 → 2 → 5 → 7 → 8 → 10 → 11 → 12</b></p><p>它们建立全书的定义、语言能力、本体论、意义政治、种族语言学、去殖民、多模态、方法与伦理骨架。</p><p lang="en">These chapters establish the book’s conceptual, cognitive, political, multimodal, methodological and ethical backbone.</p></article>
          <article className="tier-card practice"><span>02 · EDUCATION CORE</span><h3>如果你关心教学<br /><small>If you study education</small></h3><p><b>13 → 14 → 15 → 16 → 22</b></p><p>依次读双语教育、读写、EMI、外语教育和评估。第 22 章必须最后读，因为评价最能暴露改革是否真正改变了规则。</p><p lang="en">Move from bilingual education and literacy to EMI, foreign-language teaching and assessment. Read Chapter 22 last: assessment reveals whether reform has actually changed the rules.</p></article>
          <article className="tier-card elective"><span>03 · CHOOSE A CLUSTER</span><h3>再按研究方向选读<br /><small>Then choose a research cluster</small></h3><p><b>复兴 / Revitalization:</b> 17–19<br /><b>可及性 / Accessibility:</b> 20–21<br /><b>媒介 / Media:</b> 26–29<br /><b>身份与边界 / Identity:</b> 24, 30–33</p><p>选读不是跳过：先围绕你的研究问题形成一组可比较章节，再回到其他章节寻找反例。</p><p lang="en">Elective does not mean optional forever. Build one comparative cluster around your research question, then use the remaining chapters as counterevidence.</p></article>
        </div>
        <div className="reading-phases">
          <h3>四阶段掌握路线 / Four-stage mastery route</h3>
          <ol>
            <li><b>定位 / Orient</b><p>读核心 10 章，写出 150 字工作定义，并区分描述性、解释性与规范性主张。</p><p lang="en">Read the ten core chapters. Write a 150-word working definition and separate descriptive, explanatory and normative claims.</p></li>
            <li><b>比较 / Compare</b><p>对读 process、wet ontology、ritual、cognition 与 raciolinguistics，画出冲突而非只画共同点。</p><p lang="en">Compare process, wet ontology, ritual, cognition and raciolinguistics. Map disagreements, not only similarities.</p></li>
            <li><b>应用 / Apply</b><p>选一个真实课堂、政策或数字文本，用至少三章分析，并说明每种镜头看不见什么。</p><p lang="en">Analyze one real classroom, policy or digital text through at least three chapters and identify each lens’s blind spots.</p></li>
            <li><b>反驳 / Rebut</b><p>提出最强反对意见：概念是否过宽？流动性是否遮蔽不平等？政治主张是否得到经验支持？</p><p lang="en">Develop the strongest objections: Is the concept too broad? Does fluidity obscure inequality? Are political claims empirically warranted?</p></li>
          </ol>
        </div>
        <div className="mastery-test"><div><span>FINAL MASTERY TEST</span><h3>读完后，你必须能完成三件事</h3></div><ol><li>用三分钟向非专业读者解释 translanguaging，同时给出反例。</li><li>比较至少三位作者的冲突性理论前提，而不是罗列术语。</li><li>设计一项研究或教学方案，并说明它可能失败在哪里。</li></ol><ol lang="en"><li>Explain translanguaging to a non-specialist in three minutes and give a counterexample.</li><li>Compare conflicting assumptions from at least three authors rather than listing terms.</li><li>Design a study or lesson and explain where it could fail.</li></ol></div>
      </section>
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

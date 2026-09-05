import { useMemo, useState } from "react";

type RecordState={book:string;chapter:string;claim:string;evidence:string;rebuttal:string;reply:string;position:string;dissertation:string;next:string};
const empty:RecordState={book:"The Handbook of Translanguaging",chapter:"",claim:"",evidence:"",rebuttal:"",reply:"",position:"",dissertation:"",next:""};
const books=["The Handbook of Translanguaging","The Guidebook to Sociolinguistics","The Handbook of Applied Linguistics","Rethinking Language Education in the Age of Generative AI"];
const fields=[
 ["claim","1 · Reconstruct the argument","核心主张是什么？用最公平的方式复述。","What is the central claim? Reconstruct it charitably."],
 ["evidence","2 · Audit the evidence","作者凭什么这样说？证据与推论之间有没有跳跃？","What warrants the claim? Where does the inference outrun the evidence?"],
 ["rebuttal","3 · Form the strongest objection","最强反驳是什么？不要只挑措辞问题。","What is the strongest substantive objection—not a complaint about wording?"],
 ["reply","4 · Steelman the author’s reply","如果作者在场，他／她会如何回应？","How would the author answer if they were in the room?"],
 ["position","5 · State your position","你的暂时立场是什么？成立条件和边界是什么？","What is your provisional position, with conditions and limits?"],
 ["dissertation","6 · Transfer to the dissertation","这能进入论文哪一部分？支持、修正还是挑战哪个论点？","Where can this enter your dissertation, and what claim does it support, revise, or challenge?"],
 ["next","7 · Build the next reading move","下一步要追哪篇文献、哪种证据或哪个反例？","What source, evidence, or counterexample should you pursue next?"],
] as const;

export default function DoctoralWorkspace(){
 const [record,setRecord]=useState<RecordState>(()=>{try{const raw=localStorage.getItem("tl-doctoral-record");return raw?{...empty,...JSON.parse(raw)}:empty}catch{return empty}}); const [saved,setSaved]=useState(false);
 const completeness=useMemo(()=>Math.round(fields.filter(([key])=>record[key].trim()).length/fields.length*100),[record]);
 const update=(key:keyof RecordState,value:string)=>{setRecord(r=>({...r,[key]:value}));setSaved(false)};
 const save=()=>{localStorage.setItem("tl-doctoral-record",JSON.stringify(record));setSaved(true)};
 const exportMd=()=>{const body=`# Doctoral Reading Record\n\n**Book:** ${record.book}\n\n**Chapter:** ${record.chapter||"—"}\n\n${fields.map(([key,title,zh,en])=>`## ${title}\n\n*${zh} / ${en}*\n\n${record[key]||"—"}`).join("\n\n")}`;const blob=new Blob([body],{type:"text/markdown"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`doctoral-reading-${record.chapter||"record"}.md`;a.click();URL.revokeObjectURL(url)};
 return <main className="workspace"><header className="masthead"><a className="brand" href="reading.html"><span className="brand-mark">PhD</span><span>博士训练台</span></a><nav><a href="reading.html">四本书</a><a href="#record">本周记录</a><a href="#defense">口试训练</a></nav></header>
 <section className="workspace-top"><div><span>U.S.-STYLE DOCTORAL TRAINING</span><h1>不要证明你读过。<br/>证明你能加入争论。</h1><p>每周完成一份可被质疑、可被修正、可进入论文的 intellectual product。阅读量不是终点；独立判断才是。</p></div><aside><b>本周 seminar deliverable</b><ol><li>重建一个论证</li><li>审查它的证据</li><li>提出最强反驳</li><li>形成暂时立场</li><li>用 3 分钟口头 defend</li></ol><a href="#record">开始本周记录 ↓</a></aside></section>
 <section className="doctoral-cycle"><span>READ</span><i>→</i><span>RECONSTRUCT</span><i>→</i><span>CHALLENGE</span><i>→</i><span>POSITION</span><i>→</i><span>RESEARCH</span><i>→</i><span>DEFEND</span></section>
 <section className="record-shell" id="record"><div className="record-head"><div><span>WEEKLY INTELLECTUAL PRODUCT</span><h2>一章，一份可辩护的研究记录</h2></div><div className="completion"><b>{completeness}%</b><small>思考链完成度</small></div></div>
 <div className="record-context"><label>本周读哪本书？<select value={record.book} onChange={e=>update("book",e.target.value)}>{books.map(b=><option key={b}>{b}</option>)}</select></label><label>章节 / Chapter<input value={record.chapter} onChange={e=>update("chapter",e.target.value)} placeholder="例如 Chapter 6"/></label></div>
 <div className="record-fields">{fields.map(([key,title,zh,en])=><label key={key}><b>{title}</b><span>{zh}</span><small>{en}</small><textarea value={record[key]} onChange={e=>update(key,e.target.value)} rows={5} placeholder="先用自己的话写；允许保留不确定性。"/></label>)}</div>
 <div className="record-actions"><button onClick={save}>{saved?"已保存到这台设备 ✓":"保存进度"}</button><button className="secondary" onClick={exportMd}>导出 Markdown</button><small>记录只保存在当前浏览器；导出后可放进你的论文资料库。</small></div></section>
 <section className="defense-lab" id="defense"><div><span>ORAL QUALIFYING EXAM</span><h2>导师会继续追问什么？</h2><p>不要背答案。先限时 3 分钟作答，再针对追问补充证据和限定条件。</p></div><ol><li><b>Define.</b><p>Define your key concept without using the term itself. What adjacent concept must it not be confused with?</p></li><li><b>Warrant.</b><p>What evidence would distinguish your explanation from a plausible rival explanation?</p></li><li><b>Boundary.</b><p>Under what social, historical, or institutional conditions would your claim fail?</p></li><li><b>Power.</b><p>Whose interests become visible—or disappear—when you adopt this framework?</p></li><li><b>Revision.</b><p>What finding would make you change your mind, and how would your argument change?</p></li></ol></section>
 <footer><span>博士训练台</span><p>Reading → Position → Dissertation</p><a href="reading.html">返回四本书 →</a></footer></main>
}

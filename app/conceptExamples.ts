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
};

type Frame = {
  scenesZh: string[];
  scenesEn: string[];
  contrastZh: string;
  contrastEn: string;
};

const frames: Record<string, Frame> = {
  foundations: {
    scenesZh: [
      "研究者反复观看一段学生用说话、手势、图像和身体移动共同解决问题的录像",
      "博士生比较同一互动的语言编码、物质环境与参与者感受，发现只统计词语无法解释意义如何形成",
      "课堂观察显示，一项意义并非先完整存在于头脑中再被说出，而是在参与者与环境的关系中逐步出现",
    ],
    scenesEn: [
      "A researcher repeatedly examines video of students solving a problem through speech, gesture, images, and bodily movement",
      "A doctoral student compares linguistic coding, the material setting, and participants’ affect in the same interaction and finds that word counts alone cannot explain the emergence of meaning",
      "A classroom observation shows that meaning is not fully formed in the mind before expression but emerges through relations among participants and their environment",
    ],
    contrastZh: "判断不能只依据表面出现了多种符号，而要证明该词条所指的本体论或意义生成机制确实组织了分析。",
    contrastEn: "The label is warranted by the ontological or meaning-making mechanism, not merely by the visible presence of several signs or modes.",
  },
  boundaries: {
    scenesZh: [
      "一名学生在小组讨论中连续调动普通话、英语、方言和手势，却没有按学校规定把它们分成互不相干的系统",
      "研究者比较制度给语言贴的名称与说话者实际使用的资源，发现两者边界并不重合",
      "访谈参与者用一个通常被称为‘混合’的表达完成精确任务，而听者能够顺利理解其社会意义",
    ],
    scenesEn: [
      "A student draws continuously on Mandarin, English, a regional variety, and gesture in group work without separating them into the systems prescribed by the school",
      "A researcher compares institutionally named languages with the resources speakers actually use and finds that their boundaries do not coincide",
      "An interviewee uses an expression commonly dismissed as ‘mixed’ to accomplish a precise task, and the listener interprets its social meaning successfully",
    ],
    contrastZh: "关键是资源如何被组织以及边界由谁划定，不能看见两种命名语言就自动判定为语码转换。",
    contrastEn: "The diagnostic issue is how resources are organized and who draws the boundary; the presence of two named languages does not automatically make the event code-switching.",
  },
  power: {
    scenesZh: [
      "学校把多语学生的答案判为‘语言不足’，但同一答案中的学科推理其实完整，只是不符合主流语言规范",
      "会议中少数化说话者的表达被要求反复解释，而占优势群体使用相似表达时却被直接视为有能力",
      "政策文件声称对所有语言一视同仁，实际资源配置却持续使某些群体更难获得发言权和知识承认",
    ],
    scenesEn: [
      "A school labels a multilingual student’s answer ‘linguistically deficient’ even though its disciplinary reasoning is complete and only departs from dominant norms",
      "In a meeting, a minoritized speaker must repeatedly explain an expression while a dominant-group speaker using a comparable form is treated as competent",
      "A policy claims to treat all languages equally, yet its allocation of resources repeatedly restricts some groups’ access to voice and recognition as knowers",
    ],
    contrastZh: "例子的证据必须显示结构性权力如何制造差异，而不能把所有误解或不礼貌行为都泛称为压迫。",
    contrastEn: "Evidence must show how structural power produces the differential outcome; not every misunderstanding or impolite act is sufficient evidence of oppression.",
  },
  praxis: {
    scenesZh: [
      "教师与学生发现课堂规范压低了社区知识后，共同修改任务、署名方式和决策程序，并记录谁真正获得了行动权",
      "研究团队在参与者提出异议后改变资料使用方案，而不是把签过一次同意书当成永久授权",
      "社区成员拒绝只作为研究对象出现，转而共同决定问题、解释材料并分享研究成果的控制权",
    ],
    scenesEn: [
      "After identifying how classroom norms suppress community knowledge, teachers and students jointly revise tasks, authorship, and decision procedures and document who gains agency",
      "A research team changes its data-use plan when participants object instead of treating a one-time consent form as permanent authorization",
      "Community members refuse to appear only as research subjects and instead share control over questions, interpretation, and dissemination",
    ],
    contrastZh: "只有态度声明不够；需要观察到关系、程序或资源分配发生了与该概念相符的改变。",
    contrastEn: "A statement of good intentions is insufficient; the concept requires an observable change in relations, procedures, or the distribution of resources.",
  },
  cognition: {
    scenesZh: [
      "双语参与者完成命名任务时，眼动、反应时或自我修正显示另一语言资源同时被激活",
      "研究者让同一组学习者在不同负荷条件下完成任务，比较注意、记忆和语言选择如何共同变化",
      "学生先借助熟悉语言整理复杂概念，随后在目标语输出中表现出更完整的推理链",
    ],
    scenesEn: [
      "During a naming task, bilingual participants’ eye movements, response times, or self-corrections indicate concurrent activation of another linguistic resource",
      "A researcher asks the same learners to complete a task under different processing loads and compares changes in attention, memory, and language choice",
      "A student organizes a complex concept through a familiar language before producing a more complete chain of reasoning in the target language",
    ],
    contrastZh: "应把可观察指标与明确的认知机制连接起来，不能由一次表现差异直接推断稳定的脑内能力。",
    contrastEn: "Observable measures must be connected to a specified cognitive mechanism; one performance difference cannot establish a stable mental capacity.",
  },
  education: {
    scenesZh: [
      "教师允许学生先用最熟悉的资源讨论科学问题，再共同制作符合课程要求的英文成果，并比较两个阶段的学习证据",
      "一项课程把家庭语言、同伴解释和多模态作品纳入教学，而不是只在课间容许学生使用这些资源",
      "课堂任务明确安排学生跨语言阅读、协作推理和重新表达，教师据此调整支架而非只纠正语言形式",
    ],
    scenesEn: [
      "A teacher lets students discuss a science problem through their most familiar resources before jointly producing an English product that meets curriculum requirements and compares evidence across both stages",
      "A course incorporates home languages, peer explanation, and multimodal products into instruction instead of merely tolerating them outside lesson time",
      "A task deliberately sequences cross-language reading, collaborative reasoning, and reformulation, and the teacher adjusts scaffolding rather than only correcting forms",
    ],
    contrastZh: "要区分有设计目的的教学安排与偶然出现的多语行为，并检查它是否真正支持了学习目标。",
    contrastEn: "The analysis distinguishes purposeful pedagogical design from incidental multilingual behavior and asks whether it actually advances the learning goal.",
  },
  literacy: {
    scenesZh: [
      "学生阅读英文报道、查阅中文资料、分析图表后制作双语数字故事，引用与版式共同承担论证功能",
      "一个写作过程在手写笔记、手机搜索、同伴口述和正式文本之间往返，最终文本不能由单一书写技能解释",
      "研究者追踪同一信息如何在语言、图像、声音和页面布局之间被重新组织，而非只比较逐词翻译",
    ],
    scenesEn: [
      "A student reads an English report, consults Chinese sources, analyzes charts, and creates a bilingual digital story in which citation and layout contribute to the argument",
      "A writing process moves among handwritten notes, mobile searches, peer talk, and formal prose and cannot be explained as a single autonomous writing skill",
      "A researcher traces how information is reorganized across language, image, sound, and page layout rather than comparing word-for-word translation alone",
    ],
    contrastZh: "例子需呈现文本实践与媒介之间的转换，不能把任何带图片的文本都自动归入多模态读写。",
    contrastEn: "The example must show transformation across textual practices or media; the mere addition of an image does not by itself establish multimodal literacy.",
  },
  assessment: {
    scenesZh: [
      "学生用中文规划、英文作答并借助图示展示完整的学科理解，评分者分别记录知识证据和规定语言形式",
      "同一份答案在只看目标语准确度与同时考察推理过程时得到不同解释，研究者追踪差异来自何种评分假设",
      "教师允许多语作答后使用共同量规复核结果，以判断分数变化反映能力呈现还是评分宽松",
    ],
    scenesEn: [
      "A student plans in Chinese, answers in English, and uses a diagram to demonstrate complete disciplinary understanding while the assessor records content evidence separately from required language form",
      "The same response receives different interpretations when scored only for target-language accuracy and when its reasoning process is considered, prompting analysis of the scoring assumptions",
      "After allowing multilingual responses, a teacher moderates results with a shared rubric to determine whether score changes reflect access to competence or relaxed standards",
    ],
    contrastZh: "必须说明评估推论、构念和评分规则怎样改变，不能把允许使用母语本身等同于公平或有效。",
    contrastEn: "The example must specify the assessment inference, construct, and scoring rule; permitting a home language is not automatically fair or valid.",
  },
  method: {
    scenesZh: [
      "研究者围绕一个明确问题选择课堂录像、访谈或文本资料，说明取样单位、分析步骤以及反例如何处理",
      "团队先对少量材料独立编码，比较分歧并修订操作定义，然后才分析完整资料集",
      "研究报告把研究问题、资料来源、分析主张和证据片段逐项对应，使读者能够检查推论链",
    ],
    scenesEn: [
      "A researcher selects classroom video, interviews, or texts for a specified question and states the sampling unit, analytic procedure, and treatment of counterexamples",
      "A team independently codes a small sample, compares disagreements, revises operational definitions, and only then analyzes the full dataset",
      "A report maps research questions, data sources, analytic claims, and evidence excerpts so that readers can inspect the inferential chain",
    ],
    contrastZh: "研究方法的名称不是证据；判断依据是实际资料、步骤和推论是否符合该方法的要求。",
    contrastEn: "A method’s name is not evidence; classification depends on whether the actual data, procedures, and inferences satisfy that method’s requirements.",
  },
  extensions: {
    scenesZh: [
      "研究者把一个邻近学科概念用于多语资料，明确指出它解释了原有跨语框架没有捕捉到的现象",
      "课堂片段同时涉及身份、情感和制度规则，分析者检验新增概念是否带来可区分的解释收益",
      "文献综述比较两个看似相近的术语在分析单位、证据要求与政治承诺上的差别",
    ],
    scenesEn: [
      "A researcher applies a neighboring disciplinary concept to multilingual data and states what it explains that an existing translanguaging account does not capture",
      "A classroom episode involves identity, affect, and institutional rules, and the analyst tests whether the added concept yields a distinguishable explanatory gain",
      "A review compares two apparently similar terms in their unit of analysis, evidential requirements, and political commitments",
    ],
    contrastZh: "扩展概念必须增加解释力，不能只把既有现象换一个更时髦的名称。",
    contrastEn: "An extension must add explanatory value rather than simply rename an existing phenomenon with a more fashionable term.",
  },
  handbook_topics: {
    scenesZh: [
      "研究者沿着手册中的专题论证回看一段多语实践，标出该复合概念连接的理论前提、社会问题与分析后果",
      "研讨课用同一资料分别套用两个手册专题，比较哪一个更能解释参与者行动与制度条件的关系",
      "学生从手册章节提取概念命题，再用新的课堂、社区或数字资料检验其适用边界",
    ],
    scenesEn: [
      "A researcher revisits multilingual practice through a handbook theme and identifies the theoretical premises, social problem, and analytic consequences joined by the composite concept",
      "A seminar applies two handbook themes to the same data and compares which better explains the relation between participant action and institutional conditions",
      "A student extracts a conceptual proposition from a handbook chapter and tests its boundary with new classroom, community, or digital data",
    ],
    contrastZh: "复合专题不等于单一术语定义；例子要展示组成概念之间的关系以及它们共同解决的问题。",
    contrastEn: "A composite theme is not a single-word definition; the example must show the relation among its components and the problem they jointly address.",
  },
  sociolinguistics: {
    scenesZh: [
      "同一说话者面对家人、教师和陌生人时使用不同形式，听者据此推断其关系、立场或群体归属",
      "社区中的一个变体并非随机出现，而是随场合、网络和身份活动呈现可解释的分布",
      "研究者把语言形式与参与者赋予它的社会意义联系起来，并检查不同听者是否作出相同解释",
    ],
    scenesEn: [
      "The same speaker uses different forms with family, a teacher, and a stranger, and listeners infer relations, stance, or group affiliation from the variation",
      "A community variant is not random but displays an interpretable distribution across settings, networks, and identity practices",
      "A researcher connects a linguistic form to the social meaning participants assign to it and checks whether different listeners make the same interpretation",
    ],
    contrastZh: "共现相关性不能自动证明社会意义；需要参与者取向、分布模式或历史证据支持解释。",
    contrastEn: "Co-occurrence alone does not prove social meaning; the interpretation needs participant orientation, distributional patterning, or historical evidence.",
  },
  discourse: {
    scenesZh: [
      "参与者通过轮次、停顿、重复和指称方式逐步把一次互动建构成解释、冲突或合作",
      "研究者逐行分析对话，观察某个表达如何回应前一轮并限制下一轮可以做什么",
      "同一政策词语在新闻、课堂和机构文件中被反复重述，却产生不同的责任归属和行动后果",
    ],
    scenesEn: [
      "Participants use turns, pauses, repetition, and reference to progressively constitute an encounter as explanation, conflict, or collaboration",
      "A researcher analyzes talk line by line to see how an expression responds to a prior turn and constrains what can happen next",
      "The same policy expression is recontextualized across news, classroom talk, and institutional documents, producing different allocations of responsibility",
    ],
    contrastZh: "分析必须落到序列位置、文本组织或参与者回应，不能仅凭研究者对一句话的主题印象命名。",
    contrastEn: "The analysis must be grounded in sequential position, textual organization, or participant response rather than the analyst’s thematic impression of an isolated sentence.",
  },
  sla: {
    scenesZh: [
      "学习者在多次任务中逐步改变表达策略，研究者追踪输入、互动、反馈和既有语言资源如何共同作用",
      "同一语言形式在有支架与无支架条件下表现不同，研究设计据此区分暂时任务表现和发展变化",
      "学生借助同伴解释和先前语言知识解决新形式，后续独立任务显示这种资源是否转化为学习",
    ],
    scenesEn: [
      "Across repeated tasks, a learner gradually changes an expressive strategy while the researcher traces the joint roles of input, interaction, feedback, and prior linguistic resources",
      "The same form is performed differently with and without scaffolding, allowing the design to distinguish temporary task performance from developmental change",
      "A student uses peer explanation and prior language knowledge to solve a new form, and a later independent task tests whether that support became learning",
    ],
    contrastZh: "一次成功表达不等于习得；需要时间序列、迁移任务或其他发展证据支持学习主张。",
    contrastEn: "One successful performance is not acquisition; a learning claim requires longitudinal change, transfer, or other developmental evidence.",
  },
  policy: {
    scenesZh: [
      "官方文件规定课堂只能使用一种语言，但教师、家长和学生在执行中协商出不同的实际规则",
      "学校公布多语包容政策后，研究者比较预算、课程安排和惩戒记录，检查承诺是否落实",
      "同一语言政策在不同学校产生不同结果，分析者追踪校长解释、教师裁量和社区压力的作用",
    ],
    scenesEn: [
      "An official document prescribes one classroom language, yet teachers, parents, and students negotiate different rules in implementation",
      "After a school announces an inclusive multilingual policy, a researcher compares budgets, timetables, and disciplinary records to assess enactment",
      "The same language policy produces different outcomes across schools, prompting analysis of leadership interpretation, teacher discretion, and community pressure",
    ],
    contrastZh: "政策文本、政策话语与实际执行不是同一层次，例子必须说明分析的是哪一个层次。",
    contrastEn: "Policy text, policy discourse, and enacted practice are distinct levels, and the example must identify which level is being analyzed.",
  },
  revitalization: {
    scenesZh: [
      "社区课程让年轻成员与长者共同录制地名故事，并决定哪些知识可以公开、如何拼写和由谁解释",
      "一个复兴项目不只统计新学习者人数，还追踪语言是否重新进入家庭活动、仪式和社区决策",
      "参与者把长期被污名化的表达重新用于公共活动，同时讨论标准化会不会再次排除部分说话者",
    ],
    scenesEn: [
      "A community program brings youth and elders together to record place-name narratives and decide what may be public, how it is written, and who may interpret it",
      "A revitalization project counts not only new learners but also whether the language re-enters family activity, ceremony, and community decision-making",
      "Participants reintroduce a stigmatized variety into public events while debating whether standardization may exclude some speakers again",
    ],
    contrastZh: "增加词汇学习者不必然等于社区复兴；判断还要考虑代际关系、使用领域和社区控制权。",
    contrastEn: "More vocabulary learners do not necessarily constitute community revitalization; intergenerational relations, domains of use, and community control also matter.",
  },
  testing: {
    scenesZh: [
      "考试开发者让两组考生完成同一任务，检查题目语言负担是否使目标能力相同的人得到系统性不同分数",
      "研究团队比较量表评分、考生思维报告与后续表现，检验分数解释是否得到多种证据支持",
      "一道试题在不同语言背景群体中表现异常，分析者进一步检查是构念差异、翻译问题还是统计偶然",
    ],
    scenesEn: [
      "Test developers administer the same task to two groups and examine whether linguistic load systematically separates candidates with comparable target ability",
      "A team compares rubric scores, test-taker verbal reports, and later performance to evaluate whether the score interpretation has converging support",
      "An item behaves unusually across language-background groups, and analysts investigate construct difference, translation, and statistical chance",
    ],
    contrastZh: "统计差异只是起点，不能不检查构念、任务和群体经验就直接宣称测验存在偏差。",
    contrastEn: "A statistical difference is a starting point; test bias cannot be claimed without examining the construct, task, and groups’ experience.",
  },
  methodology: {
    scenesZh: [
      "研究计划先声明什么可以被认识、谁有权解释以及何种证据算有效，再据此选择资料和分析程序",
      "两项研究使用相同访谈材料，却因现实观和知识观不同而提出不同问题并形成不同主张",
      "研究者在写作中交代自身位置如何影响进入现场、与参与者关系和对沉默片段的解释",
    ],
    scenesEn: [
      "A study first states what can be known, who may interpret, and what counts as evidence, and then selects data and procedures consistent with those commitments",
      "Two studies use the same interview material but ask different questions and make different claims because their views of reality and knowledge differ",
      "A researcher explains how positionality shapes access, participant relations, and interpretation of silence in the data",
    ],
    contrastZh: "方法论不是方法清单；必须展示认识论承诺如何约束研究问题、证据与结论。",
    contrastEn: "Methodology is not a list of methods; the example must show how epistemological commitments constrain questions, evidence, and conclusions.",
  },
  translation_ext: {
    scenesZh: [
      "译者处理一个没有直接对应词的社区概念时，保留原词、补充解释并与使用者协商其社会含义",
      "同一信息从口语访谈进入字幕和研究论文后被重新组织，部分语气、身份线索和权力关系随之改变",
      "学生比较机器翻译、人工译文和原语境，说明不同版本各自突出或删除了什么意义",
    ],
    scenesEn: [
      "When translating a community concept with no direct equivalent, a translator retains the original term, adds explanation, and negotiates its social meaning with users",
      "As information moves from an oral interview into subtitles and a research article, stance, identity cues, and power relations are reorganized",
      "Students compare machine output, a human translation, and the source context to identify what each version foregrounds or removes",
    ],
    contrastZh: "跨语言移动并不自动属于同一种现象；需要区分对应转换、意义重构和资源整合。",
    contrastEn: "Movement across languages is not a single phenomenon; equivalence-seeking transfer, reconstruction of meaning, and integrated resource use must be distinguished.",
  },
  identity: {
    scenesZh: [
      "一名参与者在不同听众面前改变自称、口音和语言选择，借此接受、拒绝或重新协商别人赋予的身份",
      "互动中他人把说话者归入某一类别，说话者随后通过修正、幽默或沉默回应这一定位",
      "访谈叙事把过去经历重新排列成一个可被当下听者理解的自我故事，而不是简单报告固定身份",
    ],
    scenesEn: [
      "A participant changes self-reference, accent, and language choice across audiences to accept, reject, or renegotiate an identity attributed by others",
      "Others place a speaker in a category during interaction, and the speaker responds through correction, humor, or silence",
      "An interview narrative reorganizes past experience into a self-story intelligible to a present audience rather than simply reporting a fixed identity",
    ],
    contrastZh: "身份类别不能只由研究者根据人口资料指定；应寻找参与者定位、回应和长期社会条件的证据。",
    contrastEn: "Identity cannot be assigned solely from demographic information; evidence should include positioning, participant response, and broader social conditions.",
  },
  technology_ext: {
    scenesZh: [
      "用户在短视频中组合字幕、口音、表情包、音乐和平台标签，使意义同时受界面功能与受众互动影响",
      "多语群聊中的参与者在文字、语音和自动翻译之间切换，并根据已读状态与回复顺序判断关系",
      "研究者比较人工写作与生成式工具参与后的版本，追踪建议被接受、修改或拒绝的具体位置",
    ],
    scenesEn: [
      "A short-video creator combines subtitles, accent, memes, music, and platform tags, with meaning shaped jointly by interface affordances and audience response",
      "Participants in a multilingual group chat move among text, voice, and automatic translation while interpreting relations through read receipts and reply order",
      "A researcher compares drafts before and after generative-tool use and traces where suggestions are accepted, revised, or rejected",
    ],
    contrastZh: "使用数字工具本身不是分析结论；必须指出平台可供性、算法或人机协作怎样改变了实践。",
    contrastEn: "Use of a digital tool is not itself an analytic finding; the example must show how affordances, algorithms, or human–machine collaboration change the practice.",
  },
};

const defaultFrame = frames.extensions;

function hash(value: string) {
  return Array.from(value).reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7);
}

function firstSentence(text: string, maxLength = 118) {
  const sentence = text.split(/[。！？]/)[0].trim();
  return sentence.length > maxLength ? `${sentence.slice(0, maxLength)}…` : sentence;
}

function englishSentence(text: string, maxLength = 300) {
  const sentence = text.trim().replace(/\s+/g, " ");
  return sentence.length > maxLength ? `${sentence.slice(0, maxLength).replace(/\s+\S*$/, "")}…` : sentence;
}

function chineseTitle(title: string) {
  return title.match(/^.+?（(.+)）$/)?.[1]?.trim() || "该概念";
}

export function buildConceptExample(
  entry: ExampleEntry,
  concept: ExampleConcept,
  englishDefinition: string,
): ConceptExample {
  const frame = frames[concept.groupId] || defaultFrame;
  const sceneIndex = hash(concept.term) % frame.scenesZh.length;
  const meaning = firstSentence(entry.fields.find((field) => field.label === "含义")?.text || entry.fields[0]?.text || "");
  const application = firstSentence(entry.fields.find((field) => field.label === "应用语言学用途")?.text || "", 92);
  const zhName = chineseTitle(entry.title);
  const applicationBridge = application ? `研究用途：${application}。` : "研究者随后用更多资料检查这一解释。";

  return {
    chinese: `情境：${frame.scenesZh[sceneIndex]}，关键片段呈现出以下现象或分析关系：${meaning}。判断：因此可用“${zhName}（${concept.term}）”解释这个片段。${applicationBridge}辨析：${frame.contrastZh}`,
    english: `Situation: ${frame.scenesEn[sceneIndex]}. Diagnosis: in the focal evidence, the analyst documents the defining process of ${concept.term}: ${englishSentence(englishDefinition)} Contrast: ${frame.contrastEn}`,
  };
}

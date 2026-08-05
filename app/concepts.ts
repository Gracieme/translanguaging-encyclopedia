export type ConceptGroup = {
  id: string;
  label: string;
  color: string;
  terms: string[];
};

export const conceptGroups: ConceptGroup[] = [
  {
    id: "foundations",
    label: "基础理论与本体论",
    color: "ochre",
    terms: [
      "Translanguaging", "Languaging", "Trans-semiotizing", "Transmodalities", "Multimodality",
      "Organicist-processual view", "Wet ontology", "Waterscape epistemologies", "Process ontology", "Relational ontology",
      "Onto-epistemology", "New materialism", "Posthumanism", "Representationalism", "Nonrepresentational theory",
      "Ecological interconnectedness", "Assemblage", "Cognitive-semiotic-affective assemblage", "Transactional process", "Minding",
      "Thinking body", "Visceral semantics", "Voice dynamics", "Meta-action", "Perceptual invariance structure",
      "Lexicogrammatical schema", "Meaning-making", "Sense-making", "Inter-subjectivity", "Inter-objectivity",
      "Radical materiality", "Materiality of utterance", "Fluid simultaneity", "Unitary competence", "Ontologies of incompleteness"
    ]
  },
  {
    id: "boundaries",
    label: "语言边界与能力观",
    color: "blue",
    terms: [
      "Named languages", "Ontology of named languages", "I-language", "E-language", "Linguistic repertoire",
      "Unitary repertoire", "Idiolect", "Single grammar thesis", "Two-grammar assumption", "Feature-to-language assignment",
      "Code-switching", "Code-mixing", "Polylanguaging", "Metrolingualism", "Transidiomatic practice",
      "Translingualism", "Translingual practice", "Plurilingualism", "Multilingualism", "Bilingualism",
      "Parallel monolingualism", "Monoglossic ideology", "Language separation", "Coordinated translanguaging", "Unilateral translanguaging",
      "Bidialectism", "Transregistering", "Transregisters", "Register", "Style",
      "Crosslinguistic repertoire", "Folk-theoretical linguistic construct", "Language crossing", "Language brokering", "Child language brokering"
    ]
  },
  {
    id: "power",
    label: "权力、殖民性与种族化",
    color: "red",
    terms: [
      "Decoloniality", "Decolonization", "Coloniality of power", "Coloniality of knowledge", "Coloniality of language",
      "Abyssal thinking", "Border thinking", "Epistemic justice", "Cognitive justice", "Linguistic justice",
      "Linguistic imperialism", "English hegemony", "Englishization", "Neo-colonialism", "Methodological nationalism",
      "Raciolinguistics", "Raciolinguistic ideology", "White listening subject", "White supremacy", "Co-naturalization of race and language",
      "Critical raciolinguistic awareness", "Micro-racialization", "Microaggression", "Monoracism", "Colorism",
      "Racial imposter syndrome", "Double consciousness", "Languagelessness", "Minoritization", "Peripheralization",
      "Linguistic erasure", "Delegitimization", "Silencing", "Subalternity", "Epistemic equity"
    ]
  },
  {
    id: "praxis",
    label: "抵抗、伦理与变革实践",
    color: "green",
    terms: [
      "Resistance", "Radical resistance", "Performed resistance", "Fugitive practice", "Refusal",
      "Subversion", "Linguistic activism", "Transformative praxis", "Praxis", "Conscientization",
      "Critical consciousness", "Humanizing education", "Culturally sustaining pedagogy", "Critical cosmopolitanism", "Critical interculturality",
      "Researcher positionality", "Researcher reflexivity", "Epistemic reflexivity", "Self-reflexivity", "Relational ethics",
      "Macroethics", "Microethics", "Informed consent", "Process consent", "Confidentiality",
      "Anonymity", "Authorship", "Intellectual property", "Intergenerational capacity building", "Trust",
      "Transparency", "Credibility", "Competence versus credibility", "Courage and regard", "Mutualizing"
    ]
  },
  {
    id: "cognition",
    label: "双语认知与心理语言学",
    color: "violet",
    terms: [
      "Bilingual cognition", "Multicompetence", "Common underlying proficiency", "Cognitive flexibility", "Executive control",
      "Inhibitory control", "Working memory", "Metalinguistic awareness", "Metacognitive awareness", "Cross-language activation",
      "Lexical neighborhood effect", "Word association task", "Picture-naming task", "Eye tracking", "Event-related potential",
      "Electroencephalography", "Magnetoencephalography", "Magnetic resonance imaging", "Neurolinguistics", "Bilingual language processing",
      "Language attrition", "Second language acquisition", "Ultimate attainment", "Critical period", "Native-speaker competence",
      "Basic interpersonal communication skills", "Cognitive academic language proficiency", "Prior knowledge", "Cognitive scaffolding", "Peer scaffolding",
      "Self-talk", "Repetition", "Self-correction", "Recasting", "Written corrective feedback"
    ]
  },
  {
    id: "education",
    label: "教育、教学法与课堂",
    color: "teal",
    terms: [
      "Translanguaging pedagogy", "Translanguaging stance", "Translanguaging design", "Translanguaging shift", "Critical translanguaging by design",
      "Sustainable translanguaging pedagogy", "Translanguaging rings", "Bilingual education", "Transitional bilingual education", "Two-way immersion",
      "Dual-language education", "Bilingual teacher education", "Community-based language education", "Family-based translanguaging", "Heritage language education",
      "Foreign language education", "English-medium instruction", "Content and language integrated learning", "Communicative language teaching", "English for academic purposes",
      "Funds of knowledge", "Community cultural wealth", "Learning stories", "Show-and-tell", "Buzz groups",
      "Peer collaboration", "Teacher-researcher collaboration", "Dialogic teaching", "Scaffolding", "Pedagogical translanguaging",
      "Translanguaging space", "Contact zone", "Translanguaging classroom ecology", "Language-of-instruction policy", "Multilingualism-as-resource stance"
    ]
  },
  {
    id: "literacy",
    label: "读写、多模态与艺术",
    color: "pink",
    terms: [
      "Biliteracy", "Continua of biliteracy", "Border-crossing biliteracy", "Multiliteracies", "Pluriliteracies",
      "Critical literacy", "New Literacy Studies", "Embodied literacy", "Transformative literacy", "Digital literacy",
      "Visual literacy", "Transcultural knowledge", "Transcultural practice", "Transmediation", "Intersemiotic technology",
      "Translingual orthography", "Transliteration", "Expressive typography", "Globalese", "Visual-verbal register",
      "Square Word Calligraphy", "Pseudo-character", "Digital Body Language", "SEMIOSIS framework", "Visuality",
      "Creativity", "Criticality", "Creative inquiry", "Arts-based pedagogy", "Arts-based research",
      "Performance", "Collage", "Photography", "Music", "Storytelling"
    ]
  },
  {
    id: "assessment",
    label: "评估、残障与可及性",
    color: "amber",
    terms: [
      "Critical translanguaging assessment", "Language assessment", "Formative assessment", "Summative assessment", "Dynamic assessment",
      "Standardization", "Validity", "Fairness", "Construct validity", "Consequential validity",
      "Native-speakerism", "Appropriateness", "Language proficiency", "Authenticity", "Assessment accommodation",
      "Disability", "DisCrit", "Crip linguistics", "Ableism", "Modality chauvinism",
      "Expansive languaging", "Disordered language", "Universal Design for Learning", "Translanguaging UDL", "Speech-language therapy",
      "Intellectual disability", "Neurodivergence", "Autism", "Nonspeaking people", "Double empathy problem",
      "Deaf education", "Deaf translanguaging", "Oralism", "Simultaneous communication", "ProTactile"
    ]
  },
  {
    id: "method",
    label: "研究方法与分析技术",
    color: "slate",
    terms: [
      "Moment analysis", "Linguistic ethnography", "Ethnography", "Autoethnography", "Netnography",
      "Interactional sociolinguistics", "Conversation analysis", "Discourse analysis", "Multimodal interaction analysis", "Transcription",
      "Tranßcripting", "Transitivity analysis", "Graphics analysis", "PRAAT analysis", "Corpus linguistics",
      "Mixed methods", "Participatory action research", "Community-based participatory research", "Participatory design research", "Design-based research",
      "Critical discourse analysis", "QuantCrit", "Critical race methodology", "Narrative inquiry", "Visual ethnography",
      "Stimulated recall", "Think-aloud protocol", "Matched-guise technique", "Speaker evaluation study", "Language portrait",
      "Repertoire portrait", "Language biography", "Longitudinal ethnography", "Case study", "Reflexive thematic analysis"
    ]
  },
  {
    id: "extensions",
    label: "数字、翻译、身份与新领域",
    color: "indigo",
    terms: [
      "Digital translanguaging", "Social media discourse", "Platform affordance", "Algorithmic visibility", "Artificial intelligence",
      "ChatGPT", "Vlogging", "Fansubbing", "Digital ethnography", "Networked multilingualism",
      "Translation", "Translanguaging in translation", "Mutual embeddedness", "Consecutive interpreting", "Simultaneous interpreting",
      "Sign-language interpreting", "Subtitling", "Translation process", "Translation product", "Controlled equivocation",
      "Interculturality", "Transculturation", "Cross-cultural communication", "Intercultural communication", "Imagined community",
      "Intersectionality", "Queer linguistics", "Queer theory", "Gender performativity", "Transraciality",
      "Radical listening", "Hard translanguaging", "Soft translanguaging", "Unequal Englishes", "Individualization"
    ]
  },
  {
    id: "sociolinguistics",
    label: "社会语言学基础",
    color: "blue",
    terms: [
      "Speech community", "Community of practice", "Sociolinguistic competence", "Communicative competence", "Interactional competence",
      "Heteroglossia", "Diglossia", "Enregisterment", "Indexicality", "Indexical order",
      "Language ideology", "Standard language ideology", "Language attitude", "Prestige", "Stigma",
      "Overt prestige", "Covert prestige", "Style-shifting", "Audience design", "Speaker design",
      "Sociolinguistic variable", "Variation", "Social meaning", "Ethnolinguistic vitality", "Superdiversity"
    ]
  },
  {
    id: "discourse",
    label: "话语、互动与语用",
    color: "ochre",
    terms: [
      "Discourse", "Text", "Context", "Co-text", "Genre",
      "Speech act", "Pragmatic competence", "Implicature", "Presupposition", "Deixis",
      "Turn-taking", "Adjacency pair", "Preference organization", "Repair", "Other-initiated repair",
      "Stance", "Positioning", "Footing", "Framing", "Contextualization cue",
      "Metapragmatics", "Entextualization", "Recontextualization", "Intertextuality", "Chronotope"
    ]
  },
  {
    id: "sla",
    label: "二语习得与学习理论",
    color: "green",
    terms: [
      "Interlanguage", "Transfer", "Crosslinguistic influence", "Fossilization", "Noticing hypothesis",
      "Input hypothesis", "Output hypothesis", "Interaction hypothesis", "Sociocultural theory", "Zone of proximal development",
      "Mediation", "Internalization", "Private speech", "Language socialization", "Investment",
      "Motivation", "Willingness to communicate", "Learner autonomy", "Agency", "Identity approach to SLA",
      "Usage-based learning", "Emergentism", "Complex dynamic systems theory", "Affordance", "Ecological approach to SLA"
    ]
  },
  {
    id: "policy",
    label: "语言政策、规划与权利",
    color: "red",
    terms: [
      "Language policy", "Language planning", "Status planning", "Corpus planning", "Acquisition planning",
      "Prestige planning", "Language management", "Language practice", "Language belief", "De facto language policy",
      "De jure language policy", "Official language", "National language", "Language rights", "Linguistic human rights",
      "Minority language", "Minoritized language", "Heritage language", "Indigenous language", "Endangered language",
      "Language maintenance", "Language shift", "Reversing language shift", "Family language policy", "Medium-of-instruction policy"
    ]
  },
  {
    id: "revitalization",
    label: "复振、社群与历史修复",
    color: "teal",
    terms: [
      "Language reclamation", "Language documentation", "Language nest", "New speaker", "Intergenerational transmission",
      "Domain expansion", "Language vitality", "Ethnolinguistic sustainability", "Rematriation", "Repatriation of knowledge",
      "Historical trauma", "Intergenerational trauma", "Trauma-informed pedagogy", "Healing-centered engagement", "Language shame",
      "Language loyalty", "Ancestral language learning", "Community language school", "Supplementary school", "Community cultural institution",
      "Participatory language planning", "Grassroots language policy", "Indigenous methodology", "Relational accountability", "Data sovereignty"
    ]
  },
  {
    id: "testing",
    label: "测试、测量与研究质量",
    color: "amber",
    terms: [
      "Reliability", "Measurement error", "Test bias", "Differential item functioning", "Measurement invariance",
      "Washback", "Test impact", "High-stakes testing", "Language test literacy", "Assessment literacy",
      "Construct underrepresentation", "Construct-irrelevant variance", "Authentic assessment", "Portfolio assessment", "Performance assessment",
      "Alternative assessment", "Self-assessment", "Peer assessment", "Translanguaging assessment", "Multilingual assessment",
      "Generalizability", "Transferability", "Credibility in qualitative research", "Dependability", "Confirmability"
    ]
  },
  {
    id: "methodology",
    label: "方法论、证据与开放研究",
    color: "slate",
    terms: [
      "Ontology", "Epistemology", "Axiology", "Methodology", "Reflexivity",
      "Positionality", "Emic perspective", "Etic perspective", "Thick description", "Triangulation",
      "Member reflection", "Negative case analysis", "Saturation", "Theoretical sampling", "Purposive sampling",
      "Convenience sampling", "Observer's paradox", "Reactivity", "Researcher effect", "Ecological validity",
      "Preregistration", "Open data", "Data ethics", "Reproducibility", "Replicability"
    ]
  },
  {
    id: "translation_ext",
    label: "翻译、口译与跨语言中介",
    color: "violet",
    terms: [
      "Equivalence", "Dynamic equivalence", "Formal equivalence", "Skopos theory", "Domestication",
      "Foreignization", "Translator visibility", "Translation norm", "Translation brief", "Source text",
      "Target text", "Interpreting aptitude", "Community interpreting", "Public-service interpreting", "Medical interpreting",
      "Court interpreting", "Educational interpreting", "Relay interpreting", "Sight translation", "Audio description",
      "Machine translation", "Post-editing", "Transcreation", "Localization", "Multimodal translation"
    ]
  },
  {
    id: "identity",
    label: "身份、文化与交叉性",
    color: "pink",
    terms: [
      "Identity", "Subjectivity", "Performativity", "Intersectionality", "Positioned identity",
      "Narrative identity", "Transnational identity", "Diasporic identity", "Hybrid identity", "Liminality",
      "In-betweenness", "Passing", "Authenticity discourse", "Belonging", "Recognition",
      "Misrecognition", "Othering", "Stereotype", "Prejudice", "Discrimination",
      "Accentism", "Linguicism", "Gendered language", "Queer temporality", "Transracial identification"
    ]
  },
  {
    id: "technology_ext",
    label: "数字平台、人工智能与媒介",
    color: "indigo",
    terms: [
      "Computer-assisted language learning", "Mobile-assisted language learning", "Technology-mediated communication", "Computer-mediated discourse", "Digital multimodality",
      "Platformization", "Algorithmic bias", "Algorithmic language ideology", "Content moderation", "Automated translation",
      "Large language model", "Language-agnostic AI", "Natural language processing", "Speech recognition", "Automatic captioning",
      "Digital divide", "Datafication", "Surveillance", "Digital labor", "Platform vernacular",
      "Participatory culture", "Networked public", "Context collapse", "Memetic communication", "Human-AI co-writing"
    ]
  }
];

export const allConcepts = conceptGroups.flatMap((group) =>
  group.terms.map((term) => ({ term, groupId: group.id, groupLabel: group.label, color: group.color }))
);

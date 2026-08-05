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
  }
];

export const allConcepts = conceptGroups.flatMap((group) =>
  group.terms.map((term) => ({ term, groupId: group.id, groupLabel: group.label, color: group.color }))
);


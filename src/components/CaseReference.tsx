import React, { useState } from "react";
import {
  CASE_REFERENCE,
  CaseAbbr,
  CaseReference as CaseInfo,
  EndingRow,
  Term,
} from "../data/caseReference";
import {
  REFERENCE_ADJECTIVES,
  REFERENCE_NOUNS,
  NounGender,
  ReferenceAdjective,
} from "../data/caseForms";
import SpeechButton from "./SpeechButton";

interface CaseColors {
  text: string;
  header: string;
  soft: string;
  border: string;
  chip: string;
}

// Full class names so Tailwind can find them
const CASE_COLORS: Record<CaseAbbr, CaseColors> = {
  nom: {
    text: "text-blue-700",
    header: "bg-blue-600",
    soft: "bg-blue-50",
    border: "border-blue-600",
    chip: "bg-blue-50 border-blue-200 text-blue-900",
  },
  gen: {
    text: "text-green-700",
    header: "bg-green-600",
    soft: "bg-green-50",
    border: "border-green-600",
    chip: "bg-green-50 border-green-200 text-green-900",
  },
  dat: {
    text: "text-amber-700",
    header: "bg-amber-600",
    soft: "bg-amber-50",
    border: "border-amber-600",
    chip: "bg-amber-50 border-amber-200 text-amber-900",
  },
  acc: {
    text: "text-rose-700",
    header: "bg-rose-600",
    soft: "bg-rose-50",
    border: "border-rose-600",
    chip: "bg-rose-50 border-rose-200 text-rose-900",
  },
  ins: {
    text: "text-violet-700",
    header: "bg-violet-600",
    soft: "bg-violet-50",
    border: "border-violet-600",
    chip: "bg-violet-50 border-violet-200 text-violet-900",
  },
  loc: {
    text: "text-teal-700",
    header: "bg-teal-600",
    soft: "bg-teal-50",
    border: "border-teal-600",
    chip: "bg-teal-50 border-teal-200 text-teal-900",
  },
  voc: {
    text: "text-orange-700",
    header: "bg-orange-600",
    soft: "bg-orange-50",
    border: "border-orange-600",
    chip: "bg-orange-50 border-orange-200 text-orange-900",
  },
};

const GENDER_LABELS: Record<NounGender, string> = {
  m1: "Masc. personal",
  m2: "Masc. animate",
  m3: "Masc. inanimate",
  f: "Feminine",
  n: "Neuter",
};

/**
 * Adjective form agreeing with a noun of the given gender, number and case.
 * The vocative has no adjective forms of its own, so it uses the nominative.
 */
const getAdjectiveForm = (
  adjective: ReferenceAdjective,
  gender: NounGender,
  plural: boolean,
  abbr: CaseAbbr
): string => {
  const caseKey = abbr === "voc" ? "nom" : abbr;
  if (plural) {
    return (gender === "m1" ? adjective.vir_pl : adjective.nvir_pl)[caseKey];
  }
  if (gender === "f" || gender === "n") {
    return adjective[gender][caseKey];
  }
  if (caseKey === "acc") {
    return adjective.m[gender === "m3" ? "acc_inan" : "acc_anim"];
  }
  return adjective.m[caseKey];
};

const stripBrackets = (text: string): string => text.replace(/[[\]]/g, "");

const SectionHeading: React.FC<{ colors: CaseColors; title: string }> = ({
  colors,
  title,
}) => (
  <h3
    className={`text-sm font-semibold uppercase tracking-wide mb-2 ${colors.text}`}
  >
    {title}
  </h3>
);

const TermChips: React.FC<{
  colors: CaseColors;
  terms: Term[];
  note?: string;
}> = ({ colors, terms, note }) => (
  <div>
    {terms.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {terms.map((term) => (
          <span
            key={term.pl}
            className={`px-2 py-1 rounded-full border text-sm ${colors.chip}`}
          >
            <span className="font-medium">{term.pl}</span>{" "}
            <span className="text-gray-600">{term.en}</span>
          </span>
        ))}
      </div>
    )}
    {note && <p className="text-sm text-gray-500 italic mt-2">{note}</p>}
  </div>
);

const EndingsTable: React.FC<{ colors: CaseColors; rows: EndingRow[] }> = ({
  colors,
  rows,
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">
      <thead>
        <tr className={`${colors.header} text-white`}>
          <th className="px-3 py-2 font-semibold">Category</th>
          <th className="px-3 py-2 font-semibold">Ending</th>
          <th className="px-3 py-2 font-semibold">Example</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.category} className={i % 2 ? colors.soft : ""}>
            <td className="px-3 py-2 font-medium text-gray-900">
              {row.category}
            </td>
            <td className="px-3 py-2 text-gray-700">{row.ending}</td>
            <td className="px-3 py-2 text-gray-700">{row.example}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Sentence: React.FC<{ colors: CaseColors; text: string }> = ({
  colors,
  text,
}) => (
  <>
    {text.split(/(\[[^\]]+\])/).map((part, i) =>
      part.startsWith("[") ? (
        <strong key={i} className={colors.text}>
          {part.slice(1, -1)}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    )}
  </>
);

const DeclensionTable: React.FC<{ info: CaseInfo; colors: CaseColors }> = ({
  info,
  colors,
}) => {
  const [adjectiveWord, setAdjectiveWord] = useState<string | null>(
    REFERENCE_ADJECTIVES[0].word
  );
  const adjective = REFERENCE_ADJECTIVES.find((a) => a.word === adjectiveWord);
  const suffix = info.abbr === "voc" ? "!" : "";

  const phrase = (
    gender: NounGender,
    nounForm: string,
    plural: boolean
  ): React.ReactNode => (
    <>
      {adjective && (
        <span className={colors.text}>
          {getAdjectiveForm(adjective, gender, plural, info.abbr)}{" "}
        </span>
      )}
      <span className="font-medium text-gray-900">
        {nounForm}
        {suffix}
      </span>
    </>
  );

  const adjectiveOptions = [
    { word: null, label: "none" },
    ...REFERENCE_ADJECTIVES.map((a) => ({
      word: a.word,
      label: `${a.word} (${a.english})`,
    })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
        <span className="text-gray-600">With adjective:</span>
        {adjectiveOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => setAdjectiveWord(option.word)}
            className={`px-2 py-1 rounded-full border transition-colors ${
              adjectiveWord === option.word
                ? colors.chip
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className={`${colors.header} text-white`}>
              <th className="px-3 py-2 font-semibold">Noun</th>
              <th className="px-3 py-2 font-semibold">Singular</th>
              <th className="px-3 py-2 font-semibold">Plural</th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE_NOUNS.map((noun, i) => (
              <tr key={noun.word} className={i % 2 ? colors.soft : ""}>
                <td className="px-3 py-2">
                  <div className="font-medium text-gray-900">
                    {noun.word}{" "}
                    <span className="font-normal text-gray-500">
                      ({noun.english})
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {GENDER_LABELS[noun.gender]}
                  </div>
                </td>
                <td className="px-3 py-2">
                  {phrase(noun.gender, noun.forms[`${info.abbr}_sg`], false)}
                </td>
                <td className="px-3 py-2">
                  {phrase(noun.gender, noun.forms[`${info.abbr}_pl`], true)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CaseSection: React.FC<{ info: CaseInfo; index: number }> = ({
  info,
  index,
}) => {
  const colors = CASE_COLORS[info.abbr];

  return (
    <section
      id={`case-${info.abbr}`}
      className="quiz-card space-y-6 scroll-mt-20"
    >
      <div
        className={`flex flex-wrap items-start justify-between gap-3 border-b-4 pb-3 ${colors.border}`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`${colors.header} text-white text-sm font-semibold px-3 py-1 rounded-full`}
          >
            {index + 1} / {CASE_REFERENCE.length}
          </span>
          <div>
            <h2 className={`text-3xl font-bold ${colors.text}`}>{info.pl}</h2>
            <p className="text-gray-500">{info.en}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {info.questions.map((q) => (
            <div
              key={q.pl}
              className={`border rounded-lg px-3 py-1 text-center ${colors.chip}`}
            >
              <div className={`font-semibold ${colors.text}`}>{q.pl}</div>
              <div className="text-xs text-gray-600">{q.en}</div>
            </div>
          ))}
        </div>
      </div>

      <p
        className={`border-l-4 ${colors.border} ${colors.soft} px-4 py-3 rounded-r-lg text-gray-800`}
      >
        {info.description}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <SectionHeading colors={colors} title="Triggering prepositions" />
          <TermChips
            colors={colors}
            terms={info.prepositions}
            note={info.prepositionNote}
          />
        </div>
        <div>
          <SectionHeading colors={colors} title="Triggering verbs" />
          <TermChips colors={colors} terms={info.verbs} note={info.verbNote} />
        </div>
      </div>

      <div>
        <SectionHeading colors={colors} title="Noun endings at a glance" />
        <EndingsTable colors={colors} rows={info.nounEndings} />
      </div>

      <div>
        <SectionHeading
          colors={colors}
          title="Adjective endings (agree with the noun)"
        />
        <EndingsTable colors={colors} rows={info.adjectiveEndings} />
      </div>

      <div>
        <SectionHeading colors={colors} title="Sample nouns, declined" />
        <DeclensionTable info={info} colors={colors} />
      </div>

      <div>
        <SectionHeading colors={colors} title="Example sentences" />
        <ul className="space-y-3">
          {info.examples.map((example) => (
            <li key={example.pl}>
              <div className="flex items-center">
                <p className="polish-text">
                  <Sentence colors={colors} text={example.pl} />
                </p>
                <SpeechButton text={stripBrackets(example.pl)} />
              </div>
              <p className="english-text text-sm">{example.en}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionHeading colors={colors} title="Drop any noun in" />
        <div className="grid md:grid-cols-2 gap-3">
          {info.frames.map((frame) => (
            <div
              key={frame.pl}
              className={`border rounded-lg px-4 py-3 ${colors.chip}`}
            >
              <div className={`text-lg font-semibold ${colors.text}`}>
                {frame.pl}
              </div>
              <div className="text-sm text-gray-600">{frame.en}</div>
              <div className="flex items-center text-sm text-gray-800 mt-1">
                <span>
                  e.g. <em>{frame.example}</em>
                </span>
                <SpeechButton text={frame.example} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseReference: React.FC = () => {
  const scrollToCase = (abbr: CaseAbbr): void => {
    document
      .getElementById(`case-${abbr}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-gray-50 py-2 flex gap-2 overflow-x-auto md:flex-wrap md:justify-center">
        {CASE_REFERENCE.map((info) => (
          <button
            key={info.abbr}
            onClick={() => scrollToCase(info.abbr)}
            className={`shrink-0 whitespace-nowrap px-3 py-1 rounded-full border text-sm font-medium ${
              CASE_COLORS[info.abbr].chip
            }`}
          >
            {info.pl}
          </button>
        ))}
      </div>

      {CASE_REFERENCE.map((info, index) => (
        <CaseSection key={info.abbr} info={info} index={index} />
      ))}
    </div>
  );
};

export default CaseReference;

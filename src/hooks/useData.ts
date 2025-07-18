import { useState, useEffect } from "react";
import {
  VocabularyWord,
  TenseConjugation,
  GrammaticalCase,
  CaseDescription,
  DataHookResult,
} from "../types";

export const useVocabularyData = (): DataHookResult<VocabularyWord> => {
  const [data, setData] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const response = await fetch("./data/1000-words.json");
        if (!response.ok) throw new Error("Failed to load vocabulary data");
        const jsonData = await response.text();
        // Parse as JavaScript object since it uses unquoted keys
        const parsedData = eval(`(${jsonData})`) as VocabularyWord[];
        setData(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

export const useTensesData = (): DataHookResult<TenseConjugation> => {
  const [data, setData] = useState<TenseConjugation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const response = await fetch("./data/tenses.json");
        if (!response.ok) throw new Error("Failed to load tenses data");
        const jsonData = await response.text();
        const parsedData = eval(`(${jsonData})`) as TenseConjugation[];
        setData(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

interface CasesDataResult {
  data: GrammaticalCase[];
  descriptions: CaseDescription[];
  loading: boolean;
  error: string | null;
}

export const useCasesData = (): CasesDataResult => {
  const [data, setData] = useState<GrammaticalCase[]>([]);
  const [descriptions, setDescriptions] = useState<CaseDescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const [casesResponse, descriptionsResponse] = await Promise.all([
          fetch("./data/cases.json"),
          fetch("./data/case-descriptions.json"),
        ]);

        if (!casesResponse.ok || !descriptionsResponse.ok) {
          throw new Error("Failed to load cases data");
        }

        const [casesData, descriptionsData] = await Promise.all([
          casesResponse.text(),
          descriptionsResponse.text(),
        ]);

        const parsedCases = eval(`(${casesData})`) as GrammaticalCase[];
        const parsedDescriptions = eval(
          `(${descriptionsData})`
        ) as CaseDescription[];

        setData(parsedCases);
        setDescriptions(parsedDescriptions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, descriptions, loading, error };
};

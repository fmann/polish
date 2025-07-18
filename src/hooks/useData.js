import { useState, useEffect } from "react";

export const useVocabularyData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/1000-words.json");
        if (!response.ok) throw new Error("Failed to load vocabulary data");
        const jsonData = await response.text();
        // Parse as JavaScript object since it uses unquoted keys
        const parsedData = eval(`(${jsonData})`);
        setData(parsedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

export const useTensesData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/tenses.json");
        if (!response.ok) throw new Error("Failed to load tenses data");
        const jsonData = await response.text();
        const parsedData = eval(`(${jsonData})`);
        setData(parsedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

export const useCasesData = () => {
  const [data, setData] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [casesResponse, descriptionsResponse] = await Promise.all([
          fetch("/cases.json"),
          fetch("/case-descriptions.json"),
        ]);

        if (!casesResponse.ok || !descriptionsResponse.ok) {
          throw new Error("Failed to load cases data");
        }

        const [casesData, descriptionsData] = await Promise.all([
          casesResponse.text(),
          descriptionsResponse.text(),
        ]);

        const parsedCases = eval(`(${casesData})`);
        const parsedDescriptions = eval(`(${descriptionsData})`);

        setData(parsedCases);
        setDescriptions(parsedDescriptions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, descriptions, loading, error };
};

import { useEffect, useState } from 'react';

interface ISettings {
  method?: 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  headers?: HeadersInit;
  body?: BodyInit;
}

const useFetch = <T,>(url: string, settings?: ISettings) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, settings);

      if (!res.ok) {
        throw new Error('Произошла ошибка на сервере');
      }

      const resData: T = await res.json();
      setLoading(false);

      setData(resData);
    } catch (error) {
      setLoading(false);
      const normalizedError =
        error instanceof Error ? error : new Error('Неизвестная ошибка');

      setError(normalizedError);

      throw normalizedError;
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useFetch;

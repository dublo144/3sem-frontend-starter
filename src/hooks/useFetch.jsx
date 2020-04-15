import { useState, useEffect } from 'react';

const useFetch = () => {
  const baseUrl = 'https://madsbrandt.codes/jokeFetcher/api'; // TODO - Change
  const [url, setUrl] = useState('');
  const [opts, setOpts] = useState({});
  const [response, setResponse] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}${url}`, opts);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    if (url) {
      fetchData();
    }
  }, [url, opts]);

  const doFetch = (_url, _opts) => {
    setUrl(_url);
    setOpts(_opts);
  };

  return [{ response, error, isLoading }, doFetch];
};

export default useFetch;

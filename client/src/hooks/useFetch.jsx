import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(import.meta.env.VITE_APP_API_URL + url, {
          headers: {
            Authorization: "bearer" + import.meta.env.VITE_APP_API_TOKEN,
          },
        });
        console.log(res.data.data);
        setData(res.data.data);
      } catch (e) {
        setError(true);
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

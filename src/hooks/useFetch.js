// const { data, loading, error } = useFetch('https://api.example.com/items');

// if (loading) return <Text>Loading...</Text>;
// if (error) return <Text>Error: {error}</Text>;

// return <FlatList data={data} renderItem={({ item }) => <Text>{item.name}</Text>} />;

import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;

import { useState, useEffect } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currency) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Try multiple API endpoints
    const apiUrls = [
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
      `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`,
      `https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/${currency}.json`,
    ];

    const fetchCurrencyData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    };

    // Try each API endpoint until one works
    const tryFetch = async () => {
      for (const url of apiUrls) {
        try {
          console.log(`Trying to fetch from: ${url}`);
          const res = await fetchCurrencyData(url);

          // Handle different API response structures
          let currencyData = null;

          // Check if response has the currency as a key
          if (res[currency]) {
            currencyData = res[currency];
          }
          // Check if response has data in a different format
          else if (res.data && res.data[currency]) {
            currencyData = res.data[currency];
          }
          // If we found data, break out of the loop
          if (currencyData) {
            setData(currencyData);
            console.log(
              `Successfully fetched data for ${currency}:`,
              currencyData,
            );
            setLoading(false);
            return;
          }
        } catch (err) {
          console.log(`Failed to fetch from ${url}:`, err.message);
          continue;
        }
      }

      // If all APIs fail, throw error
      throw new Error("Unable to fetch currency data from any source");
    };

    tryFetch().catch((err) => {
      console.error("All API endpoints failed:", err);
      setError(err.message);
      setData({});
      setLoading(false);
    });
  }, [currency]);

  return { data, loading, error };
};

export default useCurrencyInfo;

import { useState, useEffect } from "react";
import InputBox from "./components/Input";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: currencyInfo, loading, error } = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  // Debug log to see what's being fetched
  useEffect(() => {
    console.log("Currency Info:", currencyInfo);
    console.log("Options:", options);
  }, [currencyInfo, options]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      const result = amount * currencyInfo[to];
      setConvertedAmount(result);
      console.log(`Converting ${amount} ${from} to ${to}: ${result}`); // Debug log
    } else {
      console.log(`Conversion rate for ${to} not found`);
    }
  };

  // Auto-convert when amount, from, or to changes
  useEffect(() => {
    if (currencyInfo && currencyInfo[to] && amount > 0) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [amount, from, to, currencyInfo]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-white text-xl">Loading currency data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setFrom(currency);
                  // Reset converted amount when changing from currency
                  setConvertedAmount(0);
                }}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>

          {/* Debug info - remove in production */}
          {options.length > 0 && (
            <div className="mt-4 text-xs text-white/70 text-center">
              Available currencies: {options.slice(0, 5).join(", ")}
              {options.length > 5 && "..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

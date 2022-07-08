import { useState, useEffect } from "react";
import { setCurrent } from "../../services/currentApi";

const Conventer = () => {
  const [currencies, setCurrencies] = useState([]);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [firstcurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [result, setResult] = useState(false);

  useEffect(() => {
    setCurrent().then((arr) => setCurrencies(arr));
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstInput") {
      setFirstValue(value);
      setResult(false);
    } else if (name === "secondInput") {
      setSecondValue(value);
      setResult(false);
    } else if (name === "selectFirst") {
      setFirstCurrency(value);
    } else if (name === "selectSecond") {
      setSecondCurrency(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult(true);
    const fromCurrency = currencies.find((current) => {
      if (firstcurrency === "UAH") {
        return;
      }
      return firstcurrency === current.ccy;
    });
    const toCurrency = currencies.find((current) => {
      if (secondCurrency === "UAH") {
        return;
      }
      return secondCurrency === current.ccy;
    });
    if (firstcurrency === "UAH") {
      if (firstValue) {
        const value = toCurrency.buy * firstValue;
        setSecondValue(value.toFixed(2));
      } else if (secondValue) {
        const value = toCurrency.buy * secondValue;
        setFirstValue(value.toFixed(2));
      }
      return;
    } else if (secondCurrency === "UAH") {
      if (secondValue) {
        const value = fromCurrency.buy * secondValue;
        setFirstValue(value.toFixed(2));
      } else if (firstValue) {
        const value = fromCurrency.buy * firstValue;
        setSecondValue(value.toFixed(2));
      }
      return;
    }
    if (firstValue) {
      const value = (fromCurrency.buy / toCurrency.buy) * firstValue;
      setSecondValue(value.toFixed(2));
    } else if (secondValue) {
      const value = (toCurrency.buy / fromCurrency.buy) * secondValue;
      setFirstValue(value.toFixed(2));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="firstInput"
          value={firstValue}
          onChange={handleChange}
        ></input>
        <select name="selectFirst" onChange={handleChange}>
          <option value="USD" defaultValue>
            USD
          </option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <input
          type="number"
          name="secondInput"
          value={secondValue}
          onChange={handleChange}
        ></input>
        <select name="selectSecond" onChange={handleChange}>
          <option value="USD" defaultValue>
            USD
          </option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <button type="submit" disabled={result}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Conventer;

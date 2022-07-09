import { useState, useEffect } from "react";
import { setCurrent } from "../../services/currentApi";
import { MdSwapCalls } from "react-icons/md";
import "./Conventer.css";

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
        const value = secondValue / fromCurrency.buy;
        setFirstValue(value.toFixed(2));
      } else if (firstValue) {
        const value = firstValue * fromCurrency.buy;
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
    <div className="conventer-container">
      <form onSubmit={handleSubmit}>
        <div className="from-input">
          <select
            className="select-css"
            name="selectFirst"
            value={firstcurrency}
            onChange={handleChange}
          >
            <option value="USD" defaultValue>
              USD
            </option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              type="number"
              name="firstInput"
              value={firstValue}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <button
          className="swap-button"
          type="button"
          onClick={() => {
            setFirstCurrency(secondCurrency);
            setSecondCurrency(firstcurrency);
            setFirstValue("");
            setSecondValue("");
          }}
        >
          <MdSwapCalls size="40px" fill="green" />
        </button>
        <div className="to-input">
          <select
            className="select-css"
            name="selectSecond"
            value={secondCurrency}
            onChange={handleChange}
          >
            <option value="USD" defaultValue>
              USD
            </option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
          <div className="text-field text-field_floating-3">
            <input
              className="text-field__input"
              type="number"
              name="secondInput"
              value={secondValue}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <button className="submit-button" type="submit" disabled={result}>
          Exchange
        </button>
      </form>
    </div>
  );
};

export default Conventer;

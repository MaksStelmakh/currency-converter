import { useState, useEffect } from "react";
import "./HeaderCurrency.css";
import { setCurrent } from "../../services/currentApi";
import { FcCurrencyExchange } from "react-icons/fc";
import USDimg from "../../images/USD.png";
import EURimg from "../../images/EUR.png";

const HeaderCurrency = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    setCurrent().then((arr) => setCurrencies(arr));
  }, []);
  return (
    <header>
      <div className="header">
        <FcCurrencyExchange size="4em" />
        <div className="currency">
          {currencies
            .filter((arr) => arr.ccy === "USD")
            .map((current) => {
              return (
                <ul className="currency-list" key={current.ccy}>
                  <li className="currency-image">
                    <img src={USDimg} alt="" width="30" height="20"></img>
                  </li>
                  <li className="currency-item">{current.buy}/</li>
                  <li className="currency-item">{current.sale}</li>
                </ul>
              );
            })}
          {currencies
            .filter((arr) => arr.ccy === "EUR")
            .map((current) => {
              return (
                <ul className="currency-list" key={current.ccy}>
                  <li className="currency-image">
                    <img src={EURimg} alt="" width="20" height="20"></img>
                  </li>
                  <li className="currency-item">{current.buy}/</li>
                  <li className="currency-item">{current.sale}</li>
                </ul>
              );
            })}
        </div>
      </div>
    </header>
  );
};

export default HeaderCurrency;

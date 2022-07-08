import { useState, useEffect } from "react";
import { setCurrent } from "../../services/currentApi";

const Header = () => {
  const [currencies, setCurrencies] = useState([]);
  const [USD, setUSD] = useState(0);
  const [EUR, setEUR] = useState(0);

  useEffect(() => {
    setCurrent().then((arr) => setCurrencies(arr));
  }, []);
  return (
    <>
      {currencies
        .filter((arr) => arr.ccy === "USD")
        .map((current) => {
          return (
            <ul key={current.ccy}>
              USD
              <li>{current.buy} купівля</li>
              <li>{current.sale} продаж</li>
            </ul>
          );
        })}
      {currencies
        .filter((arr) => arr.ccy === "EUR")
        .map((current) => {
          return (
            <ul key={current.ccy}>
              EUR
              <li>{current.buy} купівля</li>
              <li>{current.sale} продаж</li>
            </ul>
          );
        })}
    </>
  );
};

export default Header;

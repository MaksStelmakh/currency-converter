import axios from "axios";

axios.defaults.baseURL = "https://api.privatbank.ua/p24api";

export const setCurrent = async () => {
  try {
    const { data } = await axios.get(`/pubinfo?exchange&json&coursid=11`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// 0: {ccy: 'USD', base_ccy: 'UAH', buy: '35.46090', sale: '35.46099'}
// 1: { ccy: 'EUR', base_ccy: 'UAH', buy: '36.10100', sale: '36.10108' }
// 2: { ccy: 'RUR', base_ccy: 'UAH', buy: '0.32000', sale: '0.35001' }
// 3: { ccy: 'BTC', base_ccy: 'USD', buy: '20529.1646', sale: '22690.1292' }

// 1 UAH = 35.46 USD
// 1 UAH = 36.10 EUR

// https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11

// https://free.currconv.com/api/v7/convert?apiKey=cd2ff852330c08894153&q=USD_RUB&compact=ultra

// M8gLjb51AOSQL84KoFZyKJPTT4l23Wrh;

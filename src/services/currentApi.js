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

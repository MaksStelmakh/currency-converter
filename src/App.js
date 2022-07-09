import "./App.css";
import HeaderCurrency from "./components/Header/HeaderCurrency";
import Conventer from "./components/Conventer/Conventer";

const App = () => {
  return (
    <div className="app">
      <HeaderCurrency />
      <Conventer />
    </div>
  );
};

export default App;

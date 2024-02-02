import logo from "./logo.svg";
import "./App.css";
import { counterSelector } from "./redux-tookit/selector";
import { useDispatch, useSelector } from "react-redux";

import { counterSlice } from "./redux-tookit/reducer/counterSlice";

function App() {
  const dispatch = useDispatch();
  const value = useSelector(counterSelector);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>counter : {value.value} </div>

      <button
        onClick={() => {
          dispatch(counterSlice.actions.increase());
        }}
      >
        increase
      </button>

      <button
        onClick={() => {
          dispatch(counterSlice.actions.descrease());
        }}
      >
        descrease
      </button>
    </div>
  );
}

export default App;

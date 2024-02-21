import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Experience from "./pages/Experience";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/experience" element={<Experience></Experience>}></Route>
      <Route path="/explore" element={<Explore></Explore>}></Route>
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  );
}

export default App;

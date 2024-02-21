import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Experience from "./pages/Experience";
import Detail from './pages/detail/Detail';
import './App.css';
import Inbox from "./pages/Inbox/Inbox";
import InboxGuest from "./components/InboxGuest/InboxGuest";
import ShowComponent from "./pages/Inbox/ShowComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/experience" element={<Experience></Experience>}></Route>
      <Route path="/explore" element={<Explore></Explore>}></Route>
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/inbox" element={<ShowComponent><Inbox> </Inbox></ShowComponent>} />
      <Route path="/inbox/:roomId" element={<ShowComponent><Inbox> <InboxGuest></InboxGuest> </Inbox></ShowComponent>} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Experience from "./pages/Experience";

import Detail from "./pages/Detail";

import Inbox from "./pages/Inbox/Inbox";
import InboxGuest from "./components/InboxGuest/InboxGuest";
import ShowComponent from "./pages/Inbox/ShowComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/experience" element={<Experience></Experience>}></Route>
      <Route path="/explore" element={<Explore></Explore>}></Route>
<<<<<<< HEAD

      <Route path="/explore/detail/:id" element={<Detail />} />
      <Route path="/inbox" element={<Inbox> </Inbox>} />
      <Route
        path="/inbox/:roomId"
        element={
          <Inbox>
            {" "}
            <InboxGuest></InboxGuest>{" "}
          </Inbox>
        }
      />
=======
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/inbox" element={<ShowComponent><Inbox> </Inbox></ShowComponent>} />
      <Route path="/inbox/:roomId" element={<ShowComponent><Inbox> <InboxGuest></InboxGuest> </Inbox></ShowComponent>} />
>>>>>>> origin/an-chat-page
    </Routes>
  );
}

export default App;

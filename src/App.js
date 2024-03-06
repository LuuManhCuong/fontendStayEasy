import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Experience from "./pages/Experience";

import Detail from "./pages/Detail";

import Inbox from "./pages/Inbox/Inbox";
import InboxGuest from "./components/InboxGuest/InboxGuest";
import ShowComponent from "./pages/Inbox/ShowComponent";

import Booking from "./pages/Booking";
import Layout from "./components/Property/Layout/Layout"
import Statistic from "./components/Property/Statistic"
import ListProperty from './components/Property/ListProperty';
import AddProperty from './components/Property/AddProperty';
import UpdateProperty from './components/Property/UpdateProperty';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/experience" element={<Experience></Experience>}></Route>
      <Route path="/explore" element={<Explore></Explore>}></Route>
      <Route path="/explore/detail/:id" element={<Detail />} />
      <Route path="/property" element={<Layout/>}>
        <Route path="statistic" element={<Statistic />} />
        <Route path="list" element={<ListProperty />} />
        <Route path="add" element={<AddProperty/>} />
        <Route path="update/:propertyId" element={<UpdateProperty/>}/>
      </Route>
      <Route
        path="/inbox"
        element={
          <ShowComponent>
            <Inbox> </Inbox>
          </ShowComponent>
        }
      />
      <Route
        path="/inbox/:roomId"
        element={
          <ShowComponent>
            <Inbox>
              {" "}
              <InboxGuest></InboxGuest>{" "}
            </Inbox>
          </ShowComponent>
        }
      />
      <Route path="/booking" element={<Booking />} />

    </Routes>
  );
}

export default App;

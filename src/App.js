import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Experience from "./pages/Experience";
import { DefaultLayout } from "./components/Layouts";
import PropertyManager from "./components/Property/PropertyManager";
import ListProperty from "./components/Property/ListProperty";
import AddProperty from "./components/Property/AddProperty";
import UpdateProperty from "./components/Property/UpdateProperty";

// Cấu hình routes con với <DefaultLayout> làm layout chính
function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="experience" element={<Experience />} />
        <Route path="explore" element={<Explore />} />
        <Route path="property" element={<PropertyManager />} />
        <Route path="property/list-property" element={<ListProperty />} />
        <Route path="property/add-property" element={<AddProperty />} />
        <Route path="property/list-property/update/:propertyId" element={<UpdateProperty />} />
      </Route>
    </Routes>
  );
}

export default App;

import * as React from "react"

// Imports of app views
import MapDetails from "../MapDetails";
import MapsOverview from "../MapsOverview";
import MapperDetails from "../MapperDetails"
import MappersOverview from "../MappersOverview";
import LogIn from "../LogIn";
import Error404 from "../Error404";

// Importing react-router-dom library
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogIn />}/>
      <Route path="login" element={<LogIn />} />
      <Route path="landing" element={<MapsOverview />}/>
      <Route path="mappers" element={<MappersOverview/>} />
      <Route path="mapper" element={<MapperDetails />}/>
      <Route path="the-grand-mayan" element={<MapDetails />} />
      <Route path="*" element={<Error404/>} />
    </Routes>
  </BrowserRouter>
)

export default App;
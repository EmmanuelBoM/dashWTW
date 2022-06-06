import * as React from "react"
import { useState } from "react"

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
  Route
} from "react-router-dom";

// Renders menu at first using Outlet
import MenuComponent from "../../components/Menu/menu.component";

export function App() {

  const [ selectedWindow, setSelectedWindow ] = useState("ams")
  
  return(
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />}/>
          <Route path="login" element={<LogIn />} />
          <Route element={<MenuComponent selectedWindow={selectedWindow}/>}>
            <Route path="maps" element={<MapsOverview selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow}/>}/>
            <Route path="mappers" element={<MappersOverview setSelectedWindow={setSelectedWindow}/>} />
            <Route path="mappers/:mapperId" element={<MapperDetails setSelectedWindow={setSelectedWindow}/>}/>
            <Route path="maps/:accomodationId" element={<MapDetails setSelectedWindow={setSelectedWindow}/>} />
            <Route path="*" element={<Error404/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App;
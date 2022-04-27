import * as React from "react"

// Imports of app views
import MapDetails from "../MapDetails";
import MapsOverview from "../MapsOverview";
import MapperDetails from "../MapperDetails"
import MappersOverview from "../MappersOverview";
import LogIn from "../LogIn";
import Error404 from "../Error404";

// Importing the menu bar to improve app performance
import Menu from '../../components/Menu/menu.component'

// Importing react-router-dom library
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MenuComponent from "../../components/Menu/menu.component";

export const App = () => (
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />}/>
        <Route path="login" element={<LogIn />} />
        <Route element={<MenuComponent window='ams' />}>
          <Route path="landing" element={<MapsOverview />}/>
          <Route path="mappers" element={<MappersOverview/>} />
          <Route path="mapper" element={<MapperDetails />}/>
          <Route path="the-grand-mayan" element={<MapDetails />} />
          <Route path="*" element={<Error404/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.Fragment>
)

export default App;
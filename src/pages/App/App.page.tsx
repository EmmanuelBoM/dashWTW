import * as React from "react";
import { useState, useEffect } from "react";

// Importing Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";

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

// Importing Firebase functions
import {
  auth,
  logout
} from "../../utils/firebase";

export function App() {
  
  const [ selectedWindow, setSelectedWindow ] = useState("ams")
  const [ user, loading, error ] = useAuthState(auth);
  const [ errorMessage, setErrorMessage ] = useState("");

  const handleLogout = async () => {
    setErrorMessage("");
    try {
      await logout();
    } catch(error:any) {
        setErrorMessage(error);
    }
  }
  
  return(
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />}/>
          <Route path="login" element={<LogIn />} />
          <Route element={<MenuComponent selectedWindow={selectedWindow} handleLogout={handleLogout}/>}>
            <Route path="maps" element={<MapsOverview selectedWindow={selectedWindow} 
                                                      setSelectedWindow={setSelectedWindow} 
                                                      loading={loading} 
                                                      user={user}/>}/>
            <Route path="mappers" element={<MappersOverview setSelectedWindow={setSelectedWindow}
                                                            loading={loading} 
                                                            user={user}/>} />
            <Route path="mappers/:mapperId" element={<MapperDetails setSelectedWindow={setSelectedWindow}
                                                                    loading={loading} 
                                                                    user={user}/>}/>
            <Route path="maps/:accomodationId" element={<MapDetails setSelectedWindow={setSelectedWindow}
                                                                    loading={loading} 
                                                                    user={user}/>} />
            <Route path="*" element={<Error404 loading={loading} 
                                               user={user}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App;
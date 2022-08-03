import React, { useEffect, useState, createContext } from 'react';
import { Map } from './components/map/Map'
import { About } from './components/about/About'
import { Help } from './components/help/Help'
import { SignInPage } from './components/signIn/SignInPage'
import {
  Route, BrowserRouter as Router, Routes, Redirect
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Header from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { SignUpPage } from "./components/signUp/SignUpPage";
// import { UserProvider, LoggedInContext } from "./contexts/UserContext";
// import {useSelector} from "react-redux";

export const LoggedInContext = createContext({
  user: null,
  setUser: () => { },
});

const App = props => {
  const userFromStorage = sessionStorage.user ? JSON.parse(sessionStorage.user)
    : localStorage.user ? JSON.parse(localStorage.user) : null;
  const [user, setUser] = useState(userFromStorage);
  // const loggedInValueToProvide = [user, setUser]; // So we can pass down both value and setter

  return (
    <LoggedInContext.Provider value={[user, setUser]}>
      <Router>
        <ChakraProvider>
          <div style={{ position: 'relative', zIndex: '2' }}>
            <Routes>
              <Route path="/*" element={<Header />} />
            </Routes>
          </div>
        </ChakraProvider>
        <ChakraProvider>
          <div style={{ position: 'relative', zIndex: '0' }} >
            <Routes>
              <Route exact path="/"
                element={!user ? <SignInPage /> : <Map />} />
              <Route path="/apropos" element={<About />} />
              <Route path="/aide" element={<Help />} />
              <Route path="/app" element={user ? <Map /> : <SignInPage />} />
              <Route path="/connexion" element={!user ? <SignInPage /> : <Map />} />
              <Route path="/inscription" element={!user ? <SignUpPage /> : <Map />} />
              <Route path="/*" element={user ? <Map /> : <SignInPage />} />
            </Routes>
          </div>
        </ChakraProvider>
      </Router>
      <div style={{ position: 'relative', zIndex: '2' }}>
        <ChakraProvider>
          <Footer />
        </ChakraProvider>
      </div>
    </LoggedInContext.Provider>
  );
};


export default App;
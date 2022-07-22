import React, {useEffect, useState }from 'react';
import {Map} from './components/map/Map'
import { About } from './components/about/About'
import { Help } from './components/help/Help'
import { SignInPage } from './components/signIn/SignInPage'
import {
    Route, BrowserRouter as Router, Routes, Redirect
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Header from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import {SignUpPage} from "./components/signUp/SignUpPage";
import {UserProvider} from "./contexts/UserContext";
import {useSelector} from "react-redux";

const App = props => {

    const [state, setState] = useState([{}])
    const user = useSelector(state => state.user)
    useEffect(()=>{
        fetch("/users").then(
            res => res.json()
        ).then(
            data => {
                setState(data)
            }
        )
    }, [])

    return (
            <UserProvider>
                <Router>
                    <ChakraProvider>
                        <div style={{  position: 'relative', zIndex: '2' }}>
                            <Routes>
                                <Route path="/*"  element={ <Header/>} />
                            </Routes>
                        </div>
                </ChakraProvider>
                <ChakraProvider>
                    <div style={{  position: 'relative', zIndex: '0' }} >
                        <Routes>
                        <Route exact path="/"
                            element={ !user.loggedIn ? <SignInPage/> : <Map/>} />
                        <Route path="/apropos"  element={ <About/>} />
                        <Route path="/aide"   element={<Help/>}  />
                        <Route path="/app"  element={ user.loggedIn ? <Map/>: <SignInPage/>} />
                        <Route path="/connexion"  element={ !user.loggedIn ? <SignInPage/> : <Map/>} />
                        <Route path="/inscription"  element={ !user.loggedIn ? <SignUpPage/>: <Map/>} />
                        <Route path="/*"  element={ !user.loggedIn ? <Map/>: <SignInPage/>} />
                    </Routes>
                </div>
                    </ChakraProvider>
            </Router>
                <div style={{ position: 'relative', zIndex: '2' }}>
                    <ChakraProvider>
                        <Footer  />
                    </ChakraProvider>
                </div>
        </UserProvider>
    );
};


export default App;
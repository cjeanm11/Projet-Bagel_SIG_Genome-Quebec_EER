import React, {useEffect, useState }from 'react';
import { Map } from './components/map/Map'
import { About } from './components/about/About'
import { Home } from './components/home/Home'
import { Help } from './components/help/Help'
import { Team } from './components/team/Team'
import { SignInPage } from './components/signIn/SignInPage'
import {
    Route, BrowserRouter as Router, Routes
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Header from "./components/header/Header";
import {useDispatch, useSelector} from "react-redux";
import {Footer} from "./components/footer/Footer";
import {SignUpPage} from "./components/signUp/SignUpPage";
const App = props => {

    const [state, setState] = useState([{}])
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
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
            <div>
                { !user.loggedIn &&
                    <div style={{ visibility: user.loggedIn, position: 'relative', zIndex: '2' }}>
                        <ChakraProvider>
                            <Header  />
                        </ChakraProvider>
                    </div>
                }
                <div style={{ visibility: user.loggedIn, position: 'relative', zIndex: '0' }} >
                <Router>
                    <Routes>
                        <Route exact path="/"  element={<Home />} />
                        <Route exact path="/accueil"  element={<Home />} />
                        <Route path="/equipe"  element={ <Team/>} />
                        <Route path="/apropos"  element={ <About/>} />
                        <Route path="/aide"   element={<Help/>}  />
                        <Route path="/app"  element={<Map/>} />
                        <Route path="/connexion"  element={<SignInPage/>} />
                        <Route path="/inscription"  element={<SignUpPage/>} />
                    </Routes>
                </Router>
                </div>
                <div style={{ visibility: user.loggedIn, position: 'relative', zIndex: '2' }}>
                    <ChakraProvider>
                        <Footer  />
                    </ChakraProvider>
                </div>
            </div>
    );
};


export default App;
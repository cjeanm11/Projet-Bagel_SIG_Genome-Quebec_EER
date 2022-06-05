import React, {useEffect, useState }from 'react';
import { Map } from './components/map/Map'

const App = props => {

    const [state, setState] = useState([{}])

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
            <Map />
        </div>
    );
};


export default App;
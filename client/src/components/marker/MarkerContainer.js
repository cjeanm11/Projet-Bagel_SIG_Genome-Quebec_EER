import {Marker, Popup} from "react-leaflet";
import {DefaultIcon} from "../map/utils/constants";
import React from 'react'
import 'leaflet/dist/leaflet.css'


export const MarkerContainer = (props) => {

    return (
        <Marker key={props.i} position={props.marker} icon={DefaultIcon}>
           <Popup>
           </Popup>
       </Marker>
    )
}

import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import {MarkerContainer} from "../marker/MarkerContainer";

export class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pos: {
                lat: 51.505,
                lng: -0.09,
                zoom: 13,
            },
            markers: []
        }
    }

    componentDidMount() {
           fetch("/map/markers").then(
               res => res.json()
           ).then((data) =>
               this.setState({ markers: data })
           )
    }

    render() {
    return <MapContainer center={[this.state.pos.lat,this.state.pos.lng]} zoom={this.state.pos.zoom}>
            <TileLayer
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            {this.state.markers.map((marker, i) =>
                (
                    <MarkerContainer key={i} marker={marker} i={i}  > </MarkerContainer>
                )
            )}
        </MapContainer>
    }
}

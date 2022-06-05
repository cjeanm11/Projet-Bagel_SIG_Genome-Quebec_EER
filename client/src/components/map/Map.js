import React from 'react'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import {DefaultIcon} from "./utils/constants";

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
           fetch("/map").then(
               res => res.json()
           ).then((data) =>
               this.setState({ markers: data })
           )
    }

    renderMarkers = (markers) => {
        return markers.map((marker) =>
            (
                <Marker position={marker} icon={DefaultIcon}>
                    <Popup>
                        <table>
                            <tr>
                                <td>
                                    // insert image...
                                </td>
                                <td>
                                    texte descriptif
                                </td>
                            </tr>
                        </table>
                    </Popup>
                </Marker>
            )
        );
    }

    render() {
    return <MapContainer center={[this.state.pos.lat,this.state.pos.lng]} zoom={this.state.pos.zoom}>
            <TileLayer
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {this.renderMarkers(this.state.markers)}
        </MapContainer>
    }
}

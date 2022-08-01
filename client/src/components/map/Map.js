import 'leaflet/dist/leaflet.css'
import './Map.css'
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import {MarkerContainer} from "../marker/MarkerContainer";
import {useEffect, useState} from "react";
import {altIconMarker, DefaultIconMarker} from "./utils/constants";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor, Button,
} from '@chakra-ui/react'



export const Map = (props) => {

    const [position, setPosition] = useState(
        {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
        })

    const [markers, setMarkers] = useState([])


    useEffect(() => {
        fetch("/map/markers").then(
            res => res.json()
        ).then((data) =>
            setMarkers((prevState) => prevState = data)
        )
    }, [])
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click(e) {
                setPosition(e.latlng)
                console.log(e.latlng)
            }
        })

        return position === null ? null : (
            <MarkerContainer marker={position} icon={altIconMarker} typeMarker = "new"></MarkerContainer>
        )
    }

    return (
        <MapContainer center={[position.lat, position.lng]} zoom={position.zoom}>
            <TileLayer
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            <LocationMarker />
            {markers.map((marker, i) =>
                (
                    <MarkerContainer key={i} marker={marker} i={i} icon = {DefaultIconMarker} typeMarker = "old" > </MarkerContainer>
                )
            )}
        </MapContainer>
    )
}


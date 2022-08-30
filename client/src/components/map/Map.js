import 'leaflet/dist/leaflet.css'
import './Map.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { MarkerContainer } from "../marker/MarkerContainer";
import { useEffect, useState, useContext } from "react";
import {
  defaultIconMarker,
  withResultsIconMarker,
  editableIconMarker,
  newIconMarker,
  maeGreenIcon,
  maeRedIcon,
  maeLightRedIcon,
  editableWithResultsIconMarker
} from "./utils/constants";
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
import { UserContext } from "../../App";

export const Map = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [markers, setMarkers] = useState([]);
  const [mapPosition, setMapPosition] = useState(
    {
      lat: 45.50,
      lng: -73.61,
      zoom: 10,
    });

  useEffect(() => {
    window.history.pushState("", document.title, window.location.pathname);
    fetch("/map/markers")
      .then(res => res.json())
      .then((json) => setMarkers(json.markers))
  }, [mapPosition]);

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng)
      }
    });

    return position === null ? null : (
      <MarkerContainer
        position={position}
        marker={null}
        mapPosition={mapPosition}
        setMapPosition={setMapPosition}
        icon={newIconMarker}
        typeMarker="new" />
    )
  }

  return (
    <MapContainer center={[mapPosition.lat, mapPosition.lng]} zoom={mapPosition.zoom}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      />
      {user && <LocationMarker />}
      {markers.map((marker, i) =>
      (
        <MarkerContainer
          key={i}
          i={i}
          icon={
            user ?
              marker.userId === user._id ?
                marker.resultats.disponibles ?
                  editableWithResultsIconMarker :
                  editableIconMarker :
                marker.resultats.disponibles ?
                  withResultsIconMarker :
                  defaultIconMarker :
              marker.resultats.disponibles ?
                withResultsIconMarker :
                defaultIconMarker
          }
          position={[marker.coordonnees.latitude, marker.coordonnees.longitude]}
          marker={marker}
          mapPosition={mapPosition}
          setMapPosition={setMapPosition}
          typeMarker="old"
        />
      ))}
    </MapContainer>
  )
}
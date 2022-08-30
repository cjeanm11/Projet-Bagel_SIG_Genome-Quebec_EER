import L from "leaflet";

import icon from 'leaflet/dist/images/marker-icon.png';

import iconShadow from 'leaflet/dist/images/marker-icon.png';

export const withResultsIconMarker = L.icon({
  iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=info|69fe93",
});
export const defaultIconMarker = L.icon({
  iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|69fe93&chf=a,s,ee00FFFF",
});
export const editableIconMarker = L.icon({
  iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ec1c24&chf=a,s,ee00FFFF",
});
export const editableWithResultsIconMarker = L.icon({
  iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=info|ec1c24",
});
export const newIconMarker = L.icon({
  iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|eb797d&chf=a,s,ee00FFFF",
});
export const maeGreenIcon = L.icon({
  iconUrl: "./maeGreenIcon.png",
  iconSize: [38, 95], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
export const maeRedIcon = L.icon({
  iconUrl: "./maeRedIcon.png",
});
export const maeLightRedIcon = L.icon({
  iconUrl: "./maeLightRedIcon.png",
});

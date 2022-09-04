import { Marker, Popup, useMap } from "react-leaflet";
import { useContext, useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import './MarkerContainer.css'
import { IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { CustomCard } from "./utils/utils";
import AddMarkerModal from "../modals/addMarkerModal/AddMarkerModal";
import FAQModal from "../modals/faqModal/FAQModal";
import ViewMarkerModal from "../modals/viewMarkerModal/ViewMarkerModal";
import ViewResultsModal from "../modals/viewResultsModal/ViewResultsModal";
import AddResultsModal from "../modals/addResultsModal/AddResultsModal";
import UpdateMarkerModal from "../modals/updateMarkerModal/UpdateMarkerModal";
import DeleteMarkerModal from "../modals/deleteMarkerModal/DeleteMarkerModal";
import { editableIconMarker, editableWithResultsIconMarker } from "../map/utils/constants";
import { UserContext } from "../../App";

export const MarkerContainer = (props) => {
  const [user, setUser] = useContext(UserContext);
  const marker = props.marker;
  const markerRef = useRef();

  useEffect(() => {
    props.typeMarker === "new" && markerRef.current.openPopup()
  });

  const isMarkerCreatedByStudentOfTeacher = () => {
    return (
      user && user.role === "Enseignant" &&
      marker.user.centreDeServicesScolaire === user.centreDeServicesScolaire &&
      marker.user.ecole === user.ecole &&
      marker.user.niveauScolaire === user.niveauScolaire
    )
  }

  const isAdmin = () => {
    return user && user.role === "Admin"
  }

  return (
    <Marker
      key={props.i}
      icon={
        props.typeMarker === "old" ?
          isMarkerCreatedByStudentOfTeacher() || isAdmin() ?
            marker.resultats.disponibles ?
              editableWithResultsIconMarker :
              editableIconMarker :
            props.icon :
          props.icon
      }
      draggable={props.typeMarker === "new"}
      title={props.typeMarker === "old" ?
        "Cliquez sur le marqueur pour voir les données"
        :
        "Déplacez le marqueur en maintenant le clic dessus"}
      color
      position={props.position}
      marker={marker}
      ref={markerRef}
    >
      <Popup autoPan={false}>
        <Stack direction="row" spacing={3} align='center'>
          {props.typeMarker === "new" &&
            <Tooltip label='Ajouter une étiquette' zIndex={0} >
              <CustomCard>
                <AddMarkerModal
                  position={props.position}
                  mapPosition={props.mapPosition}
                  setMapPosition={props.setMapPosition}
                  markerRef={markerRef}
                />
              </CustomCard>
            </Tooltip>
          }
          {props.typeMarker === "old" &&
            <Tooltip label="Voir l'étiquette" >
              <CustomCard>
                <ViewMarkerModal marker={marker} />
              </CustomCard>
            </Tooltip>
          }
          {props.typeMarker === "old" && marker.resultats.disponibles &&
            <Tooltip label="Voir le résultat des analyses" >
              <CustomCard>
                <ViewResultsModal marker={marker} />
              </CustomCard>
            </Tooltip>
          }
          {props.typeMarker === "old" && user && !marker.resultats.disponibles &&
            (marker.userId === user._id ||
              user.role === "Admin" ||
              isMarkerCreatedByStudentOfTeacher()) &&
            <Tooltip label="Ajouter le résultat des analyses">
              <CustomCard>
                <AddResultsModal
                  marker={marker}
                  mapPosition={props.mapPosition}
                  setMapPosition={props.setMapPosition}
                />
              </CustomCard>
            </Tooltip>
          }
          {props.typeMarker === "old" && user &&
            (isAdmin() || (!marker.resultats.disponibles &&
              (marker.userId === user._id || isMarkerCreatedByStudentOfTeacher()))) &&
            <Tooltip label="Modifier l'étiquette">
              <CustomCard>
                <UpdateMarkerModal
                  marker={marker}
                  mapPosition={props.mapPosition}
                  setMapPosition={props.setMapPosition}
                />
              </CustomCard>
            </Tooltip>
          }
          {props.typeMarker === "old" && user &&
            (isAdmin() || (!marker.resultats.disponibles &&
              (marker.userId === user._id || isMarkerCreatedByStudentOfTeacher()))) &&
            <Tooltip label="Supprimer l'étiquette">
              <CustomCard>
                <DeleteMarkerModal
                  marker={marker}
                  mapPosition={props.mapPosition}
                  setMapPosition={props.setMapPosition}
                />
              </CustomCard>
            </Tooltip>
          }
          {props.typeMarker === "new" &&
            <Tooltip label='Questions?' >
              <CustomCard  >
                <FAQModal />
              </CustomCard>
            </Tooltip>
          }
        </Stack>
      </Popup>
    </Marker>
  )
}

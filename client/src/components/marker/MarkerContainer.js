import { Marker, Popup, useMap } from "react-leaflet";
import React from 'react'
import 'leaflet/dist/leaflet.css'
import { AddIcon, DeleteIcon, EmailIcon, PhoneIcon, QuestionOutlineIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import './MarkerContainer.css'
import { IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { CustomCard } from "./utils/utils";
import AddMarkerModal from "../modals/addMarkerModal/AddMarkerModal";
import QuestionModal from "../modals/questionModal/QuestionModal";

export const MarkerContainer = (props) => {
  function handleOnClick() {
    console.log("dewd")
  }

  return (
    <Marker key={props.i} color position={props.marker.latlng} icon={props.icon} onClick={handleOnClick}>
      <Popup autoPan={false} >
        <Stack direction="row" spacing={3} align='center'>
          <Tooltip label='Ajouter une étiquette' zIndex={0} >
            <CustomCard>
              <AddMarkerModal position={props.marker}/>
            </CustomCard>
          </Tooltip>
          {props.typeMarker === "old" &&
            <Tooltip label="Visionner l'étiquette"  >
              <CustomCard>
                <IconButton
                  variant='outline'
                  colorScheme='teal'
                  aria-label='Search database' icon={<ViewIcon />} />
              </CustomCard>
            </Tooltip>
          }
          <div>
            <Tooltip style={{ opacity: "0" }} label='Questions?' opacity={0} >
              <CustomCard  >
                <QuestionModal />
              </CustomCard>
            </Tooltip>
          </div>
          {props.typeMarker === "old" &&
            <Tooltip label="Supprimer l'étiquette">
              <CustomCard>
                <IconButton
                  variant='outline'
                  colorScheme='teal'
                  aria-label='Send email'
                  disabled={true}
                  icon={<DeleteIcon />}
                />
              </CustomCard>
            </Tooltip>
          }
        </Stack>

      </Popup>
    </Marker>

  )
}

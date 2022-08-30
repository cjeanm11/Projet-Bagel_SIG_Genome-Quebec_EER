import {
  Button, Center, Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack, Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useDisclosure, useToast
} from "@chakra-ui/react";
import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router';
import { DeleteIcon } from "@chakra-ui/icons";
import { BsCloudSun, BsCloudyFill, BsCloudRainFill, BsSun } from "react-icons/bs";
import { UserContext } from "../../../App";
import { marker } from "leaflet";

export default function DeleteMarkerModal(props) {
  const [user, setUser] = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior] = useState('outside')
  const toast = useToast()
  const navigate = useNavigate();

  const btnRef = useRef(null)

  const url = "http://localhost:5000";
  const handleClick = (event) => {
    event.preventDefault(); // prevent page reload
    fetch(url + "/map/markers/" + props.marker._id, { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          toast({
            title: "L'étiquette a été supprimé avec succés.",
            // description: "Merci de votre contribution",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: "top"
          })
          onClose();
          props.setMapPosition({
            lat: props.marker.coordonnees.latitude,
            lng: props.marker.coordonnees.longitude,
            zoom: 10,
          });
        } else {
          alert(json.message);
        }
      });
  }


  return (
    <>
      <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Call Segun'
        icon={<DeleteIcon />}
        mt={1} style={{ flex: 12 }} textAlign={'left'} ref={btnRef} onClick={onOpen}>

      </IconButton>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size={'4xl'}
      >
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Êtes-vous sûr de vouloir supprimer cet étiquette ?</ModalHeader>
          <ModalFooter>
            <Stack pr={4} direction={'row'}>
              <Button
                mr={4}
                colorScheme='teal'
                onClick={handleClick}
              >
                Supprimer
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </Stack>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}

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
import { AddIcon } from "@chakra-ui/icons";
import './AddMarkerModal.css'
import { BsCloudSun, BsCloudyFill, BsCloudRainFill, BsSun } from "react-icons/bs";
import { UserContext } from "../../../App";

export default function AddMarkerModal(props) {
  const [user, setUser] = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior] = useState('outside')
  const toast = useToast()
  const navigate = useNavigate();

  const btnRef = useRef(null)
  const coursDeauRef = useRef();
  const dateDechantillonageRef = useRef();
  const sourcesDeContaminationRef = useRef();

  const [ciel, setCiel] = useState("");
  const [berges, setBerges] = useState("");
  const [couleurDeau, setCouleurDeau] = useState("");
  const [fondDeau, setFondDeau] = useState("");
  const [quantiteDalgues, setQuantiteDalgues] = useState("");

  const url = "http://localhost:5000";
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    const markerToAdd = {
      userId: user._id,
      latlng: {
        latitude: props.position.lat,
        longitude: props.position.lng
      },
      coursDeau: coursDeauRef.current.value,
      dateDechantillonage: dateDechantillonageRef.current.value,
      ciel: ciel,
      berges: berges,
      couleurDeau: couleurDeau,
      fondDeau: fondDeau,
      quantiteDalgues: quantiteDalgues,
      sourcesDeContamination: sourcesDeContaminationRef.current.value
    };
    fetch(url + "/map/markers", {
      method: "POST",
      body: JSON.stringify({
        markerToAdd: markerToAdd
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          toast({
            title: 'Votre étiquette a été enregistré dans le système.',
            description: "Elle est présentement en attente d'approbation.",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: "bottom"
          })
          onClose();
          // navigate("/map");
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
        icon={<AddIcon />}
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
        <ModalContent
          as="form"
          onSubmit={handleSubmit}
        >
          <ModalHeader>Ajouter un étiquette</ModalHeader>
          <ModalCloseButton />

          <ModalBody>

            <FormControl isRequired>
              <Stack direction={'row'} height='50px' >
                <FormLabel mb={4} pt={2} fontSize={18} >Site d'échantillonage :</FormLabel>

                <Stack shouldWrapChildren direction='row' >
                  <Input
                    placeHolder="Entrez ici..."
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    ref={coursDeauRef}
                  />
                </Stack>
              </Stack>

              <br />
              <Divider orientation='horizontal' />
              <br />

              <Stack direction={'row'} height='50px' >
                <FormLabel mb={4} pt={2} fontSize={18} >Date d'échantillonage:</FormLabel>
                <Stack shouldWrapChildren direction='row' >
                  <Input
                    placeHolder="Cliquez pour choisir une date"
                    size="md"
                    backgroundColor="#ffffff"
                    type="date"
                    ref={dateDechantillonageRef}
                  />
                </Stack>
              </Stack>

              <br />
              <Divider orientation='horizontal' />
              <br />
              <FormLabel mb={4} fontSize={18} as='legend'>Le ciel est plutôt :</FormLabel>
              <RadioGroup defaultValue='Itachi' >
                <HStack spacing='24px' onChange={(event) => {
                  setCiel(event.target.value);
                }}>
                  <Radio value='Pluvieux'>Pluvieux</Radio><Icon boxSize={6} as={BsCloudRainFill} />
                  <Radio value='Nuageux'>Nuageux</Radio><Icon boxSize={6} as={BsCloudyFill} />
                  <Radio value='Ensoleillé avec nuages'>Ensoleillé avec nuages</Radio><Icon boxSize={6} as={BsCloudSun} />
                  <Radio value='Ensoleillé'>Ensoleillé</Radio><Icon boxSize={6} as={BsSun} />
                </HStack>
              </RadioGroup>
              <br />
              <Divider orientation='horizontal' />
              <br />
              <FormLabel mb={4} fontSize={18} as='legend'>Les berges sont plutôt :</FormLabel>
              <RadioGroup defaultValue='Itachi' >
                <HStack spacing='10px' onChange={(event) => {
                  setBerges(event.target.value);
                }}>
                  <Radio value='Sablonneuses'>Sablonneuses</Radio>
                  <Radio value='Rocailleuses'>Rocailleuses</Radio>
                  <Radio value='Herbeuses'>Herbeuses</Radio>
                  <Radio value='Végétalisées'>Végétalisées</Radio>
                </HStack>
              </RadioGroup>
              <br />
              <Divider orientation='horizontal' />
              <br />
              <FormLabel mb={4} fontSize={18} as='legend'>L’eau du cours d’eau est :</FormLabel>
              <RadioGroup defaultValue='Itachi' >
                <HStack spacing='10px' onChange={(event) => {
                  setCouleurDeau(event.target.value);
                }}>
                  <Radio value='Brune'>Brune</Radio>
                  <Radio value='Jaune'>Jaune</Radio>
                  <Radio value='Boueuse / Avec sédiments'>Boueuse / avec sédiments</Radio>
                  <Radio value='Claire / Transparente'>Claire / transparente</Radio>
                </HStack>
              </RadioGroup>
              <br />
              <Divider orientation='horizontal' />
              <br />
              <FormLabel mb={4} fontSize={18} as='legend'>Le fond du cours d’eau est constitué de : :</FormLabel>
              <RadioGroup defaultValue='Itachi' >
                <HStack spacing='10px' onChange={(event) => {
                  setFondDeau(event.target.value);
                }}>
                  <Radio value='Gravier'>Gravier</Radio>
                  <Radio value='Sable'>Sable</Radio>
                  <Radio value='Vase / Argile / Boue / Glaise'>Vase / Argile / Boue / Glaise</Radio>
                  <Radio value="Je ne vois pas le fond du cours d'eau">Je ne vois pas le fond du cours d'eau</Radio>
                </HStack>
              </RadioGroup>
              <br />
              <Divider orientation='horizontal' />
              <br />
              <FormLabel mb={4} fontSize={18} as='legend'>La quantité d'algues est :</FormLabel>
              <RadioGroup defaultValue='Itachi' >
                <HStack spacing='10px' onChange={(event) => {
                  setQuantiteDalgues(event.target.value);
                }}>
                  <Radio value='Très faible'>Très faible</Radio>
                  <Radio value='Faible'>Faible</Radio>
                  <Radio value='Moyenne'>Moyenne</Radio>
                  <Radio value="Importante">Importante</Radio>
                </HStack>
              </RadioGroup>
              <br />
              <Divider orientation='horizontal' />
              <br />
              <FormLabel mb={4} fontSize={18} as='legend'>Les sources de contamination possibles sont :</FormLabel>
              <Stack>
                <Select ref={sourcesDeContaminationRef} placeholder="Choisissez l'une des options ci-dessous:">
                  <option value="Pollution près ou dans le cours d'eau">Pollution près ou dans le cours d'eau</option>
                  <option value="Résidences à proximité ou routes">Résidences à proximité ou routes</option>
                  <option value="Pollution d'origine industrielle">Pollution d'origine industrielle</option>
                  <option value="Pollution d'origine agricole">Pollution d'origine agricole</option>
                </Select>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
          </ModalBody>
          <ModalFooter>
            <Stack pr={4} direction={'row'}>
              <Button
                mr={4}
                colorScheme='teal'
                type='submit'
              // onClick={handleOnClick}
              >
                Submit
              </Button>
              <Button onClick={onClose}>Fermer</Button>
            </Stack>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}

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
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useDisclosure,
  useToast,
  Checkbox,
  CheckboxGroup
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
  const [coursDeau, setCoursDeau] = useState("");
  const [dateDechantillonage, setDateDechantillonage] = useState(null);
  const [ciel, setCiel] = useState("");
  const [berges, setBerges] = useState("");
  const [couleurDeau, setCouleurDeau] = useState("");
  const [fondDeau, setFondDeau] = useState("");
  const [quantiteDalgues, setQuantiteDalgues] = useState("");
  const [sourcesDeContamination, setSourcesDeContamination] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    const markerToAdd = {
      userId: user._id,
      coordonnees: {
        latitude: props.position.lat,
        longitude: props.position.lng
      },
      coursDeau: coursDeau,
      // dateDechantillonage: dateDechantillonage,
      // ciel: ciel,
      // berges: berges,
      // couleurDeau: couleurDeau,
      // fondDeau: fondDeau,
      // quantiteDalgues: quantiteDalgues,
      // sourcesDeContamination: sourcesDeContamination
    };
    fetch("/map/markers", {
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
            title: 'Votre étiquette a été enregistrée avec succès.',
            description: "Merci de votre contribution",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
          onClose();
          props.setMapPosition({
            lat: props.position.lat,
            lng: props.position.lng,
            zoom: 10,
          });
        } else {
          toast({
            title: 'Erreur lors de la sauvegarde de votre étiquette',
            description: json.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
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
          <ModalHeader
            fontWeight="bold"
            fontSize="2xl"
            background='teal'
            color="white"
            textAlign="center"
          >
            Ajouter une étiquette
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <Stack direction={'row'} height='50px' mt={4}>
                <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Site d'échantillonage / Cours d'eau :</FormLabel>
                <Stack direction='row' >
                  <Input
                    placeholder="Entrez ici..."
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    value={coursDeau}
                    onChange={(event) => {
                      setCoursDeau(event.target.value);
                    }} />
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            {/* <FormControl isRequired>
              <Stack direction={'row'} height='50px' >
                <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Date d'échantillonage:</FormLabel>
                <Stack direction='row' >
                  <Input
                    placeholder="Cliquez pour choisir une date"
                    size="md"
                    backgroundColor="#ffffff"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    value={dateDechantillonage}
                    onChange={(event) => {
                      setDateDechantillonage(event.target.value);
                    }} />
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl isRequired>
              <FormLabel fontWeight="semibold" mb={4} fontSize={18} as='legend'>Le ciel est plutôt :</FormLabel>
              <RadioGroup defaultValue={ciel} colorScheme='teal' >
                <HStack spacing={10} onChange={(event) => {
                  setCiel(event.target.value);
                }}>
                  <Radio value='Pluvieux'><Icon boxSize={6} as={BsCloudRainFill} />{' '}Pluvieux</Radio>
                  <Radio value='Nuageux'><Icon boxSize={6} as={BsCloudyFill} />{' '}Nuageux </Radio>
                  <Radio value='Ensoleillé avec nuages'><Icon boxSize={6} as={BsCloudSun} />{' '}Ensoleillé avec nuages</Radio>
                  <Radio value='Ensoleillé'><Icon boxSize={6} as={BsSun} />{' '}Ensoleillé</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl isRequired>
              <FormLabel fontWeight="semibold" mb={4} fontSize={18} as='legend'>Les berges sont plutôt :</FormLabel>
              <RadioGroup defaultValue={berges} colorScheme='teal' >
                <HStack spacing={10} onChange={(event) => {
                  setBerges(event.target.value);
                }}>
                  <Radio value='Sablonneuses'>Sablonneuses</Radio>
                  <Radio value='Rocailleuses'>Rocailleuses</Radio>
                  <Radio value='Herbeuses'>Herbeuses</Radio>
                  <Radio value='Végétalisées'>Végétalisées</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl isRequired>
              <FormLabel fontWeight="semibold" mb={4} fontSize={18} as='legend'>L’eau du cours d’eau est :</FormLabel>
              <RadioGroup defaultValue={couleurDeau} colorScheme='teal' >
                <HStack spacing={10} onChange={(event) => {
                  setCouleurDeau(event.target.value);
                }}>
                  <Radio value='Brune'>Brune</Radio>
                  <Radio value='Jaune'>Jaune</Radio>
                  <Radio value='Boueuse / Avec sédiments'>Boueuse / avec sédiments</Radio>
                  <Radio value='Claire / Transparente'>Claire / transparente</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl isRequired>
              <FormLabel fontWeight="semibold" mb={4} fontSize={18} as='legend'>Le fond du cours d’eau est constitué de : :</FormLabel>
              <RadioGroup defaultValue={fondDeau} colorScheme='teal' >
                <HStack spacing={10} onChange={(event) => {
                  setFondDeau(event.target.value);
                }}>
                  <Radio value='Gravier'>Gravier</Radio>
                  <Radio value='Sable'>Sable</Radio>
                  <Radio value='Vase / Argile / Boue / Glaise'>Vase / Argile / Boue / Glaise</Radio>
                  <Radio value="Je ne vois pas le fond du cours d'eau">Je ne vois pas le fond du cours d'eau</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl isRequired>
              <FormLabel fontWeight="semibold" mb={4} fontSize={18} as='legend'>La quantité d'algues est :</FormLabel>
              <RadioGroup defaultValue={quantiteDalgues} colorScheme='teal' >
                <HStack spacing={10} onChange={(event) => {
                  setQuantiteDalgues(event.target.value);
                }}>
                  <Radio value='Très faible'>Très faible</Radio>
                  <Radio value='Faible'>Faible</Radio>
                  <Radio value='Moyenne'>Moyenne</Radio>
                  <Radio value="Importante">Importante</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl >
              <FormLabel fontWeight="semibold" mb={4} fontSize={18} as='legend'>Les sources de contamination possibles sont :</FormLabel>
              <CheckboxGroup defaultValue={sourcesDeContamination} colorScheme='teal'>
                <Stack spacing={5} direction={'row'} onChange={(event) => {
                  if (sourcesDeContamination.includes(event.target.value)) {
                    setSourcesDeContamination(sourcesDeContamination.filter(sdc => {
                      return sdc !== event.target.value;
                    }));
                  }
                  else {
                    sourcesDeContamination.push(event.target.value)
                    setSourcesDeContamination(sourcesDeContamination);
                  }
                }}>
                  <Checkbox value="Pollution près ou dans le cours d'eau">Pollution près ou dans le cours d'eau</Checkbox>
                  <Checkbox value="Résidences à proximité ou routes">Résidences à proximité ou routes</Checkbox>
                  <Checkbox value="Pollution d'origine industrielle">Pollution d'origine industrielle</Checkbox>
                  <Checkbox value="Pollution d'origine agricole">Pollution d'origine agricole</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br /> */}
          </ModalBody>
          <ModalFooter>
            <Stack pr={4} direction={'row'}>
              <Button
                mr={4}
                colorScheme='teal'
                type='submit'
              >
                Enregistrer
              </Button>
              <Button onClick={onClose}>Fermer</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

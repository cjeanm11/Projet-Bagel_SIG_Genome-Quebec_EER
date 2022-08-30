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
  CheckboxGroup,
  Heading
} from "@chakra-ui/react";
import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { BsCloudSun, BsCloudyFill, BsCloudRainFill, BsSun } from "react-icons/bs";
import { UserContext } from "../../../App";

export default function AddMarkerModal(props) {
  const [user, setUser] = useContext(UserContext);
  const marker = props.marker;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior] = useState('outside')
  const toast = useToast()
  const navigate = useNavigate();

  const btnRef = useRef(null)
  const [macroinvertebres, setMacroinvertebres] = useState([""]);
  const [microorganismes, setMicroorganismes] = useState({
    bacteries: "",
    protistes: "",
    archees: ""
  });
  const [poissons, setPoissons] = useState([""]);
  const [decouvertesCocasses, setDecouvertesCocasses] = useState([""]);

  const removeEmptyStringsFromArray = (array) => {
    return array.filter(element => {
      return element !== "";
    });
  };
  
  const url = "http://localhost:5000";
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    
    const results = {
      disponibles: true,
      macroinvertebres: removeEmptyStringsFromArray(macroinvertebres),
      microorganismes: microorganismes,
      poissons: removeEmptyStringsFromArray(poissons),
      decouvertesCocasses: removeEmptyStringsFromArray(decouvertesCocasses)
    };
    
    fetch(url + "/map/markers/results", {
      method: "POST",
      body: JSON.stringify({
        markerId: marker._id,
        results: results
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          toast({
            title: 'Les résultats ont été enregistrés avec succès.',
            description: "Merci de votre contribution",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
          onClose();
          // Replace with map.flyTo([position.latitude, position.longitude], zoom)
          props.setMapPosition({
            lat: marker.coordonnees.latitude,
            lng: marker.coordonnees.longitude,
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
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader
            fontWeight="bold"
            fontSize="2xl"
            background='teal'
            color="white"
            textAlign="center"
            mb={4}
          >
            Ajouter les résultats
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
              <Stack direction={'row'}>
                <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Macroinvertebrés :</FormLabel>
                <Stack>
                  {macroinvertebres.map((macroinvertebre, index) =>
                  (
                    <HStack spacing={5} key={index}>
                      <Input
                        placeholder="Entrez ici..."
                        size="md"
                        backgroundColor="#ffffff"
                        type="text"
                        value={macroinvertebre}
                        onChange={event => {
                          let mi = [...macroinvertebres];
                          mi[index] = event.target.value;
                          setMacroinvertebres(mi);
                        }}
                      />
                      <IconButton
                        variant='outline'
                        colorScheme='gray'
                        icon={<DeleteIcon />}
                        mt={1} style={{ flex: 12 }} textAlign={'left'}
                        onClick={event => {
                          let mi = [...macroinvertebres];
                          mi.splice(index, 1);
                          setMacroinvertebres(mi);
                        }}
                      />
                    </HStack>
                  ))}
                  <IconButton
                    variant='outline'
                    colorScheme='gray'
                    icon={<AddIcon />}
                    mt={1} style={{ flex: 12 }} textAlign={'left'}
                    onClick={event => {
                      let mi = [...macroinvertebres];
                      mi.push("")
                      setMacroinvertebres(mi);
                    }}
                  />
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl >
              <Heading fontWeight="semibold" mb={4} fontSize={20} textAlign="left">Micro-organismes</Heading>
              <Stack direction={'row'}>
                <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Bactéries :</FormLabel>
                <Stack direction='row' >
                  <Input
                    placeholder="Entrez ici..."
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    value={microorganismes.bacteries}
                    onChange={(event) => {
                      setMicroorganismes(values =>
                        ({ ...values, bacteries: event.target.value }));
                    }} />
                </Stack>
              </Stack>
              <Stack direction={'row'}>
                <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Protistes :</FormLabel>
                <Stack direction='row' >
                  <Input
                    placeholder="Entrez ici..."
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    value={microorganismes.protistes}
                    onChange={(event) => {
                      setMicroorganismes(values =>
                        ({ ...values, protistes: event.target.value }));
                    }} />
                </Stack>
              </Stack>
              <Stack direction={'row'}>
                <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Archées :</FormLabel>
                <Stack direction='row' >
                  <Input
                    placeholder="Entrez ici..."
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    value={microorganismes.archees}
                    onChange={(event) => {
                      setMicroorganismes(values =>
                        ({ ...values, archees: event.target.value }));
                    }} />
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl >
              <Stack direction={'row'}>
                <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Poissons :</FormLabel>
                <Stack>
                  {poissons.map((poisson, index) =>
                  (
                    <HStack spacing={5} key={index}>
                      <Input
                        placeholder="Entrez ici..."
                        size="md"
                        backgroundColor="#ffffff"
                        type="text"
                        value={poisson}
                        onChange={event => {
                          let p = [...poissons];
                          p[index] = event.target.value;
                          setPoissons(p);
                        }}
                      />
                      <IconButton
                        variant='outline'
                        colorScheme='gray'
                        icon={<DeleteIcon />}
                        mt={1} style={{ flex: 12 }} textAlign={'left'}
                        onClick={event => {
                          let p = [...poissons];
                          p.splice(index, 1);
                          setPoissons(p);
                        }}
                      />
                    </HStack>
                  ))}
                  <IconButton
                    variant='outline'
                    colorScheme='gray'
                    icon={<AddIcon />}
                    mt={1} style={{ flex: 12 }} textAlign={'left'}
                    onClick={event => {
                      let p = [...poissons];
                      p.push("")
                      setPoissons(p);
                    }}
                  />
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl >
              <Stack direction={'row'}>
                <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Découvertes cocasses :</FormLabel>
                <Stack>
                  {decouvertesCocasses.map((decouvertesCocasse, index) =>
                  (
                    <HStack spacing={5} key={index}>
                      <Input
                        placeholder="Entrez ici..."
                        size="md"
                        backgroundColor="#ffffff"
                        type="text"
                        value={decouvertesCocasse}
                        onChange={event => {
                          let dc = [...decouvertesCocasses];
                          dc[index] = event.target.value;
                          setDecouvertesCocasses(dc);
                        }}
                      />
                      <IconButton
                        variant='outline'
                        colorScheme='gray'
                        icon={<DeleteIcon />}
                        mt={1} style={{ flex: 12 }} textAlign={'left'}
                        onClick={event => {
                          let dc = [...decouvertesCocasses];
                          dc.splice(index, 1);
                          setDecouvertesCocasses(dc);
                        }}
                      />
                    </HStack>
                  ))}
                  <IconButton
                    variant='outline'
                    colorScheme='gray'
                    icon={<AddIcon />}
                    mt={1} style={{ flex: 12 }} textAlign={'left'}
                    onClick={event => {
                      let dc = [...decouvertesCocasses];
                      dc.push("")
                      setDecouvertesCocasses(dc);
                    }}
                  />
                </Stack>
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

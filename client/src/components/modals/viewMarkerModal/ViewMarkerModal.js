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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useDisclosure, useToast
} from "@chakra-ui/react";
import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ViewIcon } from "@chakra-ui/icons";
import { BsCloudSun, BsCloudyFill, BsCloudRainFill, BsSun } from "react-icons/bs";
import { UserContext } from "../../../App";

export default function ViewMarkerModal(props) {
  const marker = props.marker;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior] = useState('outside')
  const navigate = useNavigate();

  const btnRef = useRef(null)
  const fondDeauRef = useRef(marker.fondDeau);

  return (
    <>
      <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Call Segun'
        icon={<ViewIcon />}
        mt={1} style={{ flex: 12 }} textAlign={'left'} ref={btnRef} onClick={onOpen}>

      </IconButton>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size={'2xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight="bold"
            fontSize="2xl"
            background='teal'
            color="white"
            textAlign="center"
          >
            Données de l'étiquette
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='row' mt={4} >
              <Center height='50px'>
                <FormLabel mt={2} fontSize={18}  >Latitude :</FormLabel>
                <NumberInput size='md' maxW={40} defaultValue={marker.coordonnees.latitude} >
                  <NumberInputField fontWeight="bold" borderColor="grey" readOnly />
                </NumberInput>
                <Divider ml={12} orientation='vertical' />
                <FormLabel mt={2} fontSize={18} ml={12} >Longitude :</FormLabel>
                <NumberInput size='md' maxW={40} defaultValue={marker.coordonnees.longitude} >
                  <NumberInputField fontWeight="bold" borderColor="grey" readOnly />
                </NumberInput>
              </Center>
            </Stack>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <Stack direction={'row'} height='50px' >
              <FormLabel mb={4} pt={2} fontSize={18} fontWeight="" >Site d'échantillonage / Cours d'eau :</FormLabel>

              <Stack direction='row' >
                <Input
                  placeholder="Entrez ici..."
                  size="md"
                  backgroundColor="#ffffff"
                  type="text"
                  fontWeight="bold"
                  borderColor="grey"
                  value={marker.coursDeau}
                  width={'auto'}
                  readOnly
                />
              </Stack>
            </Stack>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <Stack direction={'row'} height='50px' >
              <FormLabel mb={4} pt={2} fontSize={18} >Date d'échantillonage:</FormLabel>
              <Stack direction='row' >
                <Input
                  size="md"
                  backgroundColor="#ffffff"
                  type="text"
                  fontWeight="bold"
                  borderColor="grey"
                  width={'auto'}
                  value={marker.dateDechantillonage.split("T")[0]}
                  readOnly
                />
              </Stack>
            </Stack>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <Stack direction={'row'} height='50px' >
              <FormLabel mb={4} pt={2} fontSize={18} as='legend'>Le ciel est plutôt :</FormLabel>
              <Stack direction='row' >
                <Input
                  size="md"
                  backgroundColor="#ffffff"
                  type="text"
                  fontWeight="bold"
                  borderColor="grey"
                  value={marker.ciel}
                  // width={'auto'}
                  readOnly
                />
              </Stack>
            </Stack>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <Stack direction={'row'} height='50px' >
              <FormLabel mb={4} pt={2} fontSize={18} as='legend'>Les berges sont plutôt :</FormLabel>
              <Stack direction='row' >
                <Input
                  size="md"
                  backgroundColor="#ffffff"
                  type="text"
                  fontWeight="bold"
                  borderColor="grey"
                  value={marker.berges}
                  // width={'auto'}
                  readOnly
                />
              </Stack>
            </Stack>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <Stack direction={'row'} height='50px' >
              <FormLabel mb={4} pt={2} fontSize={18} as='legend'>L’eau du cours d’eau est :</FormLabel>
              <Stack direction='row' >
                <Input
                  size="md"
                  backgroundColor="#ffffff"
                  type="text"
                  fontWeight="bold"
                  borderColor="grey"
                  value={marker.couleurDeau}
                  // width={'auto'}
                  readOnly
                />
              </Stack>
            </Stack>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <Stack direction={'row'} height='50px' >
              <FormLabel mb={4} pt={2} fontSize={18} as='legend'>Le fond du cours d’eau est constitué de :</FormLabel>
              <Stack direction='row' >
                <Input
                  size="md"
                  backgroundColor="#ffffff"
                  type="text"
                  fontWeight="bold"
                  borderColor="grey"
                  width="2xs"
                  value={marker.fondDeau}
                  readOnly
                />
              </Stack>
            </Stack>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <Stack direction={'row'} height='50px' >
              <FormLabel mb={4} pt={2} fontSize={18} as='legend'>La quantité d'algues est :</FormLabel>
              <Stack direction='row' >
                <Input
                  size="md"
                  backgroundColor="#ffffff"
                  type="text"
                  fontWeight="bold"
                  borderColor="grey"
                  value={marker.quantiteDalgues}
                  readOnly
                />
              </Stack>
            </Stack>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormLabel mb={4} fontSize={18} as='legend'>Les sources de contamination possibles sont :</FormLabel>
            <Stack>
              {marker.sourcesDeContamination.length === 0 ?
                <Input
                  size="md"
                  backgroundColor="#ffffff"
                  type="text"
                  fontWeight="bold"
                  borderColor="grey"
                  value="Aucune"
                  readOnly
                />
                :
                marker.sourcesDeContamination.map((sdc) =>
                  <Input
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    fontWeight="bold"
                    borderColor="grey"
                    value={sdc}
                    readOnly
                  />
                )}
            </Stack>

          </ModalBody>
          <ModalFooter>
            <Button
              mr={4}
              mb={4}
              size="lg"
              colorScheme='teal'
              onClick={onClose}
            >
              Fermer
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}

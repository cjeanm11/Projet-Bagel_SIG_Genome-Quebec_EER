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
import { Icon as Iconify } from '@iconify/react';
import { BsCloudSun, BsCloudyFill, BsCloudRainFill, BsSun } from "react-icons/bs";
import { UserContext } from "../../../App";

export default function AddMarkerModal(props) {
  const [user, setUser] = useContext(UserContext);
  const marker = props.marker;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior] = useState('outside')
  const toast = useToast()
  const navigate = useNavigate();

  const btnRef = useRef(null);

  const macroinvertebres = marker.resultats.macroinvertebres;
  const microorganismes = marker.resultats.microorganismes;
  const poissons = marker.resultats.poissons;
  const decouvertesCocasses = marker.resultats.decouvertesCocasses;

  return (
    <>
      <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Call Segun'
        icon={<Iconify icon="mdi:dna" />}
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
        <ModalContent>
          <ModalHeader
            fontWeight="bold"
            fontSize="2xl"
            background='teal'
            color="white"
            textAlign="center"
            mb={4}
          >
            Résultats des analyses
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
              <Stack direction={'row'}>
                <FormLabel mb={4} pt={2} fontSize={18} >Macroinvertebrés :</FormLabel>
                <Stack>
                  {macroinvertebres.length === 0 ?
                    <Input
                      type="text"
                      size="md"
                      fontWeight="bold"
                      backgroundColor="#ffffff"
                      borderColor="grey"
                      value="Aucune détection"
                      readOnly
                    />
                    :
                    macroinvertebres.map((macroinvertebre) =>
                      <Input
                        type="text"
                        size="md"
                        fontWeight="bold"
                        backgroundColor="#ffffff"
                        borderColor="grey"
                        width="2xl"
                        value={macroinvertebre}
                        readOnly
                      />
                    )}
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl >
              <Heading fontWeight="semibold" mb={4} fontSize={20} textAlign="left">Micro-organismes</Heading>
              <Stack direction={'row'}>
                <FormLabel mb={4} pt={2} fontSize={18} >Bactéries :</FormLabel>
                <Stack direction='row' >
                  <Input
                    fontWeight="bold"
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    borderColor="grey"
                    width="2xl"
                    readOnly
                    value={microorganismes.bacteries || "Aucune détection"}
                  />
                </Stack>
              </Stack>
              <Stack direction={'row'}>
                <FormLabel mb={4} pt={2} fontSize={18} >Protistes :</FormLabel>
                <Stack direction='row' >
                  <Input
                    fontWeight="bold"
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    borderColor="grey"
                    width="2xl"
                    readOnly
                    value={microorganismes.protistes || "Aucune détection"}
                  />
                </Stack>
              </Stack>
              <Stack direction={'row'}>
                <FormLabel mb={4} pt={2} fontSize={18} >Archées :</FormLabel>
                <Stack direction='row' >
                  <Input
                    fontWeight="bold"
                    size="md"
                    backgroundColor="#ffffff"
                    type="text"
                    borderColor="grey"
                    width="2xl"
                    readOnly
                    value={microorganismes.archees || "Aucune détection"}
                  />
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl >
              <Stack direction={'row'}>
                <FormLabel mb={4} pt={2} fontSize={18} >Poissons :</FormLabel>
                <Stack>
                  {poissons.length === 0 ?
                    <Input
                      type="text"
                      size="md"
                      fontWeight="bold"
                      backgroundColor="#ffffff"
                      borderColor="grey"
                      value="Aucune détection"
                      readOnly
                    />
                    :
                    poissons.map((poisson) =>
                      <Input
                        fontWeight="bold"
                        size="md"
                        backgroundColor="#ffffff"
                        type="text"
                        borderColor="grey"
                        width="2xl"
                        readOnly
                        value={poisson}
                      />
                    )}
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
            <FormControl >
              <Stack direction={'row'}>
                <FormLabel mb={4} pt={2} fontSize={18} >Découvertes cocasses :</FormLabel>
                <Stack>
                  {decouvertesCocasses.length === 0 ?
                    <Input
                      type="text"
                      size="md"
                      fontWeight="bold"
                      backgroundColor="#ffffff"
                      borderColor="grey"
                      value="Aucune détection"
                      readOnly
                    />
                    :
                    decouvertesCocasses.map((decouvertesCocasse) =>
                      <Input
                        fontWeight="bold"
                        size="md"
                        backgroundColor="#ffffff"
                        type="text"
                        borderColor="grey"
                        width="2xl"
                        readOnly
                        value={decouvertesCocasse}
                      />
                    )}
                </Stack>
              </Stack>
            </FormControl>
            <br />
            <Divider orientation='horizontal' />
            <br />
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

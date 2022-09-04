import {
  Accordion,
  AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box,
  Button, Container,
  Modal,
  ModalBody, ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
  useDisclosure
} from "@chakra-ui/react";
import { useState, useContext, useRef } from 'react';
import { UserContext } from "../../../App";
import StudentsPanel from "./StudentsPanel";
import ProfilePanel from "./ProfilePanel";

export default function ScrollingModal() {
  const [user, setUser] = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState('outside')

  const btnRef = useRef(null)
  return (
    <>
      <Text mt={1} style={{ flex: 12 }} textAlign={'left'} ref={btnRef} onClick={onOpen}>
        Réglages
      </Text>

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
          >
            Réglages
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs >
              <TabList>
                <Tab fontWeight="bold"> Profil</Tab>
                {user.role === "Enseignant" &&
                  <Tab fontWeight="bold"> Élèves</Tab>
                }
                {/* <Tab> Vue d'ensemble</Tab> */}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ProfilePanel />
                </TabPanel>
                {user.role === "Enseignant" &&
                  <TabPanel>
                    <StudentsPanel />
                  </TabPanel>
                }
                {/* <TabPanel>
                  <Accordion allowMultiple>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box flex='1' textAlign='left'>
                            Section 1 title
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton>
                              <Box flex='1' textAlign='left'>
                                Section 1 title
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat.
                          </AccordionPanel>

                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                </TabPanel> */}
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
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
import { useRef, useState } from 'react';
import AccessCodesPanel from "../../adminDashboardPanels/AccessCodesPanel";
export default function ScrollingModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState('outside')

  const btnRef = useRef(null)
  
  return (
    <>
      <Text mt={1} style={{ flex: 12 }} textAlign={'left'} ref={btnRef} onClick={onOpen}>
        Panneau d'administration
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
            Panneau d'administration
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs >
              <TabList>
                <Tab>Code d'accès</Tab>
                <Tab>Usagers</Tab>
                <Tab>Marqueurs</Tab>
                <Tab>Accordians</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AccessCodesPanel />
                </TabPanel>
                <TabPanel>
                  <p>
                    Usagers
                  </p>
                </TabPanel>
                <TabPanel>
                  <p>
                    Marqueurs
                  </p>
                </TabPanel>
                <TabPanel>
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
                </TabPanel>
              </TabPanels>
            </Tabs>
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
            </Button>          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
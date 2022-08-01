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
import React from 'react';
export default function ScrollingModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState('outside')

    const btnRef = React.useRef(null)
    return (
        <>
            <Text mt={1} style={{flex: 12}} textAlign={'left'} ref={btnRef} onClick={onOpen}>
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
                    <ModalHeader>Réglage</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs >
                            <TabList>
                                <Tab> Profile</Tab>
                                <Tab> Configuration</Tab>
                                <Tab> Vue d'ensemble</Tab>
                            </TabList>

                            <TabPanels>
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
                                <TabPanel>
                                    <p>
                                        Configuration
                                    </p>
                                </TabPanel>
                                <TabPanel>
                                    <p>
                                        Vue d'ensemble
                                    </p>
                                </TabPanel>
                                <TabPanel>
                                    <p>three!</p>
                                </TabPanel>
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
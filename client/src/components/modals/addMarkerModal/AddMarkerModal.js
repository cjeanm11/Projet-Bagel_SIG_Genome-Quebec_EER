import {
    Accordion,
    AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box,
    Button, Container, IconButton,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
    useDisclosure
} from "@chakra-ui/react";
import React from 'react';
import {AddIcon, QuestionOutlineIcon} from "@chakra-ui/icons";
export default function AddMarkerModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState('outside')

    const btnRef = React.useRef(null)
    return (
        <>
                <IconButton
                variant='outline'
                colorScheme='teal'
                aria-label='Call Segun'
                icon={<AddIcon />}
                mt={1} style={{flex: 12}} textAlign={'left'} ref={btnRef} onClick={onOpen}>

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
                    <ModalHeader>Ajouter un étiquette</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>dewd</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Fermer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

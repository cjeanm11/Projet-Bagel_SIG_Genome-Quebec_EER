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
import AccessCodesPanel from "./AccessCodesPanel";
import UsersPanel from "./UsersPanel";
import MarkersPanel from "./MarkersPanel";
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
                <Tab fontWeight="bold">Code d'accès</Tab>
                <Tab fontWeight="bold">Usagers</Tab>
                <Tab fontWeight="bold">Marqueurs</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AccessCodesPanel />
                </TabPanel>
                <TabPanel>
                  <UsersPanel />
                </TabPanel>
                <TabPanel>
                  <MarkersPanel />
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
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
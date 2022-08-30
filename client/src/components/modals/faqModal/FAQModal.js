import {
  Button, Divider, Icon, IconButton, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Text, useDisclosure,
  HStack
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

export default function FAQModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        variant='outline'
        onClick={onOpen}
        colorScheme='teal'
        aria-label='Call Segun'
        icon={<QuestionOutlineIcon />}>
      </IconButton>

      <Modal onClose={onClose} isOpen={isOpen}
        size={'2xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold"
            fontSize="2xl"
            background='teal'
            color="white" >
            <HStack spacing={7}>
              <Icon textAlign="left" />
              <Text textAlign="center">Foire aux questions</Text >
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mt={2}>
            <Text as='strong'>dewdwed wioe diw eid weid? </Text>
            <Divider orientation='vertical' />
            <Text as='em'> - Réponse à la question... </Text>
            <br />
            <br />
            <Divider orientation='horizontal' />
            <Text as='strong'>dewdwed wioe diw eid weid? </Text>
            <Divider orientation='vertical' />
            <Text as='em'> - Réponse à la question... </Text>
            <br />
            <br />
            <Divider orientation='horizontal' />
            <Text as='strong'>dewdwed wioe diw eid weid? </Text>
            <Divider orientation='vertical' />
            <Text as='em'> - Réponse à la question... </Text>
            <br />
            <br />
            <Divider orientation='horizontal' />
            <Text as='strong'>dewdwed wioe diw eid weid? </Text>
            <Divider orientation='vertical' />
            <Text as='em'> - Réponse à la question... </Text>
            <br />
            <br />
            <Divider orientation='horizontal' />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
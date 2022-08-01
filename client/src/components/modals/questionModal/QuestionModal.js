import {
    Button, Divider, Icon, IconButton, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";
import {QuestionOutlineIcon} from "@chakra-ui/icons";

export default function QuestionModal() {
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
                    <ModalHeader  > <Icon  textAlign={'left'} margin={0} padding={0} /><Text insetInline={true} align={'center'}>  Vous avez des questions?   </Text ></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Divider orientation='horizontal' />
                        <Text as='strong'>dewdwed wioe diw eid weid? </Text>
                        <Divider orientation='vertical' />
                        <Text as='em'> - Réponse à la question... </Text>
                        <br/>
                        <br/>
                        <Divider orientation='horizontal' />
                        <Text as='strong'>dewdwed wioe diw eid weid? </Text>
                        <Divider orientation='vertical' />
                        <Text as='em'> - Réponse à la question... </Text>
                        <br/>
                        <br/>
                        <Divider orientation='horizontal' />
                        <Text as='strong'>dewdwed wioe diw eid weid? </Text>
                        <Divider orientation='vertical' />
                        <Text as='em'> - Réponse à la question... </Text>
                        <br/>
                        <br/>
                        <Divider orientation='horizontal' />
                        <Text as='strong'>dewdwed wioe diw eid weid? </Text>
                        <Divider orientation='vertical' />
                        <Text as='em'> - Réponse à la question... </Text>
                        <br/>
                        <br/>
                        <Divider orientation='horizontal' />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
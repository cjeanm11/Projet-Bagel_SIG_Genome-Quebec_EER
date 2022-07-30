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
    ModalOverlay, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    useDisclosure, useToast
} from "@chakra-ui/react";
import React from 'react';
import {AddIcon, } from "@chakra-ui/icons";
import {CgSun} from "react-icons/cg";
import './AddMarkerModal.css'
import {BsCloudSun, BsCloudSunFill} from "react-icons/bs";
import {GiRaining} from "react-icons/gi";
export default function AddMarkerModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior ] = React.useState('outside')
    const toast = useToast()
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

                        <FormControl isRequired>
                            <Stack shouldWrapChildren  direction='row' >
                                <Center height='50px' >
                                    <FormLabel mt={2} fontSize={18}   >Latitude :</FormLabel>
                                    <NumberInput size='md' maxW={32}  defaultValue={15} min={-90} max={90} step={0.0001}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Divider ml={12} orientation='vertical' />
                                    <FormLabel mt={2} fontSize={18}  ml={12} >Longitude :</FormLabel>
                                    <NumberInput size='md' maxW={32}  defaultValue={15} min={-180} max={180}  step={0.0001}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Center>
                            </Stack>

                            <br/>
                            <Divider orientation='horizontal' />
                            <br/>

                            <Stack direction={'row'} height='50px' >
                                <FormLabel mb={4} pt={2} fontSize={18} >Date :</FormLabel>

                                <Stack shouldWrapChildren  direction='row' >
                                <Input
                                    placeHolder="Select Date and Time"
                                    size="md"
                                    backgroundColor="#ffffff"
                                    type="datetime-local"
                                />
                                </Stack>
                            </Stack>

                            <br/>
                            <Divider orientation='horizontal' />
                            <br/>
                            <FormLabel mb={4} fontSize={18} as='legend'>Le ciel est plutôt :</FormLabel>
                            <RadioGroup defaultValue='Itachi'>
                                <HStack spacing='24px'>
                                    <Radio value='Pluvieux'>Pluvieux</Radio><Icon boxSize={6}as={GiRaining}/>
                                    <Radio value='Nuageux'>Nuageux</Radio><Icon boxSize={6} as={BsCloudSunFill}/>
                                    <Radio value='Ensoleillé avec nuages'>Ensoleillé avec nuages</Radio><Icon boxSize={6}  as={BsCloudSun}/>
                                    <Radio value='Ensoleillé'>Ensoleillé</Radio><Icon boxSize={6} as={CgSun}/>
                                </HStack>
                            </RadioGroup>
                            <br/>
                            <Divider orientation='horizontal' />
                            <br/>
                            <FormLabel mb={4} fontSize={18} as='legend'>Les berges sont plutôt :</FormLabel>
                            <RadioGroup defaultValue='Itachi'>
                                <HStack spacing='10px'>
                                    <Radio value='Sablonneuses'>Sablonneuses</Radio>
                                    <Radio value='Rocailleuses'>Rocailleuses</Radio>
                                    <Radio value='Herbeuses'>Herbeuses</Radio>
                                    <Radio value='Végétalisées'>Végétalisées</Radio>
                                </HStack>
                            </RadioGroup>
                            <br/>
                            <Divider orientation='horizontal' />
                            <br/>
                            <FormLabel mb={4} fontSize={18} as='legend'>L’eau du cours d’eau est :</FormLabel>
                            <RadioGroup defaultValue='Itachi'>
                                <HStack spacing='10px'>
                                    <Radio value='Brune'>Brune</Radio>
                                    <Radio value='Jaune'>Jeune</Radio>
                                    <Radio value='Boueuse / avec sédiments'>Boueuse / avec sédiments</Radio>
                                    <Radio value='Claire / transparente'>Claire / transparente</Radio>
                                </HStack>
                            </RadioGroup>
                            <br/>
                            <Divider orientation='horizontal' />
                            <br/>
                            <FormLabel mb={4} fontSize={18} as='legend'>L’eau du cours d’eau est :</FormLabel>
                            <RadioGroup defaultValue='Itachi'>
                                <HStack spacing='10px'>
                                    <Radio value='Brune'>Brune</Radio>
                                    <Radio value='Jaune'>Jeune</Radio>
                                    <Radio value='Boueuse / avec sédiments'>Boueuse / avec sédiments</Radio>
                                    <Radio value='Claire / transparente'>Claire / transparente</Radio>
                                </HStack>
                            </RadioGroup>
                            <br/>
                            <Divider orientation='horizontal' />
                            <br/>
                            <FormLabel mb={4} fontSize={18} as='legend'>Le fond du cours d’eau est constitué de : :</FormLabel>
                            <RadioGroup defaultValue='Itachi'>
                                <HStack spacing='10px'>
                                    <Radio value='Gravier'>Gravier</Radio>
                                    <Radio value='Sable'>Sable</Radio>
                                    <Radio value='Vase / Argile / Boue / Glaise'>Vase / Argile / Boue / Glaise</Radio>
                                    <Radio value="Je ne vois pas le fond du cours d'eau">Je ne vois pas le fond du cours d'eau</Radio>
                                </HStack>
                            </RadioGroup>
                            <br/>
                            <Divider orientation='horizontal' />
                            <br/>
                            <FormLabel mb={4} fontSize={18} as='legend'>La quantité d'algues est :</FormLabel>
                            <RadioGroup defaultValue='Itachi'>
                                <HStack spacing='10px'>
                                    <Radio value='Très faible'>Très faible</Radio>
                                    <Radio value='Faible'>Faible</Radio>
                                    <Radio value='Moyenne'>Moyenne</Radio>
                                    <Radio value="Importante">Importante</Radio>
                                </HStack>
                            </RadioGroup>
                            <br/>
                            <Divider orientation='horizontal' />
                            <br/>
                            <FormLabel mb={4} fontSize={18} as='legend'>Les sources de contamination possible sont :</FormLabel>
                            <Stack>
                                <Select placeholder='Select option'>
                                    <option value="Pollution près ou dans le cours d'eau">Pollution près ou dans le cours d'eau</option>
                                <option value='Résidences à prximité ou routes'>Résidences à proximité ou routes</option>
                                <option value="Pollution d'origine industrielle">Pollution d'origine industrielle</option>
                                <option value="Pollution d'origine agricole">Pollution d'origine agricole</option>
                            </Select>
                            </Stack>
                        </FormControl>
                        <br/>
                        <Divider orientation='horizontal' />
                        <br/>
                    </ModalBody>
                    <ModalFooter>
                        <Stack pr={4} direction={'row'}>
                        <Button
                            mr={4}
                            colorScheme='teal'
                            type='submit'
                            onClick={() =>{
                                toast({
                                    title: 'Votre étiquette a été enregistré dans le système.',
                                    description: "Elle est présentement en attente d'approbation.",
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                    position:"bottom"
                                })
                                onClose()
                            }
                            }
                        >
                            Submit
                        </Button>
                        <Button>Fermer</Button>
                        </Stack>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

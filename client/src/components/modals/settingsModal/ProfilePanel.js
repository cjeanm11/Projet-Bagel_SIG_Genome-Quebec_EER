import {
  Button, Center, Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack, Icon,
  IconButton,
  Input,
  Box,
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
import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from "../../../App";

export default function ProfilePanel(props) {
  const [user, setUser] = useContext(UserContext);
  const toast = useToast()
  const navigate = useNavigate();

  // const deleteUser = (id) => {
  //   fetch("/users/" + id, { method: "DELETE" })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json.status === 200) {
  //         toast({
  //           title: "Votre compte a été supprimé avec succés.",
  //           status: 'success',
  //           duration: 3000,
  //           isClosable: true,
  //           position: "top"
  //         });
  //         setTimeout(() => {
  //           setUser(null);
  //           sessionStorage.setItem('user', JSON.stringify(null));
  //           localStorage.setItem('user', JSON.stringify(null));
  //           navigate('/');
  //         }, 3000);
  //       } else {
  //         alert(json.message);
  //       }
  //     });
  // }

  return (
    <Box
      rounded={"lg"}
      bg={"white"}
      boxShadow={"lg"}
      p={6}
    >
      <Stack direction={'row'} height='50px' >
        <FormLabel mb={4} pt={2} fontSize={18} fontWeight="" >Nom complet : </FormLabel>

        <Stack direction='row' >
          <Input
            size="md"
            backgroundColor="#ffffff"
            type="text"
            fontWeight="bold"
            borderColor="grey"
            value={`${user.nom}, ${user.prenom}`}
            readOnly
          />
        </Stack>
      </Stack>
      <br />
      <Divider orientation='horizontal' />
      <br />
      <Stack direction={'row'} height='50px' >
        <FormLabel mb={4} pt={2} fontSize={18} fontWeight="" >Identifiant : </FormLabel>

        <Stack direction='row' >
          <Input
            size="md"
            backgroundColor="#ffffff"
            type="text"
            fontWeight="bold"
            borderColor="grey"
            value={user.identifiant}
            readOnly
          />
        </Stack>
      </Stack>
      <br />
      <Divider orientation='horizontal' />
      <br />
      <Stack direction={'row'} height='50px' >
        <FormLabel mb={4} pt={2} fontSize={18} fontWeight="" >Rôle : </FormLabel>

        <Stack direction='row' >
          <Input
            size="md"
            backgroundColor="#ffffff"
            type="text"
            fontWeight="bold"
            borderColor="grey"
            value={user.role}
            readOnly
          />
        </Stack>
      </Stack>
      <br />
      <Divider orientation='horizontal' />
      <br />
      <Stack direction={'row'} height='50px' >
        <FormLabel mb={4} pt={2} fontSize={18} fontWeight="" >École : </FormLabel>

        <Stack direction='row' >
          <Input
            size="md"
            backgroundColor="#ffffff"
            type="text"
            fontWeight="bold"
            borderColor="grey"
            width={'md'}
            value={user.ecole}
            readOnly
          />
        </Stack>
      </Stack>
      <br />
      <Divider orientation='horizontal' />
      <br />
      <Stack direction={'row'} height='50px' >
        <FormLabel mb={4} pt={2} fontSize={18} fontWeight="" >Niveau scolaire : </FormLabel>

        <Stack direction='row' >
          <Input
            size="md"
            backgroundColor="#ffffff"
            type="text"
            fontWeight="bold"
            borderColor="grey"
            value={user.niveauScolaire}
            readOnly
          />
        </Stack>
      </Stack>
      <br />
      <Divider orientation='horizontal' />
      <br />
      <Stack direction={'row'} height='50px' >
        <FormLabel mb={4} pt={2} fontSize={18} fontWeight="" >Centre de Srvices Scolaire : </FormLabel>

        <Stack direction='row' >
          <Input
            size="md"
            backgroundColor="#ffffff"
            type="text"
            fontWeight="bold"
            borderColor="grey"
            width={'md'}
            value={user.centreDeServicesScolaire}
            readOnly
          />
        </Stack>
      </Stack>
      {/* <br />
      <Divider orientation='horizontal' />
      <br />
      <Button onClick={() => {
        if (!window.confirm("Êtes-vous sur de vouloir supprimer votre compte?")) {
          return;
        }
        deleteUser(user._id);
      }}>
        Supprimer votre compte
      </Button> */}

    </ Box>
  )
}
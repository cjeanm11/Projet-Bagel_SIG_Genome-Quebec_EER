import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Heading,
  Button,
  Form,
  Box,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from "react";

export default function AccessCodesPanel(props) {

  const toast = useToast()

  const [inputs, setInputs] = useState({
    css: "",
    ecole: "",
    niveauScolaire: ""
  });
  const [accessCodes, setAccessCodes] = useState([]);

  const handleChange = (event) => {
    setInputs(values => ({ ...values, [event.target.name]: event.target.value }))
  }

  const url = "http://localhost:5000";
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    fetch(url + "/accesscodes", {
      method: "POST",
      body: JSON.stringify({
        accessCodeInfo: {
          centreDeServicesScolaire: inputs.css,
          ecole: inputs.ecole,
          niveauScolaire: inputs.niveauScolaire
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          const accessCodes = json.accessCodes;
          // toast({
          //   title: "Codes d'accès générés avec succès",
          //   description: `Code d'accès élèves: ${accessCodes.students}\n
          //   Code d'accès enseignant: ${accessCodes.teacher}`,
          //   status: 'success',
          //   duration: 9000,
          //   isClosable: true,
          //   position: "top",
          // });
          alert(`Codes d'accès générés avec succès!\n\nCode d'accès élèves: ${accessCodes.students}\nCode d'accès enseignant: ${accessCodes.teacher}`);
          setInputs({
            css: "",
            ecole: "",
            niveauScolaire: ""
          })
        } else {
          toast({
            title: "Une erreur est survenue lors de la génération du code d'accès",
            description: json.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
        }
      });
  }

  useEffect(() => {
    fetch("/accesscodes")
      .then(res => res.json())
      .then((json) => setAccessCodes(json.accessCodes))
  });

  return (
    <Stack direction={'column'} spacing={4} >
      <Box
        as="form"
        onSubmit={handleSubmit}
        rounded={"lg"}
        bg={"white"}
        boxShadow={"lg"}
        p={6}
      >
        <Heading fontWeight="bold" fontSize={20} textAlign="center" color="teal" mb={5}>
          Créer un code d'accès
        </Heading>
        <FormControl isRequired>
          <Stack direction={'row'}>
            <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >Centre de services scolaire :</FormLabel>
            <Input
              placeholder="Entrez ici..."
              size="md"
              width="xs"
              backgroundColor="#ffffff"
              type="text"
              name="css"
              value={inputs.css}
              onChange={handleChange}
            />
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <Stack direction={'row'} spacing={6} height={10}>
            <FormLabel fontWeight="semibold" mb={4} pt={2} fontSize={18} >École :</FormLabel>
            <Input
              placeholder="Entrez ici..."
              size="md"
              width="-moz-fit-content"
              backgroundColor="#ffffff"
              type="text"
              name="ecole"
              value={inputs.ecole}
              onChange={handleChange}
            />
            <Divider orientation="vertical" />
            <FormLabel fontWeight="semibold" pt={2} fontSize={18} >Niveau scolaire :</FormLabel>
            <Input
              placeholder="Entrez ici..."
              size="md"
              width="-moz-fit-content"
              backgroundColor="#ffffff"
              type="text"
              name="niveauScolaire"
              value={inputs.niveauScolaire}
              onChange={handleChange}
            />
          </Stack>
        </FormControl>
        <Button
          colorScheme='teal'
          type='submit'
          fontWeight={'bold'}
          fontSize={20}
          mt={5}
          width="100%"
        >
          Générer
        </Button>
      </Box>
      <Divider />
      <Box
        rounded={"lg"}
        bg={"white"}
        boxShadow={"lg"}
        p={6}
      >
        <Heading fontWeight="bold" fontSize={20} textAlign="center" color="teal" mb={5}>
          Liste des codes d'accès
        </Heading>
        <TableContainer>
          <Table variant='simple'>
            {/* <TableCaption>Liste de tous les codes d'accès</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Code d'accès</Th>
                <Th>Rôle</Th>
                <Th>École</Th>
                <Th>Niveau scolaire</Th>
                <Th>CSS</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="small">
              {accessCodes.map((accessCode) => {
                return (
                  <Tr>
                    <Td fontWeight={'bold'}>{accessCode.code}</Td>
                    <Td>{accessCode.role}</Td>
                    <Td>{accessCode.ecole}</Td>
                    <Td>{accessCode.niveauScolaire}</Td>
                    <Td>{accessCode.centreDeServicesScolaire}</Td>
                  </Tr>
                )
              })}
            </Tbody>
            {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  )
}
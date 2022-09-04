import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Box,
  useToast,
  Tooltip
} from '@chakra-ui/react'
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";

export default function StudentsPanel(props) {
  
  const [user, setUser] = useContext(UserContext);
  const toast = useToast()
  const [students, setStudents] = useState([]);

  const deleteUser = (id) => {
    fetch("/users/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          toast({
            title: "Le compte usager a été supprimé avec succés.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
        } else {
          alert(json.message);
        }
      });
  }

  useEffect(() => {
    fetch("/users/students", {
      method: "POST",
      body: JSON.stringify({
        css: user.centreDeServicesScolaire,
        ecole: user.ecole,
        niveauScolaire: user.niveauScolaire
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(res => res.json())
      .then((json) => setStudents(json.students))
  });

  return (
    <Box
      rounded={"lg"}
      bg={"white"}
      boxShadow={"lg"}
      p={6}
    >
      <Heading fontWeight="bold" fontSize={20} textAlign="center" color="teal" mb={5}>
        Liste des élèves
      </Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Nom complet</Th>
              <Th>Identifiant</Th>
              <Th>École</Th>
              <Th>Niveau scolaire</Th>
              <Th>CSS</Th>
            </Tr>
          </Thead>
          <Tbody fontSize="small">
            {students.map((student) => {
              return (
                <Tr>
                  <Td>
                    <Tooltip label="Supprimer">
                      <DeleteIcon
                        cursor={'pointer'}
                        onClick={() => deleteUser(student._id)}
                      />
                    </ Tooltip>
                  </Td>
                  <Td>{`${student.nom}, ${student.prenom}`}</Td>
                  <Td>{student.identifiant}</Td>
                  <Td>{student.ecole}</Td>
                  <Td>{student.niveauScolaire}</Td>
                  <Td>{student.centreDeServicesScolaire}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
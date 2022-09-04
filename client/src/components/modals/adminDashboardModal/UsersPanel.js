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
import { useEffect, useState} from "react";

export default function UsersPanel(props) {

  const toast = useToast()

  const [users, setUsers] = useState([]);

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
    fetch("/users")
      .then(res => res.json())
      .then((json) => setUsers(json.users))
  });

  return (
      <Box
        rounded={"lg"}
        bg={"white"}
        boxShadow={"lg"}
        p={6}
      >
        <Heading fontWeight="bold" fontSize={20} textAlign="center" color="teal" mb={5}>
          Liste des usagers
        </Heading>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Nom complet</Th>
                <Th>Identifiant</Th>
                <Th>Rôle</Th>
                <Th>École</Th>
                <Th>Niveau scolaire</Th>
                <Th>CSS</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="small">
              {users.map((user) => {
                return (
                  <Tr>
                    <Td>
                      <Tooltip label="Supprimer">
                      <DeleteIcon
                        cursor={'pointer'}
                        onClick={() => deleteUser(user._id)}
                      />
                      </ Tooltip>
                    </Td>
                    <Td>{`${user.nom}, ${user.prenom}`}</Td>
                    <Td>{user.identifiant}</Td>
                    <Td>{user.role}</Td>
                    <Td>{user.ecole}</Td>
                    <Td>{user.niveauScolaire}</Td>
                    <Td>{user.centreDeServicesScolaire}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
  )
}
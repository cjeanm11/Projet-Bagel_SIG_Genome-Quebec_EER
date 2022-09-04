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
import { useEffect, useState } from "react";

export default function MarkersPanel(props) {

  const toast = useToast()

  const [markers, setMarkers] = useState([]);

  const deleteMarker = (id) => {
    fetch("/map/markers/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          toast({
            title: "Le marqueur a été supprimé avec succés.",
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
    fetch("/map/markers")
      .then(res => res.json())
      .then((json) => setMarkers(json.markers))
  });

  return (
    <Box
      rounded={"lg"}
      bg={"white"}
      boxShadow={"lg"}
      p={6}
    >
      <Heading fontWeight="bold" fontSize={20} textAlign="center" color="teal" mb={5}>
        Liste des marqueurs
      </Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Coordonnées</Th>
              <Th>Cours d'eau</Th>
              <Th>Date</Th>
              <Th>Usager</Th>
              <Th>Résultats</Th>
            </Tr>
          </Thead>
          <Tbody fontSize="small">
            {markers.map((marker) => {
              return (
                <Tr>
                  <Td>
                    <Tooltip label="Supprimer">
                      <DeleteIcon
                        cursor={'pointer'}
                        titl
                        onClick={() => deleteMarker(marker._id)}
                      />
                    </ Tooltip>
                  </Td>
                  <Td>{"lat: " + marker.coordonnees.latitude}<br />
                    {"lon: " + marker.coordonnees.longitude}</Td>
                  <Td>{marker.coursDeau}</Td>
                  <Td>{marker.dateDechantillonage.split("T")[0]}</Td>
                  <Td>{`${marker.user.nom}, ${marker.user.prenom}`}</Td>
                  <Td>{marker.resultats.disponibles ? "Disponibles" : "En attente"}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
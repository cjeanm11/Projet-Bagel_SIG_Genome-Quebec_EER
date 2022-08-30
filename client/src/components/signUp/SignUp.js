import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast
} from "@chakra-ui/react";
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { UserProvider } from "../../contexts/UserContext";
import { UserContext } from "../../App";


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const toast = useToast()
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const accessCodeRef = useRef();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
  }
  
  const url = "http://localhost:5000";
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload

    const userToSignUp = {
      prenom: capitalizeFirstLetter(firstNameRef.current.value),
      nom: capitalizeFirstLetter(lastNameRef.current.value),
      identifiant: usernameRef.current.value.toLowerCase(),
      motDePasse: passwordRef.current.value,
    }
    fetch(url + "/users/signup", {
      method: "POST",
      body: JSON.stringify({
        user: userToSignUp,
        accessCode: accessCodeRef.current.value.toUpperCase()
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          const savedUser = json.user;
          sessionStorage.setItem('user', JSON.stringify(savedUser));
          toast({
            title: 'Compte créé avec succès',
            description: "Veuillez noter votre identifiant et mot de passe",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top",
            // onClose: () => { setUser(savedUser); navigate('/carte'); }
          });
          setTimeout(() => {setUser(savedUser); navigate('/carte');}, 3000);
        } else {
          toast({
            title: 'Une erreur est survenue lors de votre inscription',
            description: json.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
        }
      });
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Inscrivez-vous
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            pour accéder à toutes les fonctionnalités
          </Text>
        </Stack>
        <Box
          as="form"
          onSubmit={handleSubmit}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <FormControl id="firstName" isRequired>
                <FormLabel>Prénom</FormLabel>
                <Input
                  type="text"
                  minLength="2"
                  ref={firstNameRef}
                  autoFocus
                />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Nom</FormLabel>
                <Input
                  type="text"
                  minLength="2"
                  ref={lastNameRef}
                />
              </FormControl>
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Identifiant</FormLabel>
              <Input
                type="text"
                minLength="6"
                ref={usernameRef}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Mot de passe</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  minLength="8"
                  ref={passwordRef}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="accessCode" isRequired>
              <FormLabel>Code d'accés</FormLabel>
              <Input
                type="text"
                ref={accessCodeRef}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Envoi..."
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.300",
                }}
              >
                S'inscrire
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Vous avez déjà un compte?{' '}
                <Link
                  color={"green.400"}
                  href='/connexion'
                >
                  Se connecter
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex >
  );
}

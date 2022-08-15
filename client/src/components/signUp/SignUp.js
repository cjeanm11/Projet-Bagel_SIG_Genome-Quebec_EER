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
} from "@chakra-ui/react";
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { UserProvider } from "../../contexts/UserContext";
import { UserContext } from "../../App";


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  // if (user) navigate('/app');
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const url = "http://localhost:5000";
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    const userToSignUp = {
      prenom: firstNameRef.current.value,
      nom: lastNameRef.current.value,
      identifiant: usernameRef.current.value,
      motDePasse: passwordRef.current.value,
    }
    fetch(url + "/users/signup", {
      method: "POST",
      body: JSON.stringify({
        user: userToSignUp
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          const savedUser = json.user;
          setUser(savedUser);
          sessionStorage.setItem('user', JSON.stringify(savedUser));
          navigate("/");
        } else {
          alert(json.message);
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
              {/* <Box> */}
              <FormControl id="firstName" isRequired>
                <FormLabel>Prénom</FormLabel>
                <Input
                  type="text"
                  ref={firstNameRef}
                />
              </FormControl>
              {/* </Box> */}
              {/* <Box> */}
              <FormControl id="lastName" isRequired>
                <FormLabel>Nom</FormLabel>
                <Input
                  type="text"
                  ref={lastNameRef}
                />
              </FormControl>
              {/* </Box> */}
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Identifiant</FormLabel>
              <Input
                type="text"
                ref={usernameRef}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Mot de passe</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
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

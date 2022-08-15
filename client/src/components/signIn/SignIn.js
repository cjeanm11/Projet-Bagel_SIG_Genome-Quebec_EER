import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRef, useContext, useState } from "react";
import { toggleLogin } from "../../redux/userSlice";
import { store } from "../../redux/store";
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux"; // import useNavigate()
import { UserContext } from "../../App";

export function SignIn(props) {
  const navigate = useNavigate(); // make const
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useContext(UserContext);
  // if (user) navigate('/app');
  const usernameRef = useRef();
  const passwordRef = useRef();

  const url = "http://localhost:5000";
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    fetch(url + "/users/signin", {
      method: "POST",
      body: JSON.stringify({
        identifiant: usernameRef.current.value,
        motDePasse: passwordRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          const user = json.user;
          setUser(user);
          rememberMe ?
            localStorage.setItem('user', JSON.stringify(user))
            :
            sessionStorage.setItem('user', JSON.stringify(user));
          navigate("/");
        } else {
          alert(json.message);
        }
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Nom de l'application</Heading>
          <Text color={'green.400'} fontSize={'lg'} >
            Connectez-vous à votre compte
          </Text>
        </Stack>
        <Box
          as="form"
          onSubmit={handleSubmit}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Identifiant</FormLabel>
              <Input
                type="text"
                ref={usernameRef}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                type="password"
                ref={passwordRef}
              />
            </FormControl>
            <Stack spacing={4}>
              {/* <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}> */}
              <Checkbox
                value={rememberMe}
                onChange={(event) => {
                  setRememberMe(event.target.checked);
                }}
              >
                Se souvenir de moi
              </Checkbox>
              {/* <Link color={'green.400'}>Mot de passe oublié?</Link> */}
              {/* </Stack> */}
              <Button
                type="submit"
                loadingText="Envoi..."
                size="lg"
                bg={"green.400"}
                color={'white'}
                _hover={{
                  bg: "green.300",
                }}>
                Se connecter
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Vous n'avez pas de compte?{' '}
                <Link
                  color={"green.400"}
                  href='/inscription'
                >
                  S'inscrire
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
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
import { LoggedInContext } from "../../App";

export function SignIn(props) {
  const navigate = useNavigate(); // make const
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useContext(LoggedInContext);
  if (user) {
    navigate('/app');
  }
  const emailRef = useRef();
  const passwordRef = useRef();

  const url = "http://localhost:5000";
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    fetch(url + "/users/signin", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.success) {
          const savedUser = json.data;
          setUser(savedUser);
          rememberMe ? 
          localStorage.setItem('user', JSON.stringify(savedUser))
          :
          sessionStorage.setItem('user', JSON.stringify(savedUser));
          navigate("/");
        } else {
          alert(json.msg);
        }
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Nom de l'application</Heading>
          <Text color={'green.400'} fontSize={'lg'} >
            Connectez-vous à votre compte  ✌️
          </Text>
        </Stack>
        <form onSubmit={handleSubmit} >
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  ref={emailRef}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Mot de passe</FormLabel>
                <Input
                  type="password"
                  ref={passwordRef}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox
                  value={rememberMe}
                  onChange = {(event) => {
                    setRememberMe(event.target.checked);
                  }}
                  >
                    Se souvenir de moi
                  </Checkbox>
                  <Link color={'green.400'}>Mot de passe oublié?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={'green.300'}
                  color={'white'}
                  as={'a'}
                  onClick={handleSubmit}
                  _hover={{
                    bg: 'green.500',
                  }}>
                  Se connecter
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
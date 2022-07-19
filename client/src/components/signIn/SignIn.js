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
import {toggleLogin} from "../../redux/userSlice";
import {store} from "../../redux/store";
import { useNavigate } from 'react-router';
import {useSelector} from "react-redux"; // import useNavigate()
export function SignIn(props) {
    const navigate = useNavigate(); // make const
    const user = useSelector(state => state.user)
    let loggedIn= false;

    function validateUser(){
       // todo validate user : fetch data, password, etc
       if(!user.loggedIn ){
           store.dispatch(toggleLogin())
           navigate('/app');
           loggedIn = true;
       }
   }
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
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Nom d'utilisateur</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Mot de passe</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Se souvenir de moi</Checkbox>
                                <Link color={'green.400'}>Mot de passe oublié?</Link>
                            </Stack>
                            <Button
                                bg={'green.300'}
                                color={'white'}
                                as={'a'}
                                onClick={validateUser}
                                _hover={{
                                    bg: 'green.500',
                                }}>
                                Connection
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
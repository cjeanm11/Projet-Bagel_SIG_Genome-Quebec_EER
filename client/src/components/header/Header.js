import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Divider,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon, SettingsIcon,
} from '@chakra-ui/icons';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useContext } from "react";
import Logo from "../logo/Logo"
import { store } from "../../redux/store";
import { toggleLogin } from "../../redux/userSlice";
import SettingsModal from "../modals/settingsModal/SettingsModal"
import AdminDashboardModal from "../modals/adminDashboardModal/AdminDashboardModal"
import { UserContext } from "../../App";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    sessionStorage.setItem('user', JSON.stringify(null));
    localStorage.setItem('user', JSON.stringify(null));
    navigate('/');
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Logo onClick={() => navigate('/')}/>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        {!user &&
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              as={'a'}
              fontWeight="bold"
              color={'white'}
              bg={'green.400'}
              onClick={() => navigate('/connexion')}
              _hover={{
                bg: 'green.300',
              }}
            >
              Se connecter
            </Button>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              as={'a'}
              fontWeight="bold"
              color={'white'}
              bg={'green.300'}
              onClick={() => navigate('/inscription')}
              _hover={{
                bg: 'green.200',
              }}>
              S'inscrire
            </Button>
          </Stack>
        }
        {user &&
          <Stack
            // display={{ base: 'flex', justifyContent: 'center', alignItems: 'center'}}
            // align={{ flex: 'center'}}
            direction={'row'}
            spacing={6}
          >
            <Stack mt={2} direction={'row'} spacing={6}>
              <Text fontWeight="bold">{user.nom + ", " + user.prenom}</Text>
              <Divider orientation='vertical' />
              <Text fontWeight="bold">{user.role}</Text>
              <Divider orientation='vertical' />
            </Stack>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <IconButton aria-label={"ded"} color={'blackAlpha.900'} icon={<SettingsIcon />}></IconButton>
              </MenuButton>
              <MenuList>
                <MenuItem><SettingsModal /></MenuItem>
                {user.role === "Admin" &&
                  <>
                    <MenuDivider />
                    <MenuItem><AdminDashboardModal /></MenuItem>
                  </>
                }
              </MenuList>
            </Menu>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              as={'a'}
              fontWeight="bold"
              color={'white'}
              bg={'green.400'}
              onClick={logOut}
              _hover={{
                bg: 'green.300',
              }}>
              Déconnexion
            </Button>
          </Stack>

        }
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const navigate = useNavigate();

  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={5}
                onClick={() => navigate(navItem.href ?? '#')}
                fontSize="xl"
                fontWeight="bold"
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                  backgroundColor: 'lightgrey',
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem href={navItem.href} key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2}
                onClick={() => navigate(child.href)}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Carte",
    href: '/carte',
  },
  {
    label: 'À propos',
    href: '/apropos',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: "Centre d'aide",
    href: '/aide',
  },
];
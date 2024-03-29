import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUsers,
  FiBriefcase,
} from 'react-icons/fi';
import {FaTicketAlt , FaUser} from 'react-icons/fa'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {useSelector} from 'react-redux'


const LinkItems = [
  { name: 'Dashboard', icon: FiHome  , href: '/software'},
  { name: 'Projects', icon: FiBriefcase , href: '/software/projects'},
  { name: 'Staff', icon: FiUsers  , href: '/software/staff'},
  { name: 'Tickets', icon: FaTicketAlt , href: '/software/tickets'},
  { name: 'Profile', icon: FaUser , href: '/software/profile'},
];

export default function SidebarWithHeader({
  children,
} = {
  children: ReactNode,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box >
      <SidebarContent
        onClose={() => onClose}
        position={'fixed'}
        left={0}
        right={0}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
    zIndex={'overlay'}
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" color={'messenger.500'} fontWeight="bold" >
          WispyProject
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
       
          <NavItem href={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
       
      ))}
    </Box>
  );
};


const NavItem = ({ icon, href  , children, ...rest }) => {
  
  const router = useRouter()
 

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
  
  return (
    <NextLink href={href} >
      <Link  style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} onClick={handleClick}>
      <Flex
        align="center"
        p="4"
        mx="4"
        background={router.asPath === href ? "messenger.500" : ""}
        color={router.asPath === href ? "white" : ""}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'messenger.500',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
    </NextLink>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
  const {userInfo} = useSelector((state) => state.auth)
  const handleSignOut = () => {
    localStorage.clear()
    window.location.href = "/"
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        WispyProject
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
       
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  name={userInfo && userInfo.username}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{userInfo && userInfo.username}</Text>
                  <Text fontSize="xs" color="gray.600" textTransform={"capitalize"}>
                  {userInfo && userInfo.role}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem ><NextLink href="/software/profile">Profile</NextLink></MenuItem>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
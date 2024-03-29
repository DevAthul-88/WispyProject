import { ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const Links = [
  { name: "Features", href: "/features" },
  { name: "Guide", href: "/guide" },
];
const NavLink = ({ children, href }, { children: ReactNode }) => (
  <NextLink href={href}>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box boxShadow={"sm"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Box>
            <Text fontSize={"4xl"} color={"messenger.500"} className={"bebas"}>
              <Link as={NextLink} href="/">
              wispyproject
              </Link>
            </Text>
          </Box>

          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
            <NextLink href="/login">
              <Button variant={"link"} colorScheme={"messenger"} >
                Log In
              </Button>
              </NextLink>
              <NextLink href="/signup">
              <Button variant={"solid"} colorScheme={"messenger"} >
                Sign Up
              </Button>
              </NextLink>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

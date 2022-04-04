import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import Head from "next/head";

const features = [
  {
    id: 1,
    title: "Create projects",
    text: "Projects can be created, edited , finish and deleted. ",
  },

  {
    id: 2,
    title: "Create tickets",
    text: "Tickets can be created, edited, and deleted. ",
  },

  {
    id: 3,
    title: "Add employees",
    text: "Staff can be added, and roles with unique permissions can be assigned to them. Staff can be created, edited, and deleted by administrators. ",
  },

  {
    id: 4,
    title: "Create todos",
    text: "Create to-do lists for each project such that your members can quickly manage things. ",
  },

  {
    id: 4,
    title: "Comments",
    text: "You can create comments for each project and ticket. markdown supported. ",
  },

  {
    id: 5,
    title: "Attachments",
    text: "The most exciting thing is that you can now add attachments to tickets. So we can assign the ticket to a project. So everyone can see what's going on with it.",
  },

  {
    id: 6,
    title: "Tables",
    text: "Every piece of data is displayed on the next-gen table. So we can easily filter the data we want.",
  },

  {
    id: 7,
    title: "Download",
    text: "You can download the data from the table in CSV format.",
  },
];

export default function GridListWithHeading() {
  return (
    <Box p={4}>
      <Head>
        <title>WispyProject - Features</title>
      </Head>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        marginTop={"5"}
      >
        <Heading fontSize={"3xl"}>
          The open source project management tool
        </Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          WispyProject is a free software project management tool. It's open
          source and always will be.
        </Text>
      </Stack>

      <Container maxW={"7xl"} mt={"10"}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

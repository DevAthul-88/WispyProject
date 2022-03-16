import {
  Box,
  Container,
  Stack,
  Text,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import Loader from "../Components/Loader";

export default function Details({ data }) {
  return (
    <Container maxW={"7xl"}>
      {data == undefined || data == null ? (
        <Loader />
      ) : (
        <SimpleGrid py={{ base: 18, md: 4 }}>
          <Stack
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Box as={"header"}>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"messenger.500"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Title
              </Text>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
                textTransform={"capitalize"}
              >
                {data[0].title}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box marginTop={"5"}>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"messenger.500"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Description
                </Text>

                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                  textTransform={"capitalize"}
                >
                  {data[0].description}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"messenger.500"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Priority:
                    </Text>{" "}
                    {data[0].priority}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Total members:
                    </Text>{" "}
                    {data[0].members.length}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Created At:
                    </Text>{" "}
                    {data[0].createdAt}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      updated At:
                    </Text>{" "}
                    {data[0].updatedAt}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Flagged as completed:
                    </Text>{" "}
                    {data[0].completed.flagged}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Completed:
                    </Text>{" "}
                    {data[0].completed.approved}
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
      )}
    </Container>
  );
}

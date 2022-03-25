import React, { useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  SimpleGrid,
  StackDivider,
  Button,
  useColorModeValue,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { fetchData } from "../redux/org/action";
import Loader from "../Components/Loader";
import { format } from "timeago.js";
import { useSelector, useDispatch } from "react-redux";
import { FaFlag } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import dateFormat from "dateformat"

export default function Details({ data }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const org = useSelector((state) => state.org);
  const [reload, setReload] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleComplete = async () => {
    const omi = await axios.patch("/api/project/create", {
      orgId: org.data._id,
      projectId: router.query.slug,
    });
    if (omi.data.error) return console.error(omi.data.error);
    if (omi.data.reload) return setReload(omi.data.reload);
  };

  useEffect(() => {
    if (reload === true) {
      dispatch(fetchData(userInfo._id));
    }
  }, [reload]);

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
                      Created:
                    </Text>{" "}
                    {format(data[0].createdAt)}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Created At:
                    </Text>{" "}
                    {dateFormat(data[0].createdAt)}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Flagged as completed:
                    </Text>{" "}
                    {data[0].completed.flagged.toString()}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Completed:
                    </Text>{" "}
                    {data[0].completed.approved.toString()}
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
      )}
      <hr />
      {userInfo.role === "ADMIN" || userInfo.role === "PROJECT_MANAGER" ? (
        <Button
          marginTop="5"
          variant={"outline"}
          colorScheme={"messenger"}
          onClick={onOpen}
          rightIcon={<FaFlag />}
          disabled={data[0].completed.flagged}
        >
         {data[0].completed.flagged ? "Flagged" : "Flag as completed"}
        </Button>
      ) : (
        <>
          {data[0].members.includes(userInfo._id) ? (
            <Button
              marginTop="5"
              variant={"outline"}
              colorScheme={"messenger"}
              onClick={onOpen}
              rightIcon={<FaFlag />}
              disabled={data[0].completed.flagged}
            >
              {data[0].completed.flagged ? "Flagged" : "Flag as completed"}
            </Button>
          ) : null}
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are sure want to flag this project as completed</ModalBody>

          <ModalFooter>
            <Button colorScheme="messenger" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={"green"} onClick={handleComplete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

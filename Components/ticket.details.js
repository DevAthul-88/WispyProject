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
import { useRouter } from "next/router";
import axios from "axios";
import dateFormat from "dateformat";

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
      dispatch(fetchData(userInfo.org));
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
                  <ListItem textTransform="capitalize">
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

                  <ListItem textTransform="capitalize">
                    <Text as={"span"} fontWeight={"bold"}>
                      Type:
                    </Text>{" "}
                    {data[0].type}
                  </ListItem>

                  <ListItem textTransform="capitalize">
                    <Text as={"span"} fontWeight={"bold"}>
                      Status:
                    </Text>{" "}
                    {data[0].status}
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

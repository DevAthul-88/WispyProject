import {
    Container,
    List,
    Heading,
    ListItem,
    Divider,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Button,
    Modal,
    ModalOverlay,
    Flex,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Stack,
    FormControl,
    FormLabel,
    Input,
  } from "@chakra-ui/react";
  import Alerts from "../../Components/Alert";
  import React, { useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import Head from "next/head";
  import { format } from "timeago.js";
  import { FaHammer } from "react-icons/fa";
  import { Formik, Form, Field } from "formik";
  import axios from "axios";
  import Router from "next/router";
  
  function index() {
    const { userInfo } = useSelector((state) => state.auth);
    useEffect(() => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        Router.push("/login/");
      }
    }, []);
    return (
      <>
        <Head>
          <title>WispyProject - Profile</title>
        </Head>
        <Container maxWidth={"container.lg"} marginRight={"20"} marginTop={"5"}>
            
              <Heading>My account</Heading>
              <Divider marginTop={"5"} />
              <List marginTop={"5"} spacing={3}>
                <Heading fontSize={"2xl"} marginBottom="5">
                  Personal information
                </Heading>
                <ListItem fontSize={"xl"}>
                  Username: {userInfo && userInfo.username}
                </ListItem>
                <ListItem fontSize={"xl"}>
                  Email: {userInfo && userInfo.email}
                </ListItem>
                <ListItem fontSize={"xl"}>
                  Role: {userInfo && userInfo.role}
                </ListItem>
                <ListItem fontSize={"xl"}>
                  Created: {userInfo && format(userInfo.createdAt)}
                </ListItem>
              </List>
        </Container>
      </>
    );
  }
  
  export default index;
  
  const CustomInputComponent = (props) => (
    <Input type={props.type} {...props} width={"full"} />
  );
  
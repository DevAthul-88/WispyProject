import {
  Container,
  Avatar,
  List,
  ListItem,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { format } from "timeago.js";

function index() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Head>
        <title>WispyProject - Profile</title>
      </Head>
      <Container maxWidth={"container.lg"} marginRight={"20"}>
        {userInfo && userInfo.role === "ADMIN" ? (
          <>
            <Avatar size="2xl" name={userInfo && userInfo.username} />
            <List marginTop={"5"} spacing={3}>
              <ListItem fontSize={"2xl"}>
                Username: {userInfo && userInfo.username}
              </ListItem>
              <ListItem fontSize={"2xl"}>
                Email: {userInfo && userInfo.email}
              </ListItem>
              <ListItem fontSize={"2xl"}>
                Role: {userInfo && userInfo.role}
              </ListItem>
              <ListItem fontSize={"2xl"}>
                Created: {userInfo && format(userInfo.createdAt)}
              </ListItem>
            </List>
          </>
        ) : (
          <>
            <Tabs>
              <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}

        <Divider marginTop={"5"} />
      </Container>
    </>
  );
}

export default index;

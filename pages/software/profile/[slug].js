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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { format } from "timeago.js";
import Router from "next/router";
import Loader from '../../../Components/Loader'

function index() {
  const { data } = useSelector((state) => state.org);
  const [loading, setLoading] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState("");
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      Router.push("/login/");
    }
    if (data) {
      setUserInfo(data.employees.find((e) => e._id == Router.query.slug));
      setLoading(false);
    }
  }, [data, userInfo]);
  return (
    <>
      <Head>
        <title>WispyProject - Profile</title>
      </Head>
      <Container maxWidth={"container.lg"} marginRight={"20"}>
        <>
          {loading ? (
            <Loader />
          ) : (
            <Tabs isFitted variant="enclosed-colored" colorScheme={"messenger"}>
              <TabList>
                <Tab>Details</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
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
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </>
      </Container>
    </>
  );
}

export default index;

const CustomInputComponent = (props) => (
  <Input type={props.type} {...props} width={"full"} />
);

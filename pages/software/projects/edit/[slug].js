import React, { useEffect, useState } from "react";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { fetchData } from "../../../../redux/org/action";
import Form from "../../../../Components/edit[pro]/form";
import Loader from "../../../../Components/Loader";
import { useRouter } from "next/router";
import Other from "../../../../Components/edit[pro]/other";
import Router from 'next/router';

function Slug() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.org);
  const { userInfo } = useSelector((state) => state.auth);
  const { reload } = useSelector((state) => state.project);

  const proj =
    data && data.projects.find((e) => e._id + "" == router.query.slug);

  useEffect(() => {
    dispatch(fetchData(userInfo.org));
    const token = JSON.parse(localStorage.getItem("token"));
    if(!token){
      Router.push("/login/")
    }
  }, [reload]);
  return (
    <div>
      <Head>
        <title>WispyProject - Edit</title>
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <>
          {proj == undefined || proj == null || proj.length === 0 ? (
            <Loader />
          ) : (
            <Container maxWidth={"container.lg"} marginRight={"20"}>
              <Tabs
                isFitted
                variant="enclosed-colored"
                colorScheme={"messenger"}
              >
                <TabList mb="1em">
                  <Tab>Edit</Tab>
                  <Tab>Other</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Form
                      data={data && data.employees}
                      de={data && proj && proj}
                      org={data && data}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Other
                      data={data && data.employees}
                      de={data && proj && proj}
                      org={data && data}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Container>
          )}
        </>
      )}
    </div>
  );
}

export default Slug;



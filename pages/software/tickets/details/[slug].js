import { useRouter } from "next/router";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../redux/org/action";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Details from "../../../../Components/ticket.details";
import Comment from "../../../../Components/Ticket.project/Comment/index";
import Table from "../../../../Components/Table/users";
import Attachments from "../../../../Components/attachments/ticket";

function Slug() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.org);
  const { userInfo } = useSelector((state) => state.auth);

  const proj = data && data.tickets.filter((e) => e._id == router.query.slug);
  const users =
    proj == undefined || proj == null || proj.length === 0
      ? []
      : data && data.employees.filter((e) => proj[0].members.includes(e._id));
  useEffect(() => {
    dispatch(fetchData(userInfo.org));
  }, []);

  return (
    <div>
      <Head>
        <title>WispyProject - Ticket Details</title>
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
                  <Tab>Details</Tab>
                  <Tab>Attachments</Tab>
                  <Tab>Comments</Tab>
                  <Tab>Users</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Details data={proj} />
                  </TabPanel>
                  <TabPanel>
                    <Attachments
                      ticket={router.query.slug}
                      orgId={data._id}
                      data={proj && proj[0].attachments}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Comment comment={proj[0].comments} />
                  </TabPanel>
                  <TabPanel>{users && <Table org={users} />}</TabPanel>
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

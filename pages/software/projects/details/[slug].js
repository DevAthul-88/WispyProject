import { useRouter } from "next/router";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader";
import { useEffect} from "react";
import { fetchData } from "../../../../redux/org/action";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Details from "../../../../Components/project.details";
import Comment from "../../../../Components/Comment/Index";
import Table from "../../../../Components/Table/users";
import Todo from "../../../../Components/Todo/Todo";
import Ticket from "../../../../Components/Ticket.project/index";

function Slug() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.org);
  const { userInfo } = useSelector((state) => state.auth);

  const proj = data && data.projects.filter((e) => e._id == router.query.slug);
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
        <title>WispyProject - Project Details</title>
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
                  <Tab>Tickets</Tab>
                  <Tab>Comments</Tab>
                  <Tab>Todos</Tab>
                  <Tab>Users</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Details data={proj} />
                  </TabPanel>
                  <TabPanel>
                    <Ticket data={data} id={router.query.slug}/>
                  </TabPanel>
                  <TabPanel>
                    <Comment comment={proj[0].comments} />
                  </TabPanel>
                  <TabPanel>
                    <Todo users={users} />
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

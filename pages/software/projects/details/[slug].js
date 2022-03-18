import { useRouter } from "next/router";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader";
import { useEffect } from "react";
import { fetchData } from "../../../../redux/org/action";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Details from '../../../../Components/project.details'
import Comment from '../../../../Components/Comment/Index'
import Table from '../../../../Components/Table/users'
import Todo from '../../../../Components/Todo/Todo'

function Slug() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.org);
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();
  const proj = data && data.projects.filter((e) => e.id == router.query.slug);
  useEffect(() => {
    dispatch(fetchData(userInfo._id));
  }, []);
  const org = data && data.projects.filter((e) => e.id == router.query.slug);
  const users = org && data && data.employees.filter((e) => org[0].members.includes(e.id))

  return (
    <div>
      <Head>
        <title>WispyProject - Project-Details</title>
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <>
          {proj == undefined || proj == null  || proj.length === 0 ? (
            <Loader />
          ) : (
            <Container maxWidth={"container.lg"} marginRight={"20"}>
              <Tabs isFitted variant="solid-rounded" colorScheme={"messenger"}>
                <TabList mb="1em">
                  <Tab>Details</Tab>
                  <Tab>Comments</Tab>
                  <Tab>Todos</Tab>
                  <Tab>Users</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                   <Details data={proj}/>
                  </TabPanel>
                  <TabPanel>
                    <Comment comment={proj[0].comments}/>
                  </TabPanel>
                  <TabPanel>
                    <Todo todo={proj && proj[0].todo}/>
                  </TabPanel>
                  <TabPanel>
                    {users && <Table org={users}/>}
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

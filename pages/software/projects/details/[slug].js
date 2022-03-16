import { useRouter } from "next/router";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader";
import { useEffect } from "react";
import { fetchData } from "../../../../redux/org/action";
import {
  Heading,
  Container,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Details from '../../../../Components/project.details'
import Comment from '../../../../Components/Comment/Index'

function Slug() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.org);
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();
  const proj = data && data.projects.filter((e) => e.id == router.query.slug);
  useEffect(() => {
    dispatch(fetchData(userInfo._id));
  }, []);
  return (
    <div>
      <Head>
        <title>WispyProject - Project-Details</title>
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <>
          {proj == undefined || null ? (
            <Loader />
          ) : (
            <Container maxWidth={"container.lg"} marginRight={"20"}>
              <Tabs isFitted variant="soft-rounded" colorScheme={"facebook"}>
                <TabList mb="1em">
                  <Tab>Details</Tab>
                  <Tab>Comments</Tab>
                  <Tab>Todos</Tab>
                  <Tab>Attachments</Tab>
                  <Tab>Users</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                   <Details data={proj}/>
                  </TabPanel>
                  <TabPanel>
                    <Comment comment={proj.comments}/>
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

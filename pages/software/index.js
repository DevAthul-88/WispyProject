import React, { useEffect } from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
import Head from "next/head";
import { BarChart } from "../../Components/Charts/Bar";
import { PieChart } from "../../Components/Charts/Pie";
import Status from "../../Components/status";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader";
import { fetchData } from "../../redux/org/action";

function index() {
  const { data, error, loading } = useSelector((state) => state.org);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(fetchData(userInfo._id));
  }, []);
  return (
    <Container maxWidth={"container.lg"} marginRight={"14"}>
      <Head>
        <title>WispyProject - Dashboard</title>
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Status
            p={data && data.projects.length}
            e={data && data.employees.length}
            t={data && data.tickets.length}
          />
          {data && data.projects && (
            <Box borderWidth={"thin"} padding={"2"}>
              <BarChart projects={data.projects} />
            </Box>
          )}

          <Flex marginTop={"10"}>
            <Box borderWidth={"thin"} padding={"2"} width={"full"}>
             
            </Box>
            <Box
              height={"sm"}
              borderWidth={"thin"}
              padding={"2"}
              width={"full"}
            >
              <PieChart />
            </Box>
          </Flex>
        </>
      )}
    </Container>
  );
}

export default index;

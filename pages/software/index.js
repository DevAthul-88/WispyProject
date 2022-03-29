import React from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
import Head from "next/head";
import { BarChart } from "../../Components/Charts/Bar";
import { PieChart } from "../../Components/Charts/Pie";
import Status from "../../Components/status";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";

function index() {
  const { data, error, loading } = useSelector((state) => state.org);
  return (
    <Container maxWidth={"container.lg"} marginRight={"14"}>
      <Head>
        <title>WispyProject - Dashboard</title>
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Status />
          <Box borderWidth={"thin"} padding={"2"}>
            <BarChart />
          </Box>

          <Flex marginTop={"10"}>
            <Box borderWidth={"thin"} padding={"2"} width={"full"}>
              <BarChart />
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

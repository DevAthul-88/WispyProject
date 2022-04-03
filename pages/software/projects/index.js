import React, { useEffect, useState } from "react";
import { Container, Flex, Text, Stack, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../redux/org/action";
import Loader from "../../../Components/Loader";
import Head from "next/head";
import NoData from "../../../Components/noData";
import { FaPlus } from "react-icons/fa";
import Modal from "../.../../../../Components/Modal/Modal.project";
import Tables from "../../../Components/Table/table.proj";
import Router from 'next/router'

function employees() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, error, loading } = useSelector((state) => state.org);
  const { reload } = useSelector((state) => state.project);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchData(userInfo.org));
    const token = JSON.parse(localStorage.getItem("token"));
    if(!token){
      Router.push("/login/")
    }
  }, [reload]);
  return (
    <>
      <Head>
        <title>WispyProject - Projects</title>
      </Head>
      <>
        {loading ? (
          <Loader />
        ) : (
          <Container maxWidth={"container.lg"} marginRight={"20"}>
            <Flex justify={"space-between"} marginBottom={"5"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                Project
              </Text>
              {userInfo && (
                <>
                  {userInfo.role === "ADMIN" ||
                  userInfo.role === "PROJECT_MANAGER" ? (
                    <Stack>
                      <Button
                        leftIcon={<FaPlus />}
                        colorScheme={"messenger"}
                        onClick={() => setToggle(true)}
                      >
                        New project
                      </Button>
                    </Stack>
                  ) : null}
                </>
              )}
            </Flex>
            <hr />

            {data && data.projects.length >= 1 ? (
              <>
                {" "}
                <Tables projects={data.projects} user={userInfo} />
              </>
            ) : (
              <Flex justify={"center"}>
                <NoData title={"No projects found."} />
              </Flex>
            )}
            {data && (
              <Modal
                toggle={toggle}
                setToggle={setToggle}
                data={data && data}
              />
            )}
            <Stack marginTop={"5"}></Stack>
          </Container>
        )}
      </>
    </>
  );
}

export default employees;

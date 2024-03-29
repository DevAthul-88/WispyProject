import React, { useEffect, useState } from "react";
import { Container, Flex, Text, Stack, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../redux/org/action";
import Loader from "../../../Components/Loader";
import Head from "next/head";
import NoData from "../../../Components/noData";
import { FaPlus } from "react-icons/fa";
import Modal from "../../../Components/Modal/Modal.emp";
import Tables from "../../../Components/Table/table.emp";
import Router from 'next/router'

function Index() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, error, loading } = useSelector((state) => state.org);
  const { refresh } = useSelector((state) => state.emp);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchData(userInfo.org));
    const token = JSON.parse(localStorage.getItem("token"));
    if(!token){
      Router.push("/login/")
    }
  }, [refresh]);

  return (
    <>
      <Head>
        <title>WispyProject - Employees</title>
      </Head>
      <>
        {loading ? (
          <Loader />
        ) : (
          <Container maxWidth={"container.lg"} marginRight={"20"}>
            <Flex justify={"space-between"} marginBottom={"5"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                Staff
              </Text>
              {userInfo && (
                <>
                  {userInfo.role === "ADMIN" ? (
                    <Stack>
                      <Button
                        leftIcon={<FaPlus />}
                        colorScheme={"messenger"}
                        onClick={() => setToggle(true)}
                      >
                        Add staff
                      </Button>
                    </Stack>
                  ) : null}
                </>
              )}
            </Flex>
            <hr />

            {data && data.employees.length >= 1 ? (
              <>
                {data && (
                  <Tables org={data.employees} user={userInfo && userInfo} />
                )}
              </>
            ) : (
              <Flex justify={"center"}>
                <NoData title={"No users found."} />
              </Flex>
            )}
            <Modal
              toggle={toggle}
              setToggle={setToggle}
              name={data && data.name}
            />
            <Stack marginTop={"5"}></Stack>
          </Container>
        )}
      </>
    </>
  );
}

export default Index;

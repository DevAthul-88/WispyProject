import React, { useEffect, useState } from "react";
import { Container, Flex, Text, Stack, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../redux/org/action";
import Loader from "../../../Components/Loader";
import Head from "next/head";
import NoData from "../../../Components/noData";
import { FaPlus } from "react-icons/fa";
import Modal from "../.../../../../Components/Modal/Modal.ticket";
import Tables from "../../../Components/Table/table.ticket";

function employees() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, error, loading } = useSelector((state) => state.org);
  const { refresh } = useSelector((state) => state.emp);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchData(userInfo._id));
  }, [refresh]);
  console.log(data);
  return (
    <>
      <Head>
        <title>WispyProject - Tickets</title>
      </Head>
      <>
        {loading ? (
          <Loader />
        ) : (
          <Container maxWidth={"container.lg"} marginRight={"20"}>
            <Flex justify={"space-between"} marginBottom={"5"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                Tickets
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
                        New ticket
                      </Button>
                    </Stack>
                  ) : null}
                </>
              )}
            </Flex>
            <hr />

            {data && data.tickets.length >= 1 ? (
              <>
                {" "}
                <Tables projects={data.tickets} user={userInfo} />
              </>
            ) : (
              <Flex justify={"center"}>
                <NoData title={"No tickets found."} />
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

import React, { useEffect , useState } from "react";
import { Container, Flex , Text , Stack , Button} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/org/action";
import Loader from "../../Components/Loader";
import Head from "next/head";
import NoData from "../../Components/noData";
import {FaPlus} from 'react-icons/fa';
import Modal from '../../Components/Modal/Modal.emp'
import Tables from '../../Components/Table/table.emp'

function employees() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, error, loading } = useSelector((state) => state.org);
  const [toggle , setToggle] = useState(false)

  useEffect(() => {
    dispatch(fetchData(userInfo._id));
  }, []);

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
           <Text fontSize={"2xl"} fontWeight={"bold"}>Employee</Text>
              <Stack>
              <Button leftIcon={<FaPlus />} colorScheme={"messenger"} onClick={() => setToggle(true)}>Add user</Button>
              </Stack>
           </Flex>
           <hr />
            
            {data && data.employees.length >= 1 ? (
              ""
            ) : (
              <Flex justify={"center"}>
                <NoData title={"No users found."} />
              </Flex>
            )}
         <Modal toggle={toggle} setToggle={setToggle} name={data && data.name}/>
         <Stack marginTop={"5"}>
         <Tables />
         </Stack>

          </Container>
        )}
      </>
    </>
  );
}

export default employees;

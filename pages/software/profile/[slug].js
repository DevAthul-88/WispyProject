import { Container   , Avatar , Flex} from "@chakra-ui/react";
import React from "react";
import { useSelector} from "react-redux";
import Loader from "../../../Components/Loader";

function slug() {
  const { userInfo, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth={"container.lg"} marginRight={"20"}>
          <Flex>
              <Avatar name={userInfo && userInfo.username}/>
          </Flex>
        </Container>
      )}
    </>
  );
}

export default slug;

import { Heading, Button, Stack, Divider } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function other({ data, de, org }) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      {userInfo && (
        <>
          {de.completed.flagged ? (
            <>
              <Heading fontSize={"xl"}>
                This project is flagged as completed
              </Heading>
              {userInfo.role === "ADMIN" || userInfo.role === "PROJECT_MANAGER" ? (
            <>
              <Button colorScheme={"messenger"} marginTop={"5"} variant="outline">
                Complete project
              </Button>
            </>
          ) : null}
            </>
          ) : (
            "This project is not completed yet"
          )}
          {userInfo.role === "ADMIN" || userInfo.role === "PROJECT_MANAGER" ? (
            <>
              <Divider marginTop={"5"} />
              <Button colorScheme={"red"} marginTop={"5"} variant="outline">
                Delete project
              </Button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default other;

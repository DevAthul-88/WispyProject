import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import Comments from "./Comments";
import Form from "./Form";

function Index({ comment }) {
  return (
    <>
      <Stack >
        <Comments comment={comment} />
      </Stack>
      <Stack>
        <Form />
      </Stack>
    </>
  );
}

export default Index;

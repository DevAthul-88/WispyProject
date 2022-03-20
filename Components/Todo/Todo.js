import React from "react";
import Index from "./Index";
import Alert from "../noData";
import { Flex, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function Todo({ todo }) {
  return (
    <div>
      <Flex justify={"space-between"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Create a todo
        </Text>
        <Button colorScheme={"messenger"} leftIcon={<AddIcon />}>
          Add todo
        </Button>
      </Flex>
      {todo.length <= 1 ? <Alert title={"No todos found!"} /> : <Index />}
    </div>
  );
}

export default Todo;

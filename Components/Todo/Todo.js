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
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Todo({ todo, users }) {
  const { userInfo } = useSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Flex justify={"space-between"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Todos
        </Text>
        {userInfo !== null && userInfo !== undefined ? (
          <>
            {userInfo.role === "ADMIN" ||
            userInfo.role === "PROJECT_MANAGER" ? (
              <Button
                colorScheme={"messenger"}
                leftIcon={<AddIcon />}
                onClick={onOpen}
              >
                Add todo
              </Button>
            ) : (
              <>
                {users.includes((e) => e.id === userInfo._id) ? (
                  <Button
                    colorScheme={"messenger"}
                    leftIcon={<AddIcon />}
                    onClick={onOpen}
                  >
                    Add todo
                  </Button>
                ) : null}
              </>
            )}
          </>
        ) : null}
      </Flex>
      {todo.length <= 1 ? <Alert title={"No todos found!"} /> : <Index />}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Todo;

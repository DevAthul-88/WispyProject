import React from "react";
import {
  Divider,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";

function deleteProject({ userInfo, de, org }) {
  const dispatch = useDispatch();
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleFinish = async () => {
    setLoading(true);
    const omi = await axios.patch("/api/ticket/", {
      orgId: org._id,
      ticket: router.query.slug,
    });
    if (omi.data.error) {
      console.error(omi.data.error);
      setLoading(false);
    }
    if (omi.data.success){
      setReload(true)
      window.location.href = "/software/tickets"
    };
  };



  return (
    <React.Fragment>
      {userInfo.role === "ADMIN" || userInfo.role === "PROJECT_MANAGER" ? (
        <>
         
          <Button colorScheme={"red"} marginTop={"5"} variant="outline" onClick={onOpen}>
            Delete ticket
          </Button>
        </>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are sure want to delete this ticket</ModalBody>

          <ModalFooter>
            <Button colorScheme="messenger" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme={"red"}
              onClick={handleFinish}
              isLoading={loading}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default deleteProject;

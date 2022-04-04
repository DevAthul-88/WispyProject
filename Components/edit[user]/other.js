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
import { useSelector } from "react-redux";

function deleteProject({ data, id }) {
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.auth);
  const handleFinish = async () => {
    setLoading(true);
    const omi = await axios.post("/api/org/emp_delete", {
      orgId: id,
      emp: router.query.slug,
    });
    if (omi.data.error) {
      console.error(omi.data.error);
      setLoading(false);
    }
    if (omi.data.success) {
      setReload(true);
      window.location.href = "/software/staff";
    }
  };

  return (
    <React.Fragment>
      {userInfo.role === "ADMIN" || userInfo.role === "PROJECT_MANAGER" ? (
        <>
          <Button
            colorScheme={"red"}
            marginTop={"5"}
            variant="outline"
            onClick={onOpen}
          >
            Delete staff
          </Button>
        </>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are sure want to delete this staff</ModalBody>

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

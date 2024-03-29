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
import { fetchData } from "../../redux/org/action";
import { useDispatch } from "react-redux";

function deleteProject({ userInfo, de, org }) {
  const dispatch = useDispatch();
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleFinish = async () => {
    setLoading(true);
    const omi = await axios.put("/api/project/finish", {
      orgId: org._id,
      projectId: router.query.slug,
    });
    if (omi.data.error) {
      console.error(omi.data.error);
      setLoading(false);
    }
    if (omi.data.success) return setReload(true);
  };

  React.useEffect(() => {
    if (reload === true) {
      window.location.href = "/software/projects"
    }
  }, [reload]);

  return (
    <React.Fragment>
      {userInfo.role === "ADMIN" || userInfo.role === "PROJECT_MANAGER" ? (
        <>
          <Divider marginTop={"5"} />
          <Button colorScheme={"red"} marginTop={"5"} variant="outline" onClick={onOpen}>
            Delete project
          </Button>
        </>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are sure want to delete this project</ModalBody>

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

import {
  Heading,
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
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchData } from "../../redux/org/action";
import { useRouter } from "next/router";
import DeleteProject from "./delete";

function other({ data, de, org }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useSelector((state) => state.auth);
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleFinish = async () => {
    setLoading(true);
    const omi = await axios.patch("/api/project/finish", {
      orgId: org._id,
      projectId: router.query.slug,
    });
    if (omi.data.error) {
      console.error(omi.data.error);
      setLoading(false);
    }
    if (omi.data.success) return setReload(true);
  };

  useEffect(() => {
    if (reload === true) {
      dispatch(fetchData(userInfo._id));
    }
  }, [reload]);

  return (
    <div>
      {userInfo && (
        <>
          {de.completed.approved == true ? (
            <>
              <Heading fontSize={"xl"}>
                This project is completed successfully
              </Heading>
            </>
          ) : (
            <>
              {de.completed.flagged ? (
                <>
                  <Heading fontSize={"xl"}>
                    This project is flagged as completed
                  </Heading>
                  {userInfo.role === "ADMIN" ||
                  userInfo.role === "PROJECT_MANAGER" ? (
                    <>
                      <Button
                        colorScheme={"messenger"}
                        marginTop={"5"}
                        variant="outline"
                        onClick={onOpen}
                      >
                        Complete project
                      </Button>
                    </>
                  ) : null}
                </>
              ) : (
                "This project is not completed yet"
              )}
            </>
          )}
          <DeleteProject userInfo={userInfo} de={de} org={org} />
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are sure want to finish this project as completed
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="messenger" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme={"green"}
              onClick={handleFinish}
              isLoading={loading}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default other;

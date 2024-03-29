import React from "react";
import Message from "../../noData";
import { Box, Avatar, Text, Flex, Link, Button } from "@chakra-ui/react";
import { format } from "timeago.js";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useSelector, useDispatch } from "react-redux";
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
import axios from "axios";
import { fetchData } from "../../../redux/org/action";
import Alert from "../../Alert";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";

function Comments({ comment }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.org);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleDelete = async (id) => {
    setLoading(true);
    const dir = await axios.post("/api/ticket/deleteComment", {
      id: id,
      orgId: data._id,
      projectId: router.query.slug,
    });
    if (dir.data.error) {
      setLoading(false);
      return setError(dir.data.error);
    }
    if (dir.data.refresh) {
      setChange(dir.data.refresh);
    }
  };

  React.useEffect(() => {
    if (change) {
      dispatch(fetchData(userInfo.org));
    }
  }, [change]);

  return (
    <div>
      {error && <Alert trigger={true} description={error} type="error" />}
      {comment.length <= 0 ? (
        <Message title={"no comments"} />
      ) : (
        <div>
          {comment.map((e, index) => {
            return (
              <Box
                borderWidth={"thin"}
                borderRadius="md"
                padding={"4"}
                key={index}
                marginTop={"2"}
              >
                <Flex>
                  <Avatar name={e.username} marginRight={"2"} />
                  <Link
                    display={"inline-block"}
                    marginTop={"2"}
                    as={NextLink}
                    href={
                      userInfo._id === e.userId
                        ? `/software/profile`
                        : `/software/profile/${e.userId}`
                    }
                  >
                    {e.username}
                  </Link>
                </Flex>
                <Text marginTop={"5"}>
                  <ReactMarkdown
                    children={e.comment}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            children={String(children).replace(/\n$/, "")}
                            showLineNumbers
                            language={match[1]}
                            PreTag="div"
                            customStyle={{ background: "none" }}
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </Text>
                <Flex justify={"space-between"}>
                  <Text marginTop={"2"}>{format(e.createdAt)}</Text>
                  {userInfo !== null && userInfo !== undefined ? (
                    <>
                      {userInfo.role == "ADMIN" ||
                      userInfo.role == "PROJECT_MANAGER" ? (
                        <Button colorScheme={"red"} size="sm" onClick={onOpen}>
                          Delete
                        </Button>
                      ) : (
                        <>
                          {userInfo._id == e.userId ? (
                            <Button
                              colorScheme={"red"}
                              size="sm"
                              onClick={onOpen}
                            >
                              Delete
                            </Button>
                          ) : null}
                        </>
                      )}
                    </>
                  ) : null}
                </Flex>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Alert</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are sure want to delete this comment</ModalBody>

                    <ModalFooter>
                      <Button colorScheme="messenger" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        colorScheme={"red"}
                        onClick={() => handleDelete(e.id)}
                        isLoading={loading}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Comments;

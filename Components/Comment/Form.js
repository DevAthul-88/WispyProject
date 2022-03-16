import React from "react";
import { Textarea, Button } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Form() {
  const router = useRouter();
  const { data } = useSelector((state) => state.org);
  const { userInfo } = useSelector((state) => state.auth);
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentObj = {
      userId: userInfo._id,
      orgId: data._id,
      username: userInfo.username,
      projectId: router.query.slug,
      comment: comment,
    };

    const dir = axios.post("/api/project/comment", commentObj);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Describe your comment here"
          colorScheme={"messenger"}
          onChange={(e) => setComment(e.target.value)}
          required
        ></Textarea>
        <Button
          marginTop={"5"}
          colorScheme={"messenger"}
          type="submit"
          isLoading={loading}
        >
          Add Comment
        </Button>
      </form>
    </div>
  );
}

export default Form;

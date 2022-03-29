import React from "react";
import { Textarea, Button } from "@chakra-ui/react";
import axios from "axios";
import { useSelector , useDispatch  } from "react-redux";
import { useRouter  } from "next/router";
import { fetchData } from "../../redux/org/action";
import Alert from '../Alert'

function Form() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.org);
  const { userInfo } = useSelector((state) => state.auth);
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [change , setChange] = React.useState(false)
  const [error , setError] = React.useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentObj = {
      userId: userInfo._id,
      orgId: data._id,
      username: userInfo.username,
      projectId: router.query.slug,
      comment: comment,
    };

    const dir = await axios.post("/api/project/comment", commentObj);
    if(dir.data.error) {
      setLoading(false)
      return setError(dir.data.error)
    }
    if(dir.data.refresh){
         setChange(dir.data.refresh)
    }
  };

  React.useEffect(() => {
    if(change){
      dispatch(fetchData(userInfo._id));
    }
  }, [change]);

  return (
    <div >
   {error && <Alert trigger={true} type="error" description={error} />}
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

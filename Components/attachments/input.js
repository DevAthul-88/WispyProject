import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import getConfig from "next/config";
import { fetchData } from "../../redux/org/action";
import {useDispatch , useSelector} from 'react-redux'

function Accept({ ticket, orgId }) {
  const { publicRuntimeConfig } = getConfig();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state) => state.auth)

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg,image/png",
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path} style={{ padding: "0.2rem" }}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const path = acceptedFiles.map((file) => {
    return file;
  })[0];

  const handleUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", path);
    formData.append("upload_preset", "xzsccl4t");
    formData.append("api_key", publicRuntimeConfig.KYE);
    formData.append("timestamp", (Date.now() / 1000) | 0);
    return axios
      .post(
        `https://api.cloudinary.com/v1_1/${publicRuntimeConfig.NAME}/image/upload`,
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      )
      .then((response) => {
        const data = response.data;
        const fileURL = data.secure_url;
        const attachment = {
          url: fileURL,
          ticketId: ticket,
          ordId: orgId,
          filename: acceptedFiles.map((file) => {
            return file.name;
          })[0],
          fileSize: acceptedFiles.map((file) => {
            return file.size;
          })[0],
        };

        axios.post("/api/ticket/upload", attachment).then((response) => {
          if (response.data.refresh) {
            setLoading(false);
            dispatch(fetchData(userInfo._id));
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  return (
    <section className="container">
      <Box
        padding="5"
        textAlign="center"
        border="2px"
        borderRadius={"4px"}
        borderColor="gray.400"
        borderStyle={"dotted"}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </Box>
      <Button
        colorScheme="messenger"
        marginTop={"5"}
        onClick={handleUpload}
        isLoading={loading}
      >
        {loading ? "Uploading...." : "Upload"}
      </Button>
      <aside>
        <h4 style={{ marginTop: "0.4rem" }}>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4 style={{ marginTop: "0.4rem" }}>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

export default Accept;

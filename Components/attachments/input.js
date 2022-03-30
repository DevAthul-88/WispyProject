import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import getConfig from 'next/config';


function Accept() {

  const publicRuntimeConfig = getConfig();
  console.log(publicRuntimeConfig);
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
    return file.path;
  })[0];

  const handleUpload = () => {
    
    const formData = new FormData();
    formData.append("file", path);
    formData.append("upload_preset", "athul");
    formData.append("api_key", process.env.CLOUD_KEY);
    formData.append("timestamp", (Date.now() / 1000) | 0);
    return axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      )
      .then((response) => {
        const data = response.data;
        const fileURL = data.secure_url;
        console.log(data);
      })
      .catch((err) => {
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
      <Button colorScheme="messenger" marginTop={"5"} onClick={handleUpload}>
        Upload
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


import React from "react";
import { Text } from "@chakra-ui/react";
import Input from "./input";
import Table from "../Table/table.attach";
import No from "../noData";

function ticket({ ticket, orgId, data }) {
  return (
    <div>
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Tickets attachments
      </Text>
      <Input ticket={ticket} orgId={orgId} />
      {data == undefined || data == null ? (
        <No title={"No attachments found!"} />
      ) : (
        <Table org={data} ticket={ticket} orgId={orgId}/>
      )}
    </div>
  );
}

export default ticket;

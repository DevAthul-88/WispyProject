import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { FaArrowDown } from "react-icons/fa";

function ticket({ data }) {
  const headers = [
    {
      label: "Id",
      key: "_id",
    },
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Type",
      key: "type",
    },
    {
      label: "Priority",
      key: "priority",
    },
    {
      label: "Created",
      key: "createdAt",
    },
  ];
  return (
    <div>
      <Menu>
        <MenuButton
          colorScheme={"whatsapp"}
          as={Button}
          aria-label="Options"
          rightIcon={<FaArrowDown />}
          variant="outline"
        >
          Export data
        </MenuButton>
        <MenuList>
          <MenuItem>
            <CSVLink
              data={data}
              headers={headers}
              filename="Employees_data.csv"
            >
              Export to CSV
            </CSVLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default ticket;

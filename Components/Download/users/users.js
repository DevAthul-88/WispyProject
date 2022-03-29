import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { FaFileCsv, FaArrowDown } from "react-icons/fa";
function users({ data }) {
  const headers = [
    {
      label: "Id",
      key: "_id",
    },
    {
      label: "Username",
      key: "username",
    },

    {
      label: "Email",
      key: "email",
    },
    {
      label: "Role",
      key: "role",
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
          <MenuItem icon={<FaFileCsv />}>
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

export default users;

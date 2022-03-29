import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { FaFileCsv, FaArrowDown } from "react-icons/fa";
function users({ data }) {
  const headers = [
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
  ]
  return (
    <div>
      <Menu>
        <MenuButton
          as={Button}
          aria-label="Options"
          rightIcon={<FaArrowDown />}
          variant="outline"
        >
          Export data
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FaFileCsv />} onClick={() => (
            <CSVLink 
            headers={headers} 
            filename="employees.csv"
            data={data}
            />
          )}>Export to csv</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default users;

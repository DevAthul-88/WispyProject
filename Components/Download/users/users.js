import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  IconButton,
  MenuGroup,
  Button,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { FaFileCsv, FaArrowDown } from "react-icons/fa";
function users() {
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
          <MenuItem icon={<FaFileCsv />}>Export to csv</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default users;

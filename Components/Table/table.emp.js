import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Select,
  Link,
  Flex,
  Input,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  Portal,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { useTable, useSortBy, usePagination } from "react-table";
import NextLink from "next/link";
import Export from "../Download/users/users";
import { useSelector } from "react-redux";

function DataTable({ org, user }) {
  const data = React.useMemo(() => org, []);
  const { userInfo } = useSelector((state) => state.auth);
  const columns = React.useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "av",
        Cell: ({ row }) => <Avatar name={row.original.username} />,
      },
      {
        Header: "username",
        accessor: "username",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "role",
        accessor: "role",
      },
      {
        Header: "View profile",
        accessor: "profile",
        Cell: ({ row }) => (
          <>
            <Link
              as={NextLink}
              href={
                userInfo._id === row.original._id
                  ? `/software/profile`
                  : `/software/profile/${row.original._id}`
              }
            >
              View profile
            </Link>
          </>
        ),
      },

      {
        accessor: "edit",
        Cell: ({ row }) => (
          <>
            {user.role === "ADMIN" ||
              (user.role === "PROJECT_MANAGER" && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<SettingsIcon />}
                    variant="outline"
                  />
                  <Portal>
                    <MenuList>
                      <MenuItem>
                        <Link
                          as={NextLink}
                          href={`/software/employees/edit/${row.original._id}`}
                        >
                          Edit / Delete
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              ))}
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    prepareRow,
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <>
      <Flex justify={"space-between"} marginTop="5">
        <Export data={org} />
        <div className="pagination">
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            colorScheme="messenger"
          >
            {"<"}
          </Button>{" "}
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            colorScheme="messenger"
          >
            {">"}
          </Button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <Input
              focusBorderColor="messenger.500"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <Select
            marginTop={"4"}
            focusBorderColor="messenger.500"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </div>
      </Flex>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default DataTable;

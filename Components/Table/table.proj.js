import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  Select,
  Input,
  Button,
  Link,
  Badge,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, usePagination } from "react-table";
import NextLink from "next/link";

function DataTable({ projects, user }) {
  const colorScheme = (priority) => {
    if (priority == "high") {
      return "red";
    } else if (priority == "medium") {
      return "yellow";
    } else if (priority == "low") {
      return "green";
    } else {
      return "none";
    }
  };
  const data = React.useMemo(() => projects, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "title",
        accessor: "title",
      },
      {
        Header:"Completed",
        accessor:"approved",
        Cell: ({ row }) => (
          <>
            <Badge colorScheme={row.original.completed.approved == false ? "yellow" : "green"}>
              {row.original.completed.approved.toString()}
            </Badge>
          </>
        ),
      },
      {
        Header:"Flagged as completed",
        accessor:"completed",
        Cell: ({ row }) => (
          <>
            <Badge colorScheme={row.original.completed.flagged == false ? "yellow" : "green"}>
              {row.original.completed.flagged.toString()}
            </Badge>
          </>
        ),
      },
      {
        Header: "priority",
        accessor:"priority",
        Cell: ({ row }) => (
          <>
            <Badge colorScheme={colorScheme(row.original.priority)}>
              {row.original.priority}
            </Badge>
          </>
        ),
      },
      {
        Header: "View details",
        Cell: ({ row }) => (
          <>
            <Link
              as={NextLink}
              href={`/software/projects/details/${row.original._id}`}
            >
              View details
            </Link>
          </>
        ),
      },

      user.role === "ADMIN" || user.role === "PROJECT_MANAGER"
        ? {
            Header: "Edit / Delete",
            Cell: ({ row }) => (
              <>
                <Link
                  as={NextLink}
                  href={`/software/projects/edit/${row.original._id}`}
                >
                  Edit / Delete
                </Link>
              </>
            ),
          }
        : null,
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
        <div></div>
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

import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra , Link , Avatar} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy} from "react-table";
import NextLink from 'next/link'

function DataTable({ org }) {
  const data = React.useMemo(() => org, []);

  const columns = React.useMemo(
    () => [
      
      {
         Header:"Avatar",
         accessor: "av",
         Cell:({row}) => (<Avatar name={row.original.username}/>)
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
        Cell: ({ row }) => (<>
        <Link as={NextLink} href={`/software/profile/${row.original._id}`} >View profile</Link>
        </> )
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
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
        {rows.map((row) => {
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
  );
}

export default DataTable;

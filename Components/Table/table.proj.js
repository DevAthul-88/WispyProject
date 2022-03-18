import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra , Link ,Badge} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy} from "react-table";
import NextLink from 'next/link'

function DataTable({ projects , user }) {
    const colorScheme = (priority) => {
        if(priority == "high"){
            return 'red'
        }
        else if(priority == "medium"){
            return "yellow"
        }
        else if(priority == "low"){
            return "green"
        }
        else{
            return "none"
        }
    }
  const data = React.useMemo(() => projects, []);

  const columns = React.useMemo(
    () => [
      
     
      {
        Header: "title",
        accessor: "title",
      },
      {
        Header: "description",
        accessor: "description",
      },
      {
        Header: "priority",
        Cell: ({ row }) => (<>
            <Badge colorScheme={colorScheme(row.original.priority)}>{row.original.priority}</Badge>
            </> )
      },
      {
        Header: "View profile",
        Cell: ({ row }) => (<>
        <Link  as={NextLink} href={`/software/projects/details/${row.original.id}`} >View details</Link>
        </> )
      },

       user.role === "ADMIN" || user.role === "PROJECT_MANAGER" ?  {
        Header: "Edit / Delete",
        Cell: ({ row }) => (<>
        <Link as={NextLink} href={`/software/projects/edit/${row.original.id}`} >Edit / Delete</Link>
        </> )
      } : null
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
            <Tr {...row.getRowProps()} >
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

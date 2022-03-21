import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Select,
  Flex,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, usePagination } from "react-table";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchData } from "../../redux/org/action";
import { useRouter } from "next/router";
import { useSelector , useDispatch } from "react-redux";


function DataTable({ orgId }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [id  , setId] = useState("")
  const {userInfo} = useSelector((state) => state.auth)
  const [todo, setTodo] = React.useState([]);
  useEffect(() => {
    async function fetchTodo() {
      const omi = await axios.get(
        `/api/org/todo/?query=${router.query.slug}&orgId=${orgId}`
      );
      if (omi.data.error) return console.log(omi.data.error);
      const final =
        omi.data.data !== undefined && omi.data.data !== null
          ? omi.data.data.projects.filter((e) => {
              return e.id === router.query.slug;
            })
          : [[]];
      setTodo(final[0].todo);
    }
    fetchTodo();
  }, []);
  const data = React.useMemo(() => todo, [todo]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Edit",
        Cell: ({ row }) => (
          <>
            <Button colorScheme={"messenger"}>
              <FaPen />
            </Button>
          </>
        ),
      },
      {
        Header: "Delete",
        Cell: ({ row }) => (
          <>
            <Button colorScheme="red" onClick={() => handleId(row.original.id)}>
              <FaTrash />
            </Button>
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

  const handleId = (id) => {
    setId(id)
    onOpen()
  }
  const handleDelete  = async () => {
    const omi = await axios.delete(`/api/org/todo/?query=${router.query.slug}&orgId=${orgId}&todo=${id}`)
    if(omi.data.reload){
      dispatch(fetchData(userInfo._id))
    }
  }

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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are sure want to delete this todo</ModalBody>

          <ModalFooter>
            <Button colorScheme="messenger" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={"red"} onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DataTable;

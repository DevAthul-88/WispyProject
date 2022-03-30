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
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, usePagination } from "react-table";
import { format } from "timeago.js";
import axios from "axios"
import {useSelector , useDispatch} from 'react-redux'
import { fetchData } from "../../redux/org/action";

function DataTable({ org , ticket  , orgId}) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const data = React.useMemo(() => org, []);
  const [image, setImage] = React.useState("");
  const [loading , setLoading] = React.useState(false);
  const [change , setChange] = React.useState(false);
  const [number , setNumber] = React.useState("");
  const [toggle,  setToggle] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const open = (params) => {
    onOpen();
    setImage(params);
  };

  const open2 = (params) => {
    setToggle(true)
    setNumber(params)
  };

  const handleDelete = async (params) => {
     try {
       setLoading(true)
       const da = {
         ticket:ticket,
         orgId:orgId,
         attachId:number
       }
       const omi = await axios.put("/api/ticket/upload" , da) 
       if(omi.data.reload){
         setChange(true)
       }
     } catch (error) {
       setLoading(false)
       console.error(error.message);
     }
  }

  React.useEffect(() => {
    if (change) {
      dispatch(fetchData(userInfo._id));
    }
  }, [change]);


  const columns = React.useMemo(
    () => [
      {
        Header: "filename",
        accessor:"filename",
        Cell: ({ row }) => (
          <>
            <Button variant={"link"} onClick={() => open(row.original.url)}>
              {row.original.filename}
            </Button>
          </>
        ),
      },
      {
        Header: "size",
        accessor: "fileSize",
        Cell: ({ row }) => `${row.original.fileSize} bytes`,
      },
      {
        Header: "Uploaded",
        accessor: "Uploaded",
        Cell: ({ row }) => `${format(row.original.createdAt)}.`,
      },

      {
        accessor: "delete",
        Cell: ({ row }) => (
          <>
            <Button variant={"link"} color={"red"} onClick={() => open2(row.original._id)}>
              Delete attachment
            </Button>
          </>
        ),
      }
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

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Attachment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image} objectFit="cover" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

                  <Modal isOpen={toggle} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Alert</ModalHeader>
                    <ModalBody>Are sure want to delete this attachment</ModalBody>

                    <ModalFooter>
                      <Button colorScheme="messenger" mr={3} onClick={() => setToggle(false)}>
                        Close
                      </Button>
                      <Button
                        colorScheme={"red"}
                        onClick={() => handleDelete()}
                        isLoading={loading}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

    </>
  );
}

export default DataTable;

import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Input,
  Button,
  Flex,
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Checkbox,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
} from "@chakra-ui/react";
import { MdSearch, MdDelete } from "react-icons/md";
import { FaFileExcel, FaFilePdf, FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ViewPost from '../AdminComponents/Affiliate/ViewJob';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const downloadPDF = (data) => {
  const doc = new jsPDF();

  const tableColumn = [
    "S.No",
    "Full Name",
    "Email",
    "Phone Number",
    "Company Name",
    "Company Email",
    "Designation",
    "Date",
  ];

  const tableRows = [];

  data.forEach((affiliate, index) => {
    const affiliateData = [
      index + 1,
      affiliate.fullName,
      affiliate.email,
      affiliate.phoneNumber,
      affiliate.companyName,
      affiliate.companyEmail,
      affiliate.designation,
      moment(affiliate.createdAt).format("DD-MM-YYYY"),
    ];

    tableRows.push(affiliateData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 123, 255] }, // Customize header color
  });

  doc.save('affiliates.pdf');
};

const downloadExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Affiliates');

  worksheet.columns = [
    { header: 'S.No', key: 'sno', width: 10 },
    { header: 'Full Name', key: 'fullName', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone Number', key: 'phoneNumber', width: 20 },
    { header: 'Company Name', key: 'companyName', width: 30 },
    { header: 'Company Email', key: 'companyEmail', width: 30 },
    { header: 'Designation', key: 'designation', width: 20 },
    { header: 'Date', key: 'Date', width: 15 },
  ];

  data.forEach((affiliate, index) => {
    worksheet.addRow({
      sno: index + 1,
      fullName: affiliate.fullName,
      email: affiliate.email,
      phoneNumber: affiliate.phoneNumber,
      companyName: affiliate.companyName,
      companyEmail: affiliate.companyEmail,
      designation: affiliate.designation,
      Date: moment(affiliate.createdAt).format("DD-MM-YYYY"),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'affiliates.xlsx');
};

const AffiliatePanel = () => {
  const navigate = useNavigate(); // Create navigate function
  const [search, setSearch] = useState("");
  const [selectedAffiliates, setSelectedAffiliates] = useState({});
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);
  const [affiliateData, setAffiliateData] = useState([]); // Empty array as initial state
  const [currentPage, setCurrentPage] = useState(1);
  const affiliatesPerPage = 10;
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();
  const [jobCounts, setJobCounts] = useState({});
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(null);
  const { isOpen: isViewPostOpen, onOpen: onViewPostOpen, onClose: onViewPostClose } = useDisclosure();

  const viewJobs = (affiliateId) => {
    setSelectedAffiliateId(affiliateId);
    navigate(`/admin/view-post/${affiliateId}`); // Navigate to the new page
  };

  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/affiliate`);
        if (Array.isArray(response.data.affiliates)) {
          setAffiliateData(response.data.affiliates);
          // Fetch job counts for each affiliate
          const counts = await Promise.all(
            response.data.affiliates.map(async (affiliate) => {
              const countResponse = await axios.get(`${apiUrl}/api/affiliateJob/count/${affiliate._id}`);
              return { id: affiliate._id, count: countResponse.data.count };
            })
          );
          // Convert counts to an object for easy access
          const countsObject = counts.reduce((acc, { id, count }) => {
            acc[id] = count;
            return acc;
          }, {});
          setJobCounts(countsObject);
        } else {
          console.error("API response affiliates is not an array:", response.data.affiliates);
        }
      } catch (error) {
        console.error("Error fetching affiliate data:", error);
      }
    };
    fetchAffiliateData();
  }, []);

  const filteredData = affiliateData.filter((affiliate) =>
    affiliate.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAllOnPage = (e) => {
    const isChecked = e.target.checked;
    const newSelectedAffiliates = { ...selectedAffiliates };
    currentAffiliates.forEach((affiliate) => {
      newSelectedAffiliates[affiliate._id] = isChecked;
    });
    setSelectedAffiliates(newSelectedAffiliates);
  };

  const handleSelectAffiliate = (affiliateId) => {
    setSelectedAffiliates((prevSelected) => ({
      ...prevSelected,
      [affiliateId]: !prevSelected[affiliateId],
    }));
  };

  const handleSelectAllAcrossPages = () => {
    setSelectAllAcrossPages((prev) => {
      const newSelected = !prev;
      if (newSelected) {
        const newSelectedAffiliates = {};
        filteredData.forEach((affiliate) => {
          newSelectedAffiliates[affiliate._id] = true;
        });
        setSelectedAffiliates(newSelectedAffiliates);
      } else {
        setSelectedAffiliates({});
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(selectedAffiliates).filter(id => selectedAffiliates[id]);
    if (selectedIds.length > 0) {
      console.log(selectedIds);
      try {
        await axios.delete(`${apiUrl}/api/affiliate/delete`, {
          data: { affiliateIds: selectedIds }, // Change this line
        });
        setAffiliateData(prevData => prevData.filter(affiliate => !selectedIds.includes(affiliate._id)));
        setSelectedAffiliates({});
        setSelectAllAcrossPages(false);
      } catch (error) {
        console.error("Error deleting affiliate data:", error);
      }
    }
    onAlertClose();
  };

  const indexOfLastAffiliate = currentPage * affiliatesPerPage;
  const indexOfFirstAffiliate = indexOfLastAffiliate - affiliatesPerPage;
  const currentAffiliates = filteredData.slice(indexOfFirstAffiliate, indexOfLastAffiliate);

  const totalPages = Math.ceil(filteredData.length / affiliatesPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const selectedData = affiliateData.filter(affiliate => selectedAffiliates[affiliate._id]);

  return (
    <Box>
      <Container maxW="9xl" py={10} mt={20}>
        <Flex direction="column" align="center" justify="center" mb={10}>
          <Heading fontSize="3xl" fontFamily={"ClashDisplay"} color={"blue.400"}>
            AFFILIATE DETAILS
          </Heading>
        </Flex>
        <Stack spacing={2}>
          <Flex align="center" justify="space-between">
            <Input
              placeholder="Search by Full Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="md"
              width="300px"
            />
            <Button
              leftIcon={<FaFilePdf />}
              colorScheme="red"
              onClick={() => downloadPDF(currentAffiliates)}
            >
              Download PDF
            </Button>
            <Button
              leftIcon={<FaFileExcel />}
              colorScheme="green"
              onClick={() => downloadExcel(currentAffiliates)}
            >
              Download Excel
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<MdDelete />}
              onClick={onAlertOpen}
            >
              Delete
            </Button>
          </Flex>
        </Stack>

        <Table variant="striped" colorScheme="teal" mt={8}>
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isChecked={currentAffiliates.every(affiliate => selectedAffiliates[affiliate._id])}
                  onChange={handleSelectAllOnPage}
                  borderColor="black"
                />
              </Th>
              <Th>S.No</Th>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Company Name</Th>
              <Th>Company Email</Th>
              <Th>Designation</Th>
              <Th>Date</Th>
              <Th>Jobs Posted</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentAffiliates.map((affiliate, index) => (
              <Tr key={affiliate._id}>
                <Td>
                  <Checkbox
                    isChecked={!!selectedAffiliates[affiliate._id]}
                    onChange={() => handleSelectAffiliate(affiliate._id)}
                    borderColor="black"
                  />
                </Td>
                <Td>{indexOfFirstAffiliate + index + 1}</Td>
                <Td>{affiliate.fullName}</Td>
                <Td>{affiliate.email}</Td>
                <Td>{affiliate.phoneNumber}</Td>
                <Td>{affiliate.companyName}</Td>
                <Td>{affiliate.companyEmail}</Td>
                <Td>{affiliate.designation}</Td>
                <Td>{moment(affiliate.createdAt).format("DD-MM-YYYY")}</Td>
                <Td>
                  {jobCounts[affiliate._id] || 0}
                  <IconButton
                    icon={<FaEye />}
                    aria-label="View Jobs"
                    onClick={() => viewJobs(affiliate._id)} // Update to use navigate
                    size="sm"
                    ml={2}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Flex mt={4} justify="space-between" align="center">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            <FaArrowLeft />
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <FaArrowRight />
          </Button>
        </Flex>

        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onAlertClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Affiliates
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete the selected affiliate(s)? This action cannot be undone.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onAlertClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteSelected} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    </Box>
  );
};

export default AffiliatePanel;

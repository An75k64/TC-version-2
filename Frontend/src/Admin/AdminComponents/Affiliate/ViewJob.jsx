import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Collapse,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FaEye, FaArrowLeft, FaArrowRight, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const ViewPost = () => {
  const { affiliateId } = useParams();
  const [jobData, setJobData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showReferForm, setShowReferForm] = useState(null);
  const [referredStudents, setReferredStudents] = useState([]);
  const [formData, setFormData] = useState({ studentName: "", email: "", status: "", jobTitle: "" });
  const [newStatus, setNewStatus] = useState("");
  const [studentIdToUpdate, setStudentIdToUpdate] = useState(null);
  const jobsPerPage = 5;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/affiliatejob/${affiliateId}`);
        const jobsWithCount = await Promise.all(
          response.data.map(async (job) => {
            const countResponse = await axios.get(`${apiUrl}/api/referredstudentscount/${job._id}`);
            return { ...job, referredCount: countResponse.data.referredCount };
          })
        );
        setJobData(jobsWithCount);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobData();
  }, [affiliateId]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil((jobData.length || 0) / jobsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleViewReferredStudents = async (jobId) => {
    if (selectedJob === jobId) {
      setSelectedJob(null);
    } else {
      try {
        const response = await axios.get(`${apiUrl}/api/referredstudents/${jobId}`);
        setReferredStudents(response.data);
        setSelectedJob(jobId);
      } catch (error) {
        console.error("Error fetching referred students:", error);
      }
    }
  };

  const handleRefer = (jobId, jobTitle) => {
    setShowReferForm(showReferForm === jobId ? null : jobId);
    setFormData({ ...formData, jobTitle });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (jobId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/referstudent`, {
        jobId,
        affiliateId,
        ...formData,
      });
      console.log("Student referred:", response.data);
      setFormData({ studentName: "", email: "", status: "", jobTitle: "" });
      setShowReferForm(null);
      // Re-fetch job data to update referred count
      const updatedJobData = await axios.get(`${apiUrl}/api/affiliatejob/${affiliateId}`);
      setJobData(updatedJobData.data);
    } catch (error) {
      console.error("Error referring student:", error);
    }
  };

  const handleUpdateStatus = (studentId) => {
    setStudentIdToUpdate(studentId);
    onOpen();
  };

  const handleConfirmUpdateStatus = async () => {
    try {
      const response = await axios.put(`${apiUrl}/api/referredstudent/${studentIdToUpdate}`, { status: newStatus });
      console.log("Status updated:", response.data);
      setReferredStudents((prev) =>
        prev.map((student) => (student._id === studentIdToUpdate ? { ...student, status: newStatus } : student))
      );
      setNewStatus("");
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="8xl" py={10}>
        <Flex direction="column" align="center" justify="center" mb={10}>
          <Heading fontSize="2xl" color="blue.600">
            Jobs Posted by Affiliate
          </Heading>
        </Flex>

        <Table variant="striped" colorScheme="teal" mt={8}>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Job Title</Th>
              <Th>Skillset</Th>
              <Th>Experience</Th>
              <Th>Location</Th>
              <Th>Salary</Th>
              <Th>Date Posted</Th>
              <Th>Students Referred</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentJobs.map((job, index) => (
              <React.Fragment key={job._id}>
                <Tr>
                  <Td>{indexOfFirstJob + index + 1}</Td>
                  <Td>{job.jobTitle}</Td>
                  <Td>{job.skillset}</Td>
                  <Td>{job.experience}</Td>
                  <Td>{job.location}</Td>
                  <Td>{job.salary}</Td>
                  <Td>{moment(job.createdAt).format("DD-MM-YYYY")}</Td>
                  <Td>{job.referredCount || 0}</Td>
                  <Td>
                    <Button
                      leftIcon={<FaEye />}
                      size="sm"
                      mb={2}
                      colorScheme="blue"
                      onClick={() => handleViewReferredStudents(job._id)}
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<FaUserPlus />}
                      size="sm"
                      colorScheme="green"
                      onClick={() => handleRefer(job._id, job.jobTitle)}
                    >
                      Refer
                    </Button>
                  </Td>
                </Tr>

                {/* Referred Students Section */}
                {selectedJob === job._id && (
                  <Tr>
                    <Td colSpan="9">
                      <Collapse in={selectedJob === job._id}>
                        <Box p={4} borderWidth="1px" rounded="md" shadow="md" bg="gray.100">
                          <Text fontSize="lg" mb={4}>
                            Referred Students
                          </Text>
                          {referredStudents.map((student) => (
                            <Flex key={student._id} justify="space-between" mb={2}>
                              <Text>{student.studentName}</Text>
                              <Text>{student.email}</Text>
                              <Text>Status: {student.status}</Text>
                              <Button
                                size="sm"
                                colorScheme="blue"
                                onClick={() => handleUpdateStatus(student._id)}
                              >
                                Update Status
                              </Button>
                            </Flex>
                          ))}
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                )}

                {/* Refer Student Form */}
                {showReferForm === job._id && (
                  <Tr>
                    <Td colSpan="9">
                      <Collapse in={showReferForm === job._id}>
                        <Box p={4} borderWidth="1px" rounded="md" shadow="md" bg="white">
                          <Text fontSize="lg" mb={4}>
                            Refer a Student
                          </Text>
                          <FormControl id="studentName" mb={4}>
                            <FormLabel>Student Name</FormLabel>
                            <Input
                              name="studentName"
                              value={formData.studentName}
                              onChange={handleInputChange}
                              focusBorderColor="blue.500"
                              placeholder="Enter student name"
                            />
                          </FormControl>
                          <FormControl id="email" mb={4}>
                            <FormLabel>Email</FormLabel>
                            <Input
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              focusBorderColor="blue.500"
                              placeholder="Enter email"
                            />
                          </FormControl>
                          <FormControl id="status" mb={4}>
                            <FormLabel>Status</FormLabel>
                            <Input
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              focusBorderColor="blue.500"
                              placeholder="Enter status"
                            />
                          </FormControl>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleSubmit(job._id)}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>

        <Flex justify="space-between" mt={4}>
          <IconButton
            icon={<FaArrowLeft />}
            onClick={handlePrevPage}
            isDisabled={currentPage === 1}
            aria-label="Previous Page"
          />
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <IconButton
            icon={<FaArrowRight />}
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
            aria-label="Next Page"
          />
        </Flex>
      </Container>

      {/* Modal for updating status */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Student Status</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>New Status</FormLabel>
              <Input
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                placeholder="Enter new status"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleConfirmUpdateStatus}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ViewPost;

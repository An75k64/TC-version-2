import React, { useEffect, useState } from 'react';
import { Box, Grid, Flex, Text, Progress, Center } from '@chakra-ui/react';
import { FaUserGraduate, FaUniversity, FaBuilding, FaBriefcase , FaHandshake} from 'react-icons/fa';
import { MdContactMail } from "react-icons/md";
import CurrentDateTime from './CurrentDateTime';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const DashboardOverview = () => {
  const [collegeCount, setCollegeCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [jobPostCount, setJobPostCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [studentPostCount, setStudentPostCount] = useState(0);
  const [studentApplyCount, setStudentApplyCount] = useState(0);
  const [affiliateCount, setAffiliateCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [collegeRes, companyRes, jobPostRes, contactRes, studentPostRes, studentApplyRes, affiliateRes] = await Promise.all([
          fetch(`${apiUrl}/api/college/count`),
          fetch(`${apiUrl}/api/company/count`),
          fetch(`${apiUrl}/api/cards/count`),
          fetch(`${apiUrl}/api/contact/count`),
          fetch(`${apiUrl}/api/resumes/count`),
          fetch(`${apiUrl}/api/job-Applications/count`),
          fetch(`${apiUrl}/api/affiliate/count`) // Fetch affiliate count
        ]);

        const collegeData = await collegeRes.json();
        const companyData = await companyRes.json();
        const jobPostData = await jobPostRes.json();
        const contactData = await contactRes.json();
        const studentPostData = await studentPostRes.json();
        const studentApplyData = await studentApplyRes.json();
        const affiliateData = await affiliateRes.json();

        setCollegeCount(collegeData.count);
        setCompanyCount(companyData.count);
        setJobPostCount(jobPostData.count);
        setContactCount(contactData.count);
        setStudentPostCount(studentPostData.count);
        setStudentApplyCount(studentApplyData.count);
        setAffiliateCount(affiliateData.count); // Set affiliate count
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const summaryCards = [
    { title: 'Students (Posted Resumes)', value: studentPostCount, icon: <FaUserGraduate />, bgColor: 'blue.100' },
    { title: 'Students (Applied for Jobs)', value: studentApplyCount, icon: <FaUserGraduate />, bgColor: 'green.100' },
    { title: 'Total Colleges', value: collegeCount, icon: <FaUniversity />, bgColor: 'purple.100' },
    { title: 'Total Companies', value: companyCount, icon: <FaBuilding />, bgColor: 'yellow.100' },
    { title: 'Jobs Posted', value: jobPostCount, icon: <FaBriefcase />, bgColor: 'orange.100' },
    { title: 'Affiliate Register', value: affiliateCount, icon: <FaHandshake />, bgColor: 'blue.100' },
    { title: 'Contacted', value: contactCount, icon: <MdContactMail />, bgColor: 'red.100' },
  ];

  return (
    <Box mt={20}>
      <CurrentDateTime />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)', // 1 column for small screens
          sm: 'repeat(2, 1fr)', // 2 columns for small screens
          md: 'repeat(3, 1fr)'  // 3 columns for medium and larger screens
        }}
        gap={6}
        mb={6}
      >
        {summaryCards.map((card, index) => (
          <Box key={index} p={5} bg={card.bgColor} borderRadius="md" boxShadow="md">
            <Flex direction="column" alignItems="center">
              <Box fontSize="4xl" mb={2}>
                {card.icon}
              </Box>
              <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={2}>
                {card.title}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                {card.value}
              </Text>
            </Flex>
          </Box>
        ))}
       </Grid>
    </Box>
  );
};

export default DashboardOverview;

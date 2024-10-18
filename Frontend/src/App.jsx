import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Jobs from "./pages/Jobs.jsx";
import PostResume from "./components/Jobs/PostResume.jsx";
import CurrentOpening from "./components/Jobs/Openings/Opening.jsx";
import Employer from "./pages/Employer.jsx";
import College from "./pages/College.jsx";
import CampusToCubicle from "./pages/CampusToCubicle.jsx";
import Contact from "./pages/Contact.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer.jsx";
import CollegeForm from "./components/CampusToCubicle/CollegeForm.jsx";
import CompanyForm from "./components/CampusToCubicle/CompanyForm.jsx";
import OnCampus from "./components/Service/OnCampus/OnCampus.jsx";
import OffCampus from "./components/Service/OffCampus/OffCampus.jsx";
import Seminar from "./components/Service/Seminar/Seminar.jsx";
import Counselling from "./components/Service/Counselling/Counselling.jsx";
import Workforce from "./components/Service/Workforce/Workforce.jsx";
import CareerCraft from "./components/Service/CareerCraft/CareerCraft.jsx";
import WhatsAppIcon from "./components/WhatsAppIcon.jsx";
import theme from "./theme";  // Import the custom theme
import Affiliate from "./pages/Affiliate.jsx";
import AffiliateForm from "./components/Affiliate/AffiliateForm.jsx";
import AffiliateDashboard from "./pages/AffiliateDashboard.jsx";
import AffiliateHeader from "./components/AffiliateDashboard/AffiliateHeader/AffiliateHeader.jsx";
import AffiliateFooter from "./components/AffiliateDashboard/AffiliateFooter.jsx";
import Login from "./pages/AffiliateLogin.jsx";
import JobPostForm from "./components/AffiliateDashboard/JobPostForm.jsx";

//import PrivateAffiliateRoute from './PrivateAffiliateRoute';

// Import Admin components
import Layout from "./Admin/AdminComponents/Layout.jsx";
import StudentPanel from "./Admin/AdminPages/StudentPanel.jsx";
import CollegePanel from "./Admin/AdminPages/CollegePanel.jsx";
import CompanyPanel from "./Admin/AdminPages/CompanyPanel.jsx";
import ContactPanel from "./Admin/AdminPages/ContactPanel.jsx";
import PostJob from "./Admin/AdminPages/PostJob.jsx";
import StudentApplied from "./Admin/AdminComponents/Job Panel/StudentApplied.jsx";
import Dashboard from "./Admin/AdminPages/Dashboard.jsx";

// Import new pages for admin authentication
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminResetPassword from "./pages/ResetPassword.jsx";

// Import AuthProvider
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import NotificationPanel from "./Admin/AdminPages/NotificationPanel.jsx";
import Referrals from "./components/AffiliateDashboard/Referrals.jsx";
import AffiliateProfile from "./components/AffiliateDashboard/AffiliateProfile.jsx";

const NotFound = () => <div>Page Not Found</div>;

const Layoutt = ({ children }) => {
  const location = useLocation();
  const isAffiliateDashboard = location.pathname.startsWith('/affiliate-dashboard');

  return (
    <>
      {isAffiliateDashboard ? <AffiliateHeader /> : <Header />}
      {children}
      {isAffiliateDashboard ? <AffiliateFooter /> : <Footer />}
    </>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }
  return children;
};

const PrivateAffiliateRoute = ({ children }) => {
  const { isAffiliateAuthenticated } = React.useContext(AuthContext); 
  if (!isAffiliateAuthenticated) {
    return <Navigate to="/affiliate-login" />;
  }
  return children;
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Affiliate Dashboard Routes */}
            <Route
              path="/affiliate-dashboard/*"
              element={ 
                <PrivateAffiliateRoute>
                  <Layoutt>                   
                    <Routes>                   
                      <Route path="postjob" element={<JobPostForm />} />
                      <Route path="referrals" element={<Referrals />} />
                      <Route path="profile" element={<AffiliateProfile />} />
                      <Route path="*" element={<AffiliateDashboard />} />
                    </Routes>
                  </Layoutt>
                </PrivateAffiliateRoute>
              }
            />

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Layoutt>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/affiliate-login" element={<Login />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/oncampus" element={<OnCampus />} />
                      <Route path="/offcampus" element={<OffCampus />} />
                      <Route path="/seminar" element={<Seminar />} />
                      <Route path="/counselling" element={<Counselling />} />
                      <Route path="/careercraft" element={<CareerCraft />} />
                      <Route path="/workforce" element={<Workforce />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/jobs/post-resume" element={<PostResume />} />
                      <Route path="/jobs/current-opening" element={<CurrentOpening />} />
                      <Route path="/employer" element={<Employer />} />
                      <Route path="/college" element={<College />} />
                      <Route path="/campus-to-cubicle" element={<CampusToCubicle />} />
                      <Route path="/college-form" element={<CollegeForm />} />
                      <Route path="/company-form" element={<CompanyForm />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/affiliate" element={<Affiliate />} />
                      <Route path="/affiliate-form" element={<AffiliateForm />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layoutt>
                  
                  {/* WhatsApp Icon */}
                  <Box position="fixed" bottom="4" right="4" zIndex="1000">
                    <WhatsAppIcon />
                  </Box>
                </>
              }
            />

            {/* Admin Authentication Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<AdminResetPassword />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="student" element={<StudentPanel />} />
                      <Route path="college" element={<CollegePanel />} />
                      <Route path="company" element={<CompanyPanel />} />
                      <Route path="contact-support" element={<ContactPanel />} />
                      <Route path="post-job" element={<PostJob />} />
                      <Route path="StudentApplied" element={<StudentApplied />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="notification" element={<NotificationPanel />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;

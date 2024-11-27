import React, { Suspense } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import theme from "./theme";  // Import the custom theme
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

// Lazy load components
const Home = React.lazy(() => import("./pages/Home.jsx"));
const Services = React.lazy(() => import("./pages/Services.jsx"));
const Jobs = React.lazy(() => import("./pages/Jobs.jsx"));
const PostResume = React.lazy(() => import("./components/Jobs/PostResume.jsx"));
const CurrentOpening = React.lazy(() => import("./components/Jobs/Openings/Opening.jsx"));
const Employer = React.lazy(() => import("./pages/Employer.jsx"));
const College = React.lazy(() => import("./pages/College.jsx"));
const CampusToCubicle = React.lazy(() => import("./pages/CampusToCubicle.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const Header = React.lazy(() => import("./components/Header/Header.jsx"));
const Footer = React.lazy(() => import("./components/Footer.jsx"));
const CollegeForm = React.lazy(() => import("./components/CampusToCubicle/CollegeForm.jsx"));
const CompanyForm = React.lazy(() => import("./components/CampusToCubicle/CompanyForm.jsx"));
const OnCampus = React.lazy(() => import("./components/Service/OnCampus/OnCampus.jsx"));
const OffCampus = React.lazy(() => import("./components/Service/OffCampus/OffCampus.jsx"));
const Seminar = React.lazy(() => import("./components/Service/Seminar/Seminar.jsx"));
const Counselling = React.lazy(() => import("./components/Service/Counselling/Counselling.jsx"));
const Workforce = React.lazy(() => import("./components/Service/Workforce/Workforce.jsx"));
const CareerCraft = React.lazy(() => import("./components/Service/CareerCraft/CareerCraft.jsx"));
const WhatsAppIcon = React.lazy(() => import("./components/WhatsAppIcon.jsx"));
const Affiliate = React.lazy(() => import("./pages/Affiliate.jsx"));
const AffiliateForm = React.lazy(() => import("./components/Affiliate/AffiliateForm.jsx"));
const AffiliateDashboard = React.lazy(() => import("./pages/AffiliateDashboard.jsx"));
const AffiliateHeader = React.lazy(() => import("./components/AffiliateDashboard/AffiliateHeader/AffiliateHeader.jsx"));
const AffiliateFooter = React.lazy(() => import("./components/AffiliateDashboard/AffiliateFooter.jsx"));
const Login = React.lazy(() => import("./pages/AffiliateLogin.jsx"));
const JobPostForm = React.lazy(() => import("./components/AffiliateDashboard/JobPostForm.jsx"));

// Admin components
const Layout = React.lazy(() => import("./Admin/AdminComponents/Layout.jsx"));
const StudentPanel = React.lazy(() => import("./Admin/AdminPages/StudentPanel.jsx"));
const CollegePanel = React.lazy(() => import("./Admin/AdminPages/CollegePanel.jsx"));
const CompanyPanel = React.lazy(() => import("./Admin/AdminPages/CompanyPanel.jsx"));
const ContactPanel = React.lazy(() => import("./Admin/AdminPages/ContactPanel.jsx"));
const PostJob = React.lazy(() => import("./Admin/AdminPages/PostJob.jsx"));
const StudentApplied = React.lazy(() => import("./Admin/AdminComponents/Job Panel/StudentApplied.jsx"));
const Dashboard = React.lazy(() => import("./Admin/AdminPages/Dashboard.jsx"));
const ViewPost = React.lazy(() => import('./Admin/AdminComponents/Affiliate/ViewJob')); 

// Admin Authentication
const AdminLogin = React.lazy(() => import("./pages/AdminLogin.jsx"));
const AdminResetPassword = React.lazy(() => import("./pages/ResetPassword.jsx"));
const NotificationPanel = React.lazy(() => import("./Admin/AdminPages/NotificationPanel.jsx"));
const Referrals = React.lazy(() => import("./components/AffiliateDashboard/Referrals.jsx"));
const AffiliateProfile = React.lazy(() => import("./components/AffiliateDashboard/AffiliateProfile.jsx"));
const AffiliatePanel = React.lazy(() => import("./Admin/AdminPages/AffiliatePanel.jsx"));

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
          <Suspense fallback={<div>Loading...</div>}>
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
                        <Route path="/services/oncampus" element={<OnCampus />} />
                        <Route path="/services/offcampus" element={<OffCampus />} />
                        <Route path="/services/seminar" element={<Seminar />} />
                        <Route path="/services/counselling" element={<Counselling />} />
                        <Route path="/services/careercraft" element={<CareerCraft />} />
                        <Route path="/services/workforce" element={<Workforce />} />
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
                        <Route path="affiliate" element={<AffiliatePanel />} />
                        <Route path="view-post/:affiliateId" element={<ViewPost />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Layout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;

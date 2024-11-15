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
import WhatsAppIcon from "./components/WhatsAppIcon.jsx";
import theme from "./theme";
import Affiliate from "./pages/Affiliate.jsx";
import AffiliateForm from "./components/Affiliate/AffiliateForm.jsx";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

const Layoutt = ({ children }) => {
  const location = useLocation();
  const isAffiliateDashboard = location.pathname.startsWith("/affiliate-dashboard");

  return (
    <>
      {isAffiliateDashboard ? null : <Header />}
      {children}
      {isAffiliateDashboard ? null : <Footer />}
    </>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/admin" />;
  return children;
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route
              path="/*"
              element={
                <Layoutt>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/employer" element={<Employer />} />
                    <Route path="/college" element={<College />} />
                    <Route path="/campus-to-cubicle" element={<CampusToCubicle />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/affiliate" element={<Affiliate />} />
                    <Route path="/affiliate-form" element={<AffiliateForm />} />
                    <Route path="*" element={<div>Page Not Found</div>} />
                  </Routes>
                </Layoutt>
              }
            />
          </Routes>
          <Box position="fixed" bottom="4" right="4" zIndex="1000">
            <WhatsAppIcon />
          </Box>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;

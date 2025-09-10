// File: clinic-frontend/src/App.tsx

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import all page components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutUsPage from "./pages/AboutUsPage";
import ServicesPage from "./pages/ServicesPage";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import BlogPage from "./pages/BlogPage";
import FAQPage from "./pages/FAQPage";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import EmergencyPage from "./pages/EmergencyPage";
import MyProfilePage from "./pages/MyProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AppointmentBookingPage from "./pages/AppointmentBookingPage";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import VideoCallPage from "./pages/VideoCallPage"; // <-- *** THIS IS THE FIX ***

type PageState =
  | { name: "home" } | { name: "login" } | { name: "register" }
  | { name: "about" } | { name: "services" } | { name: "doctors" }
  | { name: "doctorProfile"; id: string }
  | { name: "blog" } | { name: "faq" } | { name: "contact" }
  | { name: "privacy" } | { name: "emergency" }
  | { name: "myProfile" } | { name: "settings" }
  | { name: "bookAppointment"; doctorId: string; doctorName: string }
  | { name: "patientDashboard" }
  | { name: "doctorDashboard" }
  | { name: "videoCall" };

export type Page = PageState['name'];

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>({ name: "home" });

  const handleNavigate = (page: Page, data?: { [key: string]: string }) => {
    if (page === 'doctorProfile' && data?.id) {
      setCurrentPage({ name: page, id: data.id });
    } else if (page === 'bookAppointment' && data?.doctorId && data?.doctorName) {
      setCurrentPage({ name: page, doctorId: data.doctorId, doctorName: data.doctorName });
    } else {
      // @ts-ignore
      setCurrentPage({ name: page });
    }
  };

  const renderPage = () => {
    switch (currentPage.name) {
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "register":
        return <RegisterPage onNavigate={handleNavigate} />;
      case "about":
        return <AboutUsPage />;
      case "services":
        return <ServicesPage />;
      case "doctors":
        return <DoctorsPage onNavigate={handleNavigate} />;
      case "doctorProfile":
        return <DoctorProfilePage doctorId={currentPage.id} onNavigate={handleNavigate} />;
      case "blog":
        return <BlogPage />;
      case "faq":
        return <FAQPage />;
      case "contact":
        return <ContactUsPage />;
      case "privacy":
        return <PrivacyPolicyPage />;
      case "emergency":
        return <EmergencyPage />; // <-- *** THIS IS ALSO FIXED ***
      case "myProfile":
        return <MyProfilePage />;
      case "settings":
        return <SettingsPage />;
      case "bookAppointment":
        return <AppointmentBookingPage doctorId={currentPage.doctorId} doctorName={currentPage.doctorName} />;
      case "patientDashboard":
        return <PatientDashboardPage onNavigate={handleNavigate} />;
      case "doctorDashboard":
        return <DoctorDashboardPage onNavigate={handleNavigate}/>;
      case "videoCall":
        return <VideoCallPage onNavigate={handleNavigate} />;
      case "home":
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen text-dark-text font-sans">
      <Navbar onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
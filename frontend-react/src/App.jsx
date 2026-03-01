import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// App 1: Admin/Scanner Imports
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ScannerSelection from "./pages/ScannerSelection";
import ManagerManagement from "./pages/ManagerManagement";
import ScanPage from "./pages/ScanPage";
import LogsPage from "./pages/LogsPage";
import EmailManager from "./pages/EmailManager";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import { ThemeProvider } from "./context/ThemeContext";
import { useBackButton } from "./hooks/useBackButton";

// App 2: Event/User Side Imports
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Themes from './pages/Themes';
import Committee from './pages/Committee';
import VenueMap from './pages/VenueMap';
import Schedule from './pages/Schedule';
import Speakers from './pages/Speakers';
import Keynotes from './pages/Keynotes';
import SpeakerProfile from './pages/SpeakerProfile';
import Feedback from './pages/Feedback';
import KeynoteManager from './pages/KeynoteManager';
import FeedbackStats from './pages/FeedbackStats';
import QRGenerator from './pages/QRGenerator';

function AppContent() {
  useBackButton();

  return (
    <Routes>
      {/* --- APP 1: LOGIN PAGE (Standalone) --- */}
      <Route path="/login" element={<Login />} />

      {/* --- APP 2: USER/EVENT SIDE (With Layout) --- */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="themes" element={<Themes />} />
        <Route path="committee" element={<Committee />} />
        <Route path="map" element={<VenueMap />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="speakers" element={<Speakers />} />
        <Route path="keynotes" element={<Keynotes />} />
        <Route path="speaker/:id" element={<SpeakerProfile />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* --- APP 1: ADMIN PROTECTED ROUTES (No Layout) --- */}
      {/* These must be OUTSIDE the <Route element={<Layout />}> block */}

      <Route
        path="/superadmin"
        element={<RequireAuth allowedRoles={['superadmin']}><AdminDashboard /></RequireAuth>}
      />
      <Route
        path="/scan-menu"
        element={<RequireAuth allowedRoles={['superadmin']}><ScannerSelection /></RequireAuth>}
      />
      <Route
        path="/addmanagers"
        element={<RequireAuth allowedRoles={['superadmin']}><ManagerManagement /></RequireAuth>}
      />
      <Route
        path="/logs"
        element={<RequireAuth allowedRoles={['superadmin']}><LogsPage /></RequireAuth>}
      />
      <Route
        path="/emails"
        element={<RequireAuth allowedRoles={['superadmin']}><EmailManager /></RequireAuth>}
      />

      <Route
        path="/manager"
        element={<RequireAuth allowedRoles={['manager']}><ManagerDashboard /></RequireAuth>}
      />

      <Route
        path="/keynote-manager"
        element={<RequireAuth allowedRoles={['superadmin', 'manager']}><KeynoteManager /></RequireAuth>}
      />

      <Route
        path="/scan"
        element={<RequireAuth allowedRoles={['superadmin', 'manager']}><ScanPage /></RequireAuth>}
      />

      <Route
        path="/feedback-stats"
        element={<RequireAuth allowedRoles={['superadmin']}><FeedbackStats /></RequireAuth>}
      />

      <Route
        path="/qr-generator"
        element={<RequireAuth allowedRoles={['superadmin']}><QRGenerator /></RequireAuth>}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AiBot from "./pages/AiBot";

import ParentDashboard from "./components/Dashboard/ParentDashboard";
import StudentProfile from "./components/Dashboard/StudentProfile";
import AcademicPerformance from "./components/Dashboard/AcademicPerformance";
import UpcomingEvents from "./components/Dashboard/UpcomingEvents";
import ImportantNotices from "./components/Dashboard/ImportantNotices";
import RemindersAndAlerts from "./components/Dashboard/RemindersAndAlerts";
import TeacherRatings from "./components/Dashboard/TeacherRating";
import MeetingScheduler from "./components/Dashboard/MeetingScheduler";

import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import ClassOverview from "./components/Teacher/ClassOverview";
import AttendanceTracker from "./components/Teacher/AttendanceTracker";
import ImportantNotice from "./components/Teacher/ImportanatNotice";
import RemindersAndAlert from "./components/Teacher/RemindersAndAlert";
import MeetingSchedulers from "./components/Teacher/MeetingSchedulers";
import ManageAssignments from "./components/Teacher/ManageAssignments";
import TeacherSchedule from "./components/Teacher/TeacherSchedule";
import  Students  from "./components/Teacher/Students";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signin" element={<Signup />} />
        <Route path="/aibot" element={<AiBot />} />
        {/* Teacher Dashboard Routes */}
        <Route path="/teacher" element={<TeacherDashboard />}>
          <Route index element={<ClassOverview />} />
          <Route path="assignments" element={<ManageAssignments />} />
          <Route path="attendance" element={<AttendanceTracker />} />
          <Route path="schedule" element={<TeacherSchedule />} />
          <Route path="notice" element={<ImportantNotice />} />
          <Route path="alert" element={<RemindersAndAlert />} />
          <Route path="meeting" element={<MeetingSchedulers />} />
          <Route path="students" element={<Students/>}/>
        </Route>

        {/* Parent Dashboard Routes */}
        <Route path="/dashboard" element={<ParentDashboard />}>
          <Route index element={<StudentProfile />} />
          <Route path="performance" element={<AcademicPerformance />} />
          <Route path="events" element={<UpcomingEvents />} />
          <Route path="notices" element={<ImportantNotices />} />
          <Route path="alerts" element={<RemindersAndAlerts />} />
          <Route path="ratings" element={<TeacherRatings />} />
          <Route path="meetings" element={<MeetingScheduler />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

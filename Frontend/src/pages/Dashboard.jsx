import React from "react";
import ParentDashboard from "../components/Dashboard/ParentDashboard";
import TeacherRating from "../components/Dashboard/TeacherRating";
import MeetingScheduler from "../components/Dashboard/MeetingScheduler";
import AttendanceTracker from "../components/Attendance/AttendanceTracker";
import NotificationList from "../components/Notifications/NotificationList";
import LanguageSwitcher from "../components/LanguageSettings/LanguageSwitcher";
import OfflineSync from "../components/OfflineSupport/OfflineSync";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-[#00B6BA] mb-6">Parent Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ParentDashboard />
        <TeacherRating />
        <MeetingScheduler />
        <AttendanceTracker />
        <NotificationList />
        <LanguageSwitcher />
        <OfflineSync />
      </div>
    </div>
  );
};

export default Dashboard;

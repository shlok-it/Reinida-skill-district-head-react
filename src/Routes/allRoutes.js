import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/dashboard";
import BlankPage from "../BlankPage.js";
import Login from "../auth/Login.js";
import Logout from "../auth/Logout.js";

const UserLeave = React.lazy(() => import("../pages/leave/user_leave/index.jsx"));
const OfficeLeave = React.lazy(() => import("../pages/leave/office_leave/index.jsx"));
const AttendenceList = React.lazy(() => import("../pages/attendence/attendenceList/Index.jsx"));
const TodayAttendence = React.lazy(() => import('./../pages/attendence/todayattendence/index'));
const Salary = React.lazy(() => import("../pages/salary/index.jsx"));

const Profile = React.lazy(() => import('../pages/Profile'));
const ChangePassword = React.lazy(() => import('../pages/ChangePassword'));
const UsersWorklist = React.lazy(() => import('../pages/users_work/Listing'));
const UsersWorklistTime = React.lazy(() => import('../pages/users_work_time/Listing'));
const Contacts = React.lazy(() => import('../pages/users/Contacts'));
const NotificationReport = React.lazy(() => import('../pages/notification/Listing'));
const authProtectedRoutes = [
  { path: "/dashboard", exact: true, component: <Dashboard /> },
  { path: "/attendacelist", exact: true, component: <AttendenceList /> },
  { path: "/todayattendance", exact: true, component: <TodayAttendence /> },
  { path: "/Working-list", exact: true, component: <UsersWorklist /> },
  { path: "/working-time", exact: true, component: <UsersWorklistTime /> },
  { path: "/teachers", exact: true, component: <Contacts /> },
  { path: "/password", exact: true, component: <ChangePassword /> },
  { path: "/notification/report", exact: true, component: <NotificationReport /> },
  { path: "/profile", exact: true, component: <Profile /> },
  { path: "/leave-list", exact: true, component: <UserLeave /> },
  { path: "/office-leave", exact: true, component: <OfficeLeave /> },
  { path: "/salary", exact: true, component: <Salary /> },
  { path: "*", component: <BlankPage /> },
];

const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
 
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "*", component: <BlankPage /> },

];

export { authProtectedRoutes, publicRoutes };
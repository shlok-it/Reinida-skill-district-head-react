import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isSalary, setisSalary] = useState(false);
  const [isAttendance, setIsAttendance] = useState(false);
  const [isWorkingTime, setWorkingTime] = useState(false);
  const [isWorkinglist, setisWorkinglist] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Attendance") {
      setIsAttendance(false);
    }
    if (iscurrentState !== "working_time") {
      setWorkingTime(false);
    }
  
    if (iscurrentState !== "WorkingList") {
      setisWorkinglist(false);
    }
    if (iscurrentState !== "Teachers") {
      setIsUsers(false);
    }   
    if (iscurrentState !== "Leave") {
      setIsLeave(false);
    }        
      
    if (iscurrentState !== "Notification") {
      setIsNotification(false);
    }     
    if (iscurrentState !== "Salary") {
      setisSalary(false);
    } 
   
  }, [
    history,
    iscurrentState,
    isDashboard,
    isAttendance,
    isWorkinglist,
    isWorkingTime,
    isUsers,
    isNotification,
    isLeave,
    isSalary,
  ]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "mdi mdi-home-outline",
      link: "/dashboard",
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
      }
    },
    
    {
      id: "leave",
      label: "Leave",
      icon: "mdi mdi-logout",
      link: "/#",
      stateVariables: isLeave,
      click: function (e) {
        e.preventDefault();
        setIsLeave(!isLeave);
        setIscurrentState("Leave");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "officeleave",
          label: "Office Leave",
          link: "/office-leave",
          parentId: "leave",
        },
        {
          id: "staffleave",
          label: "Teacher Leave",
          link: "/leave-list",
          parentId: "leave",
        }
      ]
    },
    
    {
      id: "attendance",
      label: "Attendance",
      icon: "mdi mdi-ray-start-arrow",
      link: "/#",
      stateVariables: isAttendance,
      click: function (e) {
        e.preventDefault();
        setIsAttendance(!isAttendance);
        setIscurrentState("Attendance");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "todayAttendance",
          label: "Today Attendance",
          link: "/todayattendance",
          parentId: "attendance",
        },
        {
          id: "allAttendance",
          label: "Attendace List",
          link: "/attendacelist",
          parentId: "attendance",
        },
      ]
    },
  
    {
      id: "Working-list",
      label: "Working list",
      icon: "mdi mdi-account",
      link: "/Working-list",
      // hideFor: ['MANAGER'],
      click: function (e) {
        e.preventDefault();
        setWorkingTime(!isWorkinglist);
        setIscurrentState("WorkingList");
      }
    },
    {
      id: "workingtime",
      label: "Working Time",
      icon: "mdi mdi-history",
      link: "/working-time",
      // hideFor: ['MANAGER'],
      click: function (e) {
        e.preventDefault();
        setWorkingTime(!isWorkingTime);
        setIscurrentState("working_time");
      }
    },
    {
      id: "teachers",
      label: "Teachers",
      icon: "mdi mdi-account-multiple-outline",
      link: "/#",
      stateVariables: isUsers,
      click: function (e) {
        e.preventDefault();
        setIsUsers(!isUsers);
        setIscurrentState("Teachers");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "all_teachers",
          label: "All Teachers",
          link: "/teachers",
          parentId: "teachers",
        },       
       
      ]
    },
    
    {
      id: "Salary",
      label: "Payroll & Salary",
      icon: "mdi mdi-wallet",
      link: "/#",
      stateVariables: isSalary,
      click: function (e) {
        e.preventDefault();
        setisSalary(!isSalary);
        setIscurrentState("Salary");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "list",
          label: "Salary List",
          link: "/salary",
          parentId: "Salary",
        },       
      ]
    },     
    {
      id: "notification",
      label: "Notification",
      icon: "mdi mdi-bell-outline",
      link: "/notification/report",
      click: function (e) {
        e.preventDefault();
        setIsNotification(!isNotification);
        setIscurrentState("Notification");
      }
    },    
    {
      id: "notificationdd",
      label: "",
      icon: "",
      link: "#",
      click: function (e) {
        e.preventDefault();
        setIsNotification(!isNotification);
        setIscurrentState("Notification");
      }
    },
  
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;

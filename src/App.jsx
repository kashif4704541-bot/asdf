import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Auth/login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import PendingTaskAdmin from "./pages/PendingTaskAdmin"; // ✅ import your page
import CompletedTasksAdmin from "./pages/CompletedTasksAdmin";
import TaskNotesAdmin from "./pages/TaskNotesAdmin";

import { Employee, Admin } from "./utils/localStorage";
import { saveLocalStorage, getLocalStorage } from "./utils/localStorage";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const authData = useContext(AuthContext);

  // ✅ Load saved user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Seed Employee/Admin data if not already present
  // ✅ Seed Employee/Admin data if not already present
  useEffect(() => {
    const employeeData = getLocalStorage("employee");
    const adminData = getLocalStorage("admin");

    if (!employeeData) {
      saveLocalStorage("employee", Employee); // 👈 your Employee array
    }
    if (!adminData) {
      saveLocalStorage("admin", Admin); // 👈 your Admin array
    }
  }, []);


  const handleLogin = (email, password) => {
    console.log("Login Attempt:",email, password)
    // Admin Login
    if (email === "shaheer.kas08@gmail.com" && password === "321") {
      const adminUser = { role: "admin", data: { name: "Admin", email } };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser)); // ✅ saved here
      console.log("Admin saved:",adminUser)
      return;
    }

    // Employee Login
    else if (authData?.employee) {
      console.log("Employee list:",authData.employee)
      const matchedEmployee = authData.employee.find(
        (emp) => emp.email === email && emp.password === password
      );

      if (matchedEmployee) {
        const employeeUser = { role: "employee", data: matchedEmployee };
        setUser(employeeUser);
        localStorage.setItem("user", JSON.stringify(employeeUser)); // ✅ saved here
        console.log("Employee saved:", employeeUser)
        return;
      }
    } else {
        console.log("No matching Employee found")
        alert("Invalid credentials");
    }
  }



  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      {!user ? (
        // 🔹 Show login if no user
        <Login handleLogin={handleLogin} />
      ) : (
        <Routes>
          {/* Admin Routes */}
          {user.role === "admin" && (
            <>
              <Route
                path="/"
                element={
                  <AdminDashboard
                    admin={user.data}
                    employee={getLocalStorage("employee") || []}
                    handleLogout={handleLogout}
                  />
                }
              />
              <Route path="/pending-tasks" element={<PendingTaskAdmin />} />
              <Route path="/completed-tasks" element={<CompletedTasksAdmin />} />
              <Route path="/task-notes" element={<TaskNotesAdmin />} />
            </>
          )}

          {/* Employee Routes */}
          {user.role === "employee" && (
            <Route
              path="/"
              element={
                <EmployeeDashboard
                  employee={user.data}
                  handleLogout={handleLogout}
                />
              }
            />
          )}

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;

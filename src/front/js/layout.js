import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.js";
import { Register_user } from "./pages/register.js";
import { Projects } from "./pages/Projects.jsx";
import { EditProject } from "./pages/EditProject.jsx";
import { Employees } from "./pages/Employees.jsx";
import { ViewEmployee } from "./pages/ViewEmployee.jsx";
import { Customers } from "./pages/Customers.jsx";
import injectContext from "./store/appContext.js";
import { Login } from "./pages/login.js";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { ProjectList } from "./component/projectCard.jsx";
import { Create_project } from "./pages/createProject";
import { Dashboard } from "./pages/dashboard.js";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register_user />} path="/register" />
            <Route element={<Projects />} path="/projects" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Create_project />} path="/projects/create" />
            {/* <Route element={<ProjectList />} path="/projects/:project_id" /> */}
            <Route
              element={<EditProject />}
              path="/projects/edit/:project_id"
            />
            <Route element={<Employees />} path="/employees" />
            <Route element={<ViewEmployee />} path="/employees/:id" />
            <Route element={<Customers />} path="/customers" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);

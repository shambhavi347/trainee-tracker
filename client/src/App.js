import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegInstitute from "./components/Institute/RegInstitute";
import RegStudent from "./components/Student/RegStudent";
import RegStudent1 from "./components/Student/RegStudent1";
import RegStudent2 from "./components/Student/RegStudent2";
import FinalPage from "./components/Student/FinalPage";
import AdminDash from "./components/Admin/AdminDash";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/reg-institute" element={<RegInstitute />} />
          <Route path="/admin-dashboard" element={<AdminDash />} />
          <Route path="/reg-final" element={<FinalPage />} />
          <Route path="/reg-student" element={<RegStudent />} />
          <Route path="/reg-student1" element={<RegStudent1 />} />
          <Route path="/reg-student2" element={<RegStudent2 />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

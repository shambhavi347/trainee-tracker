import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegInstitute from "./components/Institute/RegInstitute";
import AdminDash from "./components/Admin/AdminDash";
import Demo from "./components/Student/Demo";
import Regtpo from "./components/Institute/Regtpo";
import Home from "./components/Institute/Home";
import RegCoordinator from "./components/Coordinator/RegCoordinator";
import CoordinatorDash from "./components/Coordinator/CoordinatorDash";
// import Login from "./components/Login";
// import RegStudent from "./components/Student/RegStudent";
// import RegStudent1 from "./components/Student/RegStudent1";
// import RegStudent2 from "./components/Student/RegStudent2";
// import FinalPage from "./components/Student/FinalPage";
// import Login from "./components/Login";
import StudDash from "./components/Student/StudDash";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/reg-institute" element={<RegInstitute />} />
          <Route path="/admin-dashboard" element={<AdminDash />} />
          <Route path="/reg-stud" element={<Demo />} />
          <Route path="/reg-tpo" element={<Regtpo />} />
          <Route path="/institute-home" element={<Home />} />
          <Route path="/reg-coordinator" element={<RegCoordinator />} />
          <Route path="/coordinator-home" element={<CoordinatorDash />} />
          {/* <Route path="/admin-login" element={<Login />} /> */}
          {/* <Route path="/admin-login" element={<Login />} /> */}
          <Route path="/trainee-dashboard" element={<StudDash />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

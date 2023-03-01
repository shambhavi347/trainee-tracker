import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegInstitute from "./components/Institute/RegInstitute";
import AdminDash from "./components/Admin/AdminDash";
import Demo from "./components/Student/Demo";
import Home from "./components/Institute/Home";
import RegCoordinator from "./components/Coordinator/RegCoordinator";
import CoordinatorDash from "./components/Coordinator/CoordinatorDash";
import StudDash from "./components/Student/StudDash";
import TraineeReg from "./components/Student/TraineeReg";
import Error from "./components/Error";
import Logout from "./components/Logout";
import LogoutTrainee from "./components/LogoutTrainee";
import TraineeProfile from "./components/Student/TraineeProfile";
import CoordPeople from "./components/Coordinator/CoordPeople";
import CoordProject from "./components/Coordinator/CoordProject";
import CoordDiscussion from "./components/Coordinator/CoordDiscussion";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/reg-institute" element={<RegInstitute />} />
          <Route path="/admin-dashboard" element={<AdminDash />} />
          <Route path="/reg-stud" element={<Demo />} />
          <Route path="/institute-home" element={<Home />} />
          <Route path="/reg-coordinator" element={<RegCoordinator />} />
          <Route path="/coordinator-home" element={<CoordinatorDash />} />
          <Route path="/trainee-dashboard" element={<StudDash />} />
          <Route path="/trainee-reg" element={<TraineeReg />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/trainee-profile" element={<TraineeProfile />} />
          <Route path="/trainee-logout" element={<LogoutTrainee />} />
          <Route path="/coordinator-people" element={<CoordPeople />} />
          <Route path="/coodinator-project" element={<CoordProject />} />
          <Route path="/coordinator-discussion" element={<CoordDiscussion />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

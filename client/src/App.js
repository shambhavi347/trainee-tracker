import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegInstitute from "./components/Institute/RegInstitute";
import AdminDash from "./components/Admin/AdminDash";
import Home from "./components/Institute/Home";
// import RegCoordinator from "./components/Coordinator/RegCoordinator";
import CoordReg from "./components/Coordinator/CoordReg";
import CoordinatorDash from "./components/Coordinator/CoordinatorDash";
import StudDash from "./components/Student/StudDash";
import TraineeReg from "./components/Student/TraineeReg";
import Error from "./components/Error";
import Logout from "./components/Logout";
import LogoutTrainee from "./components/LogoutTrainee";
import TraineeProfile from "./components/Student/TraineeProfile";
import ProjectDetails from "./components/Coordinator/ProjectDetails";
// import CoordPeople from "./components/Coordinator/CoordPeople";
// import CoordProject from "./components/Coordinator/CoordProject";
// import CoordDiscussion from "./components/Coordinator/CoordDiscussion";
import ForgotPass from "./components/ForgotPass";
import CreatePass from "./components/CreatePass";
import StudReg from "./components/Student/StudReg";
import WatchTrainee from "./components/WatchTrainee";
import ViewDoc from "./components/ViewDoc";
import PdfViewer from "./components/PdfViewer";
import "./CSS/LightTheme.css";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/reg-institute" element={<RegInstitute />} />
          <Route path="/admin-dashboard" element={<AdminDash />} />
          <Route path="/reg-stud" element={<StudReg />} />
          <Route path="/institute-home" element={<Home />} />
          {/* <Route path="/reg-coordinator" element={<RegCoordinator />} /> */}
          <Route path="/reg-coord" element={<CoordReg />} />
          <Route path="/pro-details" element={<ProjectDetails />} />
          <Route path="/coordinator-dashboard" element={<CoordinatorDash />} />
          <Route path="/trainee-dashboard" element={<StudDash />} />
          <Route path="/trainee-reg" element={<TraineeReg />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/trainee-profile" element={<TraineeProfile />} />
          <Route path="/trainee-logout" element={<LogoutTrainee />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/create-password/:userId" element={<CreatePass />} />
          {/* <Route path="/watch-trainee" element={<WatchTrainee />} /> */}
          <Route path="/view/image/:userId" element={<ViewDoc />} />
          <Route path="/view/pdf/:userId" element={<PdfViewer />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

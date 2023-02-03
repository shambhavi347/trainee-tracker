import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegInstitute from "./components/RegInstitute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/reg-institute" element={<RegInstitute />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

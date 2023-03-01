import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutTrainee = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  useEffect(() => {
    const res = fetch("/trainee-logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.status === 500) {
      console.log("Logout Unsuccessfull!!");
    } else {
      console.log("Successfull Logout!!");
      routeChange();
    }
  }, []);

  return (
    <>
      <h1 className="Body">Logout Page</h1>
    </>
  );
};

export default LogoutTrainee;

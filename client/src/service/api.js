import axios from "axios";

export const getInstitutes = async () => {
  try {
    let respone = await axios.get("/get-pending-institute");

    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInstAccept = async () => {
  try {
    let respone = await axios.get("/get-accepted-institute");

    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStudent = async () => {
  try {
    let respone = await axios.get("/get-pending-student");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptInsitute = async (data) => {
  try {
    await axios.post("/accept-inst", data);
  } catch (error) {
    console.log(error);
  }
};

export const rejectInsitute = async (data) => {
  try {
    await axios.post("/reject-inst", data);
  } catch (error) {
    console.log(error);
  }
};

//institute application status
export const getAppstatus = async () => {
  try {
    let respone = await axios.get("/get-application-status");
    // console.log("Ins " + respone.data);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptTrainee = async (data) => {
  try {
    const response = await axios.post("/send-student-mail", data);
    return response.data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const rejectTrainee = async (data) => {
  try {
    const response = await axios.post("/reject-student", data);
    return response.data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//getting list of selected students
export const getSelectedStudents = async () => {
  try {
    let respone = await axios.get("/get-selected-students");
    // console.log(data);
    return respone.data; //talking about data getting from response
  } catch (error) {
    console.log(error);
  }
};

export const getInvitation = async () => {
  try {
    let respone = await axios.get("/get-invitation");

    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoordinators = async () => {
  try {
    let respone = await axios.get("/get-coordinators");

    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const revokeInvitation = async (data) => {
  try {
    const response = await axios.post("/revoke-invitation", data);
    return response.data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// get student data

export const StudentData = async () => {
  try {
    const response = await axios.get("/student-data");
    return response.data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

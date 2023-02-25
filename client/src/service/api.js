import axios from "axios";

export const getInstitutes = async () => {
  try {
    let respone = await axios.get("/get-pending-institute");

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

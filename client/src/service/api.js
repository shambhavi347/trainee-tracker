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

export const getInstReject = async () => {
  try {
    let respone = await axios.get("/get-rejected-institute");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTypePenCat = async () => {
  try {
    let respone = await axios.get("/get-type-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTypeAccCat = async () => {
  try {
    let respone = await axios.get("/get-type-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTypeRejCat = async () => {
  try {
    let respone = await axios.get("/get-type-reject-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDurationPenCat = async () => {
  try {
    let respone = await axios.get("/get-duration-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDurationAccCat = async () => {
  try {
    let respone = await axios.get("/get-duration-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDurationRejCat = async () => {
  try {
    let respone = await axios.get("/get-duration-reject-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMonthPenCat = async () => {
  try {
    let respone = await axios.get("/get-month-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMonthAccCat = async () => {
  try {
    let respone = await axios.get("/get-month-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMonthRejCat = async () => {
  try {
    let respone = await axios.get("/get-month-reject-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNaacPenCat = async () => {
  try {
    let respone = await axios.get("/get-naac-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNaacAccCat = async () => {
  try {
    let respone = await axios.get("/get-naac-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNaacRejCat = async () => {
  try {
    let respone = await axios.get("/get-naac-reject-category");
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
export const getAcceptStudent = async () => {
  try {
    let respone = await axios.get("/get-accept-student");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};
export const getRejectStudent = async () => {
  try {
    let respone = await axios.get("/get-reject-student");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInstNamePenCat = async () => {
  try {
    let respone = await axios.get("/get-instname-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInstNameAccCat = async () => {
  try {
    let respone = await axios.get("/get-instname-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInstNameRejCat = async () => {
  try {
    let respone = await axios.get("/get-instname-reject-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStreamPenCat = async () => {
  try {
    let respone = await axios.get("/get-stream-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStreamAccCat = async () => {
  try {
    let respone = await axios.get("/get-stream-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStreamRejCat = async () => {
  try {
    let respone = await axios.get("/get-stream-reject-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoursePenCat = async () => {
  try {
    let respone = await axios.get("/get-course-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseAccCat = async () => {
  try {
    let respone = await axios.get("/get-course-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseRejCat = async () => {
  try {
    let respone = await axios.get("/get-course-reject-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSemesterPenCat = async () => {
  try {
    let respone = await axios.get("/get-semester-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSemesterAccCat = async () => {
  try {
    let respone = await axios.get("/get-semester-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSemesterRejCat = async () => {
  try {
    let respone = await axios.get("/get-semester-reject-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPassYearPenCat = async () => {
  try {
    let respone = await axios.get("/get-passout-year-pending-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPassYearAccCat = async () => {
  try {
    let respone = await axios.get("/get-passout-year-accept-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPassYearRejCat = async () => {
  try {
    let respone = await axios.get("get-passout-year-reject-category");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInstName = async () => {
  try {
    let respone = await axios.get("/get-inst-name-class");
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
    const response = await axios.post("/accept-student", data);
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

export const getTraineeEmail = async () => {
  try {
    const response = await axios.get("/trainee-email");
  } catch (error) {
    console.log(error);
  }
};

export const getTrainees = async () => {
  try {
    const response = await axios.get("/get-trainee");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoordClass = async (data) => {
  try {
    const response = await axios.post("/get-class-coordinator", data);
    return response.data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const removeTrainee = async (data) => {
  try {
    const response = await axios.post("/remove-trainee-class", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postClass = async (data) => {
  try {
    const response = await axios.post("/create-class", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPassYear = async () => {
  try {
    let respone = await axios.get("/get-passout-year-class");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSem = async () => {
  try {
    let respone = await axios.get("/get-sem-class");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourse = async () => {
  try {
    let respone = await axios.get("/get-course-class");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStream = async () => {
  try {
    let respone = await axios.get("/get-stream-class");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const postProject = async (data) => {
  try {
    const response = await axios.post("/add-project", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProjects = async () => {
  try {
    let respone = await axios.get("/get-projects");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroupAssign = async () => {
  try {
    let respone = await axios.get("/get-groups-assign");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const assignProject = async (data) => {
  try {
    const response = await axios.post("/assign-project", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTraineeData = async () => {
  try {
    let respone = await axios.get("/get-trainee-Data");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCoordinatorData = async () => {
  try {
    let respone = await axios.get("/get-Coordinator-Data");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoordName = async () => {
  try {
    let respone = await axios.get("/get-coord-name");
    // console.log("Res: " + respone);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTraineeDeets = async () => {
  try {
    let response = await axios.get("/get-trainee-details");
    // console.log("Res: " + respone);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = async (data) => {
  try {
    const response = await axios.post("/create-event", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = async () => {
  try {
    let response = await axios.get("/get-events");
    // console.log("Res: " + respone);
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const getEventTrainee = async () => {
  try {
    let response = await axios.get("/get-event-trainees");
    // console.log("Res: " + respone);
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

// get messages to coordinator

export const GetDetails = async () => {
  try {
    const response = await axios.get("/details");
    return response.data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// get details of messagesent schema to trainee

export const GetDetails1 = async () => {
  try {
    const response = await axios.get("/details1");
    return response.data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const postGroup = async (data) => {
  try {
    const response = await axios.post("/create-group", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async () => {
  try {
    let respone = await axios.get("/get-groups");
    // console.log("Res: " + respone);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeGroup = async (data) => {
  try {
    let respone = await axios.post("/remove-group", data);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendSetudentMail = async (data) => {
  try {
    let respone = await axios.post("/send-student-mail", data);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const setRejectStudInst = async (data) => {
  try {
    let respone = await axios.post("/rejction-from-student", data);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

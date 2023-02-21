import axios from "axios";

export const getInstitutes = async () => {
  try {
    let respone = await axios.get("/get-pending-institute");
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

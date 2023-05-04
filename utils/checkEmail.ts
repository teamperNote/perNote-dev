import axios from "axios";
export const checkEmail = async (email: string) => {
  try {
    const response = await axios.get(`/api/users/checkEmail?email=${email}`);

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

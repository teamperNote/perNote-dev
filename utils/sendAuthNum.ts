import axios from "axios";

export const sendAuthNum = async (phoneNumber) => {
  const response = await axios.post("/api/auth/sendSMS", { phoneNumber });
  const authNumber = response.data.인증번호;
  return authNumber;
};

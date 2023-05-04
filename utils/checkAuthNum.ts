export const checkAuthNum = (receivedAuthNum, authNum) => {
  if (receivedAuthNum.toString() === authNum) {
    return true;
  } else {
    return false;
  }
};

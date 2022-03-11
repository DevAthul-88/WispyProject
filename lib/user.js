
const User = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {};
  }
};

export default User;

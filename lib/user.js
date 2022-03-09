
const User = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("soft_user")
      ? JSON.parse(localStorage.getItem("soft_user"))
      : {};
  }
};

export default User;

const Token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
  }
};

export default Token;

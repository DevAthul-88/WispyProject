const Token = () => {
  let token = null
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")
      ?  JSON.parse(localStorage.getItem("token"))
      : null;
  }
  return token;
};

export default Token;

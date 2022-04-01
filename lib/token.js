
const Token = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
    }
  };
  
  export default Token;
  
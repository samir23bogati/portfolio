export const getApiUrl = () => {
  const hostname = window.location.hostname;
  
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:5000"; // local dev backend
  } else {
    return "https://blog-backend-final-phi.vercel.app"; // production backend
  }
};

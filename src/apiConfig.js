export const getApiUrl = () => {
  const hostname = window.location.hostname;
  
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:5000";
  } else {
    return "https://blog-backend-clean.vercel.app"; 
  }
};

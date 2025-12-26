export const getApiUrl = () => {
  const hostname = window.location.hostname;
  
  // FORCE LOCALHOST FOR DEBUGGING
  return "http://localhost:5000";
  
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:5000";
  } else {
    // This needs to be replaced with your actual deployed backend URL (e.g., from Render)
    return "https://blog-backend-clean.vercel.app"; 
  }
};

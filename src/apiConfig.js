export const getApiUrl = () => {
  const hostname = window.location.hostname;
  
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:5000"; // local dev backend
  } else {
    return "https://samir-blog-api.vercel.app"; // NEW production backend
  }
};
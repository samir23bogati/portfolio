import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar/navbar";
import Intro from "./components/Intro/intro";
import Skills from "./components/Skills/skills";
import Works from "./components/Works/works";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/footer";
import Blogs from "./components/Blogs/Blogs";
import SingleBlog from "./components/Blogs/SingleBlog";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import Products from "./components/Products/products";
import Timeline from "./components/Timeline/Timeline";
import PageLoader from "./components/PageLoader/PageLoader";

function App() {
  return (
    <div className="App">
      <PageLoader />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Intro />
              <Skills />
              <Works />
              <Timeline />
              <Products />
              <Contact />
            </>
          }
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin2356" element={<Navigate to="/admin" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

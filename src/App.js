import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/navbar";
import Intro from "./components/Intro/intro";
import Skills from "./components/Skills/skills";
import Works from "./components/Works/works";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/footer";
import Blogs from "./components/Blogs/Blogs";
import SingleBlog from "./components/Blogs/SingleBlog";
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Intro />
              <Skills />
              <Works />
              <Contact />
            </>
          }
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/admin2356" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

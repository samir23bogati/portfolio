import React, { useState, useEffect } from "react";
import axios from "axios";
import { getApiUrl } from "../../apiConfig";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: [],
    sectionOne: "",
    sectionTwo: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const categories = [
    "Travel & Trekking", 
    "Programming", 
    "Technology & Development", 
    "Tech News & Insights"
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const baseUrl = getApiUrl();
      console.log("!!! ADMIN DASHBOARD USING URL:", baseUrl); // DEBUG LOG
      const response = await axios.get(`${baseUrl}/api/blogs`);
      // Since API returns object with blogs array now
      setBlogs(response.data.blogs || response.data); 
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const { category } = formData;
    if (checked) {
      setFormData({ ...formData, category: [...category, value] });
    } else {
      setFormData({ ...formData, category: category.filter((c) => c !== value) });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("category", formData.category); // Will be sent as comma-separated or multiple keys depending on backend handling, usually handled as array by Multer/Express if appended multiple times or simple string split
    data.append("sectionOne", formData.sectionOne);
    data.append("sectionTwo", formData.sectionTwo);
    if (image) {
      data.append("image", image);
    }

    try {
      const baseUrl = getApiUrl();
      if (editingId) {
        await axios.put(`${baseUrl}/api/blogs/${editingId}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Blog updated successfully!");
      } else {
        await axios.post(`${baseUrl}/api/blogs`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Blog created successfully!");
      }
      
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to save blog.";
      setMessage(`Error: ${errorMsg}`);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      category: [],
      sectionOne: "",
      sectionTwo: "",
    });
    setImage(null);
    setEditingId(null);
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      author: blog.author,
      category: blog.category || [],
      sectionOne: blog.sectionOne,
      sectionTwo: blog.sectionTwo,
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
        try {
            const baseUrl = getApiUrl();
            await axios.delete(`${baseUrl}/api/blogs/${id}`);
            setMessage("Blog deleted successfully!");
            fetchBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
            setMessage("Failed to delete blog.");
        }
    }
  };

  return (
    <section className="adminDashboard">
      <div className="adminContainer">
        <h2 className="adminTitle">{editingId ? "Edit Blog" : "Create a New Blog"}</h2>
        {message && <p className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</p>}
        
        <form onSubmit={handleSubmit} className="blogForm">
            {/* Title & Author Inputs (Same as before) */}
          <div className="formGroup">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="Enter blog title" />
          </div>

          <div className="formGroup">
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required placeholder="Enter author name" />
          </div>

          <div className="formGroup">
            <label>Category (Select Multiple)</label>
            <div className="categoryCheckboxGroup">
                {categories.map((cat) => (
                    <label key={cat} className="checkboxLabel">
                        <input 
                            type="checkbox" 
                            value={cat} 
                            checked={formData.category.includes(cat)}
                            onChange={handleCategoryChange}
                        />
                        {cat}
                    </label>
                ))}
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="sectionOne">Content Box 1 (Top)</label>
            <textarea id="sectionOne" name="sectionOne" value={formData.sectionOne} onChange={handleChange} required placeholder="Write the first part..." rows="6"></textarea>
          </div>

          <div className="formGroup">
            <label htmlFor="image">Blog Image (Middle)</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} />
          </div>

          <div className="formGroup">
            <label htmlFor="sectionTwo">Content Box 2 (Bottom)</label>
            <textarea id="sectionTwo" name="sectionTwo" value={formData.sectionTwo} onChange={handleChange} required placeholder="Write the second part..." rows="6"></textarea>
          </div>

          <div className="formActions">
            <button type="submit" className="submitBtn">{editingId ? "Update Blog" : "Publish Blog"}</button>
            {editingId && <button type="button" onClick={resetForm} className="cancelBtn">Cancel Edit</button>}
          </div>
        </form>
      </div>

      <div className="adminBlogList">
        <h3 className="listTitle">Manage Blogs</h3>
        {blogs.map(blog => (
            <div key={blog._id} className="adminBlogItem">
                <span>{blog.title}</span>
                <div className="adminActions">
                    <button onClick={() => handleEdit(blog)} className="editBtn">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="deleteBtn">Delete</button>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;

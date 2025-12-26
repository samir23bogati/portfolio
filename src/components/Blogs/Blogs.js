import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getApiUrl } from "../../apiConfig"; 
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [search, category, page]);

  const fetchBlogs = async () => {
    try {
      const baseUrl = getApiUrl();
      const response = await axios.get(`${baseUrl}/api/blogs`, {
        params: { search, category, page, limit: 9 }
      });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1); // Reset to page 1
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };

    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
  };

  return (
    <section className="blogsPage">
      <Helmet>
        <title>Blogs - Samir Bogati</title>
        <meta name="description" content="My professional blogs on tech, travel, and more." />
      </Helmet>

      <h2 className="pageTitle">My Blogs</h2>
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search blogs..." 
          value={search} 
          onChange={handleSearchChange} 
          className="searchBar"
        />
        
        <div className="categoryNav">
          <button className={category === "" ? "active" : ""} onClick={() => handleCategoryChange("")}>All</button>
          <button className={category === "Travel & Trekking" ? "active" : ""} onClick={() => handleCategoryChange("Travel & Trekking")}>Travel</button>
          <button className={category === "Programming" ? "active" : ""} onClick={() => handleCategoryChange("Programming")}>Programming</button>
          <button className={category === "Technology & Development" ? "active" : ""} onClick={() => handleCategoryChange("Technology & Development")}>Tech</button>
          <button className={category === "Tech News & Insights" ? "active" : ""} onClick={() => handleCategoryChange("Tech News & Insights")}>News</button>
        </div>
      </div>

      <div className="blogList">
        {blogs.length === 0 ? (
          <p className="noBlogs">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blogCard">
              {blog.image && (
                <img 
                  src={
                    blog.image.startsWith('data:') || blog.image.startsWith('http') 
                      ? blog.image 
                      : `${getApiUrl()}${blog.image}`
                  } 
                  alt={blog.title} 
                  className="blogCardImg" 
                />
              )}
              <h3 className="blogCardTitle">{blog.title}</h3>
              <div className="blogMeta">
                <span className="blogViews">👁️ {blog.views}</span>
                <span className="blogDate">{formatDate(blog.createdAt)}</span>
              </div>
              <div className="blogCardCategories">
                {Array.isArray(blog.category) ? blog.category.map((cat, idx) => (
                    <span key={idx} className="blogCategoryPill">{cat}</span>
                )) : <span className="blogCategoryPill">{blog.category}</span>}
              </div>
              <p className="blogCardContent">
                {/* Fallback for old content or sectionOne */}
                {(blog.sectionOne || blog.content || "").substring(0, 100)}...
              </p>
              <Link to={`/blogs/${blog._id}`} className="readMoreBtn">Read More</Link>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </section>
  );
};

export default Blogs;

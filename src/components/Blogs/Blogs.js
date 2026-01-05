import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getApiUrl } from "../../apiConfig";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);          // always array
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // always number
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [search, category, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");

    try {
      const baseUrl = getApiUrl();
      const response = await axios.get(`${baseUrl}/api/blogs`, {
        params: { search, category, page, limit: 9 },
      });

      const data = response?.data;

      if (Array.isArray(data)) {
        setBlogs(data);
        setTotalPages(1);
      } else if (Array.isArray(data?.blogs)) {
        setBlogs(data.blogs);
        setTotalPages(Number(data.totalPages) || 1);
      } else {
        setBlogs([]);
        setTotalPages(1);
      }

    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs. Please try again later.");
      setBlogs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date)) return "";

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const getDaySuffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
  };

  return (
    <section className="blogsPage">
      <Helmet>
        <title>Blogs - Samir Bogati</title>
        <meta
          name="description"
          content="My professional blogs on tech, travel, and more."
        />
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

      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : Array.isArray(blogs) && blogs.length === 0 ? (
        <p className="noBlogs">No blogs found.</p>
      ) : (
        <div className="blogList">
          {Array.isArray(blogs) &&
            blogs.map((blog) => (
              <div key={blog?._id} className="blogCard">
                {blog?.image && (
                  <img
                    src={
                      blog.image.startsWith("data:") ||
                      blog.image.startsWith("http")
                        ? blog.image
                        : `${getApiUrl()}${blog.image}`
                    }
                    alt={blog?.title || "Blog image"}
                    className="blogCardImg"
                  />
                )}

                <h3 className="blogCardTitle">{blog?.title}</h3>

                <div className="blogMeta">
                  <span className="blogViews">👁️ {blog?.views || 0}</span>
                  <span className="blogDate">
                    {formatDate(blog?.createdAt)}
                  </span>
                </div>

                <div className="blogCardCategories">
                  {Array.isArray(blog?.category) ? (
                    blog.category.map((cat, idx) => (
                      <span key={idx} className="blogCategoryPill">
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span className="blogCategoryPill">
                      {blog?.category}
                    </span>
                  )}
                </div>

                <p className="blogCardContent">
                  {(blog?.sectionOne || blog?.content || "").substring(0, 100)}...
                </p>

                <Link to={`/blogs/${blog?._id}`} className="readMoreBtn">
                  Read More
                </Link>
              </div>
            ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>

          <span>Page {page} of {totalPages}</span>

          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "./SingleBlog.css";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const baseUrl = `http://${window.location.hostname}:5000`;
      const response = await axios.get(`${baseUrl}/api/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
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

  if (!blog) return <div className="loading">Loading...</div>;

  return (
    <div className="singleBlogPage">
      <Helmet>
        <title>{blog.title} - Samir Bogati</title>
        <meta name="description" content={(blog.sectionOne || blog.content || "").substring(0, 150)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={(blog.sectionOne || blog.content || "").substring(0, 150)} />
      </Helmet>

      <div className="blogContainer">
        <h1 className="blogTitle">{blog.title}</h1>
        <div className="blogMeta">
          <span>By {blog.author}</span>
          <span> | </span>
          <span>{formatDate(blog.createdAt)}</span>
          <span> | </span>
          <span>👁️ {blog.views} Views</span>
        </div>
        
        <div className="blogCategoryTags">
            {Array.isArray(blog.category) ? blog.category.map((cat, idx) => (
                <span key={idx} className="blogCategoryTag">{cat}</span>
            )) : <span className="blogCategoryTag">{blog.category}</span>}
        </div>

        <div className="blogContent sectionOne">
          {blog.sectionOne ? (
            blog.sectionOne.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            // Fallback for old blogs
            blog.content && blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          )}
        </div>

        {blog.image && <img src={`http://localhost:5000${blog.image}`} alt={blog.title} className="blogImg" />}

        {blog.sectionTwo && (
          <div className="blogContent sectionTwo">
            {blog.sectionTwo.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          }
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;

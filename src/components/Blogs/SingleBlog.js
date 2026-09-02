import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../../apiConfig";
import {
  Seo,
  SITE_URL,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  toEmbedUrl,
} from "../../utils/seo";
import "./SingleBlog.css";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  const fetchBlog = useCallback(async () => {
    try {
      const response = await axios.get(`${getApiUrl()}/api/blogs/${id}`);
      setBlog(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError("Blog not found");
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const getDaySuffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
  };

  if (error) {
    return (
      <div className="singleBlogPage">
        <Seo title="Blog not found" noindex />
        <div className="blogContainer">
          <p className="loading">{error}</p>
          <Link to="/blogs" className="backToBlogs">
            ← Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) return <div className="loading">Loading...</div>;

  const imageSrc =
    blog.image &&
    (blog.image.startsWith("data:") || blog.image.startsWith("http")
      ? blog.image
      : `${getApiUrl()}${blog.image}`);

  const path = blog.slug ? `/#/blogs/${blog.slug}` : `/#/blogs/${blog._id}`;
  const articleUrl = `${SITE_URL}${path}`;
  const description =
    blog.metaDescription ||
    blog.excerpt ||
    (blog.sectionOne || blog.content || "").substring(0, 150);
  const embed = toEmbedUrl(blog.videoUrl);
  const isEmbedHost = embed.includes("youtube") || embed.includes("vimeo");

  return (
    <div className="singleBlogPage">
      <Seo
        title={blog.metaTitle || blog.title}
        description={description}
        keywords={blog.metaKeywords?.length ? blog.metaKeywords : blog.category}
        image={imageSrc}
        url={articleUrl}
        type="article"
        jsonLd={[
          buildArticleJsonLd(blog),
          buildBreadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/#/` },
            { name: "Blogs", url: `${SITE_URL}/#/blogs` },
            { name: blog.title, url: articleUrl },
          ]),
        ]}
      />

      <div className="blogContainer">
        <Link to="/blogs" className="backToBlogs">
          ← Back to blogs
        </Link>

        <h1 className="blogTitle">{blog.title}</h1>
        <div className="blogMeta">
          <span>By {blog.author || "Samir Bogati"}</span>
          <span> | </span>
          <span>{formatDate(blog.createdAt)}</span>
          <span> | </span>
          <span>👁️ {blog.views || 0} Views</span>
        </div>

        <div className="blogCategoryTags">
          {Array.isArray(blog.category) ? (
            blog.category.map((cat, idx) => (
              <span key={idx} className="blogCategoryTag">
                {cat}
              </span>
            ))
          ) : (
            <span className="blogCategoryTag">{blog.category}</span>
          )}
        </div>

        <div className="blogContent sectionOne">
          {blog.sectionOne
            ? blog.sectionOne.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            : blog.content &&
              blog.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
        </div>

        {imageSrc && (
          <img
            src={imageSrc}
            alt={blog.imageAlt || blog.title}
            className="blogImg"
          />
        )}

        {embed && (
          <div className="blogVideoWrap">
            {isEmbedHost ? (
              <iframe
                src={embed}
                title={blog.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={embed} controls playsInline />
            )}
          </div>
        )}

        {blog.sectionTwo && (
          <div className="blogContent sectionTwo">
            {blog.sectionTwo.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;

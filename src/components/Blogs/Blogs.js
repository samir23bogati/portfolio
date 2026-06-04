import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getApiUrl } from "../../apiConfig";
import "./Blogs.css";

const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

const getCache = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
};

const setCache = (key, data) => {
  try { sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
};

const SkeletonCard = () => (
  <div className="blogCard skeletonCard" aria-hidden="true">
    <div className="skeleton skeletonImg" />
    <div className="skeletonBody">
      <div className="skeleton skeletonLine wide" />
      <div className="skeleton skeletonLine medium" />
      <div className="skeleton skeletonLine full" />
      <div className="skeleton skeletonLine narrow" />
      <div className="skeleton skeletonPill" />
    </div>
  </div>
);

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const suffix = day > 3 && day < 21 ? "th" : ["th", "st", "nd", "rd", "th"][Math.min(day % 10, 4)];
  return `${day}${suffix} ${month}, ${year}`;
};

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Travel", value: "Travel & Trekking" },
  { label: "Programming", value: "Programming" },
  { label: "Tech", value: "Technology & Development" },
  { label: "News", value: "Tech News & Insights" },
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Debounce the search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchBlogs = useCallback(async () => {
    const cacheKey = `blogs_${debouncedSearch}_${category}_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      setBlogs(cached.blogs);
      setTotalPages(cached.totalPages);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const baseUrl = getApiUrl();
      const response = await axios.get(`${baseUrl}/api/blogs`, {
        params: { search: debouncedSearch, category, page, limit: 9 },
      });

      const data = response?.data;
      let fetchedBlogs = [];
      let fetchedTotal = 1;

      if (Array.isArray(data)) {
        fetchedBlogs = data;
      } else if (Array.isArray(data?.blogs)) {
        fetchedBlogs = data.blogs;
        fetchedTotal = Number(data.totalPages) || 1;
      }

      setBlogs(fetchedBlogs);
      setTotalPages(fetchedTotal);
      setCache(cacheKey, { blogs: fetchedBlogs, totalPages: fetchedTotal });
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs. Please try again later.");
      setBlogs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <section className="blogsPage">
      <Helmet>
        <title>Blogs - Samir Bogati</title>
        <meta name="description" content="My professional blogs on tech, travel, and more." />
      </Helmet>

      <div className="blogsHeader">
        <h2 className="pageTitle">My Blogs</h2>
        <p className="pageSubtitle">Thoughts on tech, travel, and everything in between</p>
      </div>

      <div className="filters">
        <div className="searchWrapper">
          <span className="searchIcon">&#9906;</span>
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="searchBar"
          />
        </div>

        <div className="categoryNav">
          {CATEGORIES.map(({ label, value }) => (
            <button
              key={value}
              className={category === value ? "active" : ""}
              onClick={() => handleCategoryChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="blogList">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="blogsEmpty">
          <p className="error">{error}</p>
          <button className="retryBtn" onClick={fetchBlogs}>Try Again</button>
        </div>
      ) : blogs.length === 0 ? (
        <div className="blogsEmpty">
          <p className="noBlogs">No blogs found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="blogList">
          {blogs.map((blog) => (
            <div key={blog?._id} className="blogCard">
              {blog?.image && (
                <div className="blogCardImgWrap">
                  <img
                    src={
                      blog.image.startsWith("data:") || blog.image.startsWith("http")
                        ? blog.image
                        : `${getApiUrl()}${blog.image}`
                    }
                    alt={blog?.title || "Blog image"}
                    className="blogCardImg"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="blogCardBody">
                <div className="blogCardCategories">
                  {Array.isArray(blog?.category)
                    ? blog.category.map((cat, idx) => (
                        <span key={idx} className="blogCategoryPill">{cat}</span>
                      ))
                    : <span className="blogCategoryPill">{blog?.category}</span>
                  }
                </div>

                <h3 className="blogCardTitle">{blog?.title}</h3>

                <p className="blogCardContent">
                  {(blog?.sectionOne || blog?.content || "").substring(0, 110)}...
                </p>

                <div className="blogCardFooter">
                  <div className="blogMeta">
                    <span className="blogViews">&#128065; {blog?.views || 0}</span>
                    <span className="blogDate">{formatDate(blog?.createdAt)}</span>
                  </div>
                  <Link to={`/blogs/${blog?._id}`} className="readMoreBtn">
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            &larr; Prev
          </button>
          <span className="pageInfo">Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next &rarr;
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs;

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { getApiUrl } from "../../apiConfig";
import { useAuth } from "../../context/AuthContext";
import { Seo, slugifyClient, runSeoChecks, SITE_URL } from "../../utils/seo";
import "./AdminDashboard.css";

const CATEGORIES = [
  "Travel & Trekking",
  "Programming",
  "Technology & Development",
  "Tech News & Insights",
];

const emptyForm = {
  title: "",
  slug: "",
  author: "Samir Bogati",
  category: [],
  excerpt: "",
  sectionOne: "",
  sectionTwo: "",
  videoUrl: "",
  imageAlt: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  focusKeyword: "",
};

const AdminDashboard = () => {
  const { authHeader, logout, admin } = useAuth();
  const [formData, setFormData] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [slugManual, setSlugManual] = useState(false);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!slugManual && formData.title) {
      setFormData((prev) => ({ ...prev, slug: slugifyClient(prev.title) }));
    }
  }, [formData.title, slugManual]);

  const seoReport = useMemo(
    () =>
      runSeoChecks({
        focusKeyword: formData.focusKeyword,
        title: formData.metaTitle || formData.title,
        slug: formData.slug,
        content: `${formData.sectionOne}\n${formData.sectionTwo}`,
        metaDescription: formData.metaDescription,
        imageAlt: formData.imageAlt,
      }),
    [formData]
  );

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${getApiUrl()}/api/blogs`, {
        params: { limit: 100 },
      });
      setBlogs(response.data.blogs || response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, value]
        : prev.category.filter((c) => c !== value),
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setImage(null);
    setVideoFile(null);
    setEditingId(null);
    setSlugManual(false);
  };

  const buildFormPayload = () => {
    const data = new FormData();
    Object.entries({
      title: formData.title,
      slug: formData.slug,
      author: formData.author,
      excerpt: formData.excerpt,
      sectionOne: formData.sectionOne,
      sectionTwo: formData.sectionTwo,
      videoUrl: formData.videoUrl,
      imageAlt: formData.imageAlt,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      metaKeywords: formData.metaKeywords,
      focusKeyword: formData.focusKeyword,
    }).forEach(([key, value]) => data.append(key, value ?? ""));

    data.append("category", formData.category.join(","));
    if (image) data.append("image", image);
    if (videoFile) data.append("video", videoFile);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category.length) {
      setMessage("Error: Select at least one category.");
      return;
    }

    setSaving(true);
    setMessage("");
    const data = buildFormPayload();

    try {
      const baseUrl = getApiUrl();
      const headers = {
        "Content-Type": "multipart/form-data",
        ...authHeader(),
      };

      if (editingId) {
        await axios.put(`${baseUrl}/api/blogs/${editingId}`, data, { headers });
        setMessage("Blog updated successfully!");
      } else {
        await axios.post(`${baseUrl}/api/blogs`, data, { headers });
        setMessage("Blog created successfully!");
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      if (error.response?.status === 401) {
        setMessage("Error: Session expired. Please sign in again.");
        logout();
      } else {
        const errorMsg = error.response?.data?.message || error.message || "Failed to save blog.";
        setMessage(`Error: ${errorMsg}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setSlugManual(true);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || slugifyClient(blog.title || ""),
      author: blog.author || "Samir Bogati",
      category: blog.category || [],
      excerpt: blog.excerpt || "",
      sectionOne: blog.sectionOne || "",
      sectionTwo: blog.sectionTwo || "",
      videoUrl: blog.videoUrl || "",
      imageAlt: blog.imageAlt || "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: Array.isArray(blog.metaKeywords)
        ? blog.metaKeywords.join(", ")
        : blog.metaKeywords || "",
      focusKeyword: blog.focusKeyword || "",
    });
    setImage(null);
    setVideoFile(null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${getApiUrl()}/api/blogs/${id}`, {
        headers: authHeader(),
      });
      setMessage("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      if (error.response?.status === 401) {
        setMessage("Error: Session expired. Please sign in again.");
        logout();
      } else {
        setMessage("Failed to delete blog.");
      }
    }
  };

  const serpTitle = (formData.metaTitle || formData.title || "Untitled").slice(0, 70);
  const serpDesc = (
    formData.metaDescription ||
    formData.excerpt ||
    formData.sectionOne ||
    ""
  ).slice(0, 160);
  const serpUrl = `${SITE_URL}/#/blogs/${formData.slug || "your-slug"}`;

  return (
    <section className="adminDashboard">
      <Seo title="Admin" noindex />

      <div className="adminTopBar">
        <p>
          Signed in as <strong>{admin?.email || admin?.username}</strong>
        </p>
        <button type="button" className="logoutBtn" onClick={logout}>
          Log out
        </button>
      </div>

      <div className="adminContainer">
        <h2 className="adminTitle">{editingId ? "Edit Blog" : "Create a New Blog"}</h2>
        {message && (
          <p className={`message ${message.includes("Error") ? "error" : "success"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="blogForm">
          <div className="formGroup">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="slug">URL slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={(e) => {
                setSlugManual(true);
                setFormData((prev) => ({
                  ...prev,
                  slug: slugifyClient(e.target.value),
                }));
              }}
              placeholder="my-blog-post"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Enter author name"
            />
          </div>

          <div className="formGroup">
            <label>Category (Select Multiple)</label>
            <div className="categoryCheckboxGroup">
              {CATEGORIES.map((cat) => (
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
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Short summary for cards & SEO"
              rows="3"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="sectionOne">Content Box 1 (Top)</label>
            <textarea
              id="sectionOne"
              name="sectionOne"
              value={formData.sectionOne}
              onChange={handleChange}
              required
              placeholder="Write the first part..."
              rows="6"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="image">Blog Image (Middle)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0] || null)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="imageAlt">Image alt text</label>
            <input
              type="text"
              id="imageAlt"
              name="imageAlt"
              value={formData.imageAlt}
              onChange={handleChange}
              placeholder="Describe the image for SEO & a11y"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="sectionTwo">Content Box 2 (Bottom)</label>
            <textarea
              id="sectionTwo"
              name="sectionTwo"
              value={formData.sectionTwo}
              onChange={handleChange}
              placeholder="Write the second part..."
              rows="6"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="videoUrl">Video URL (YouTube / Vimeo / direct)</label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div className="formGroup">
            <label htmlFor="video">Or upload video file</label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0] || null)}
            />
            <p className="fieldHint">
              Large uploads need Cloudinary env on the backend. Otherwise paste a YouTube/Vimeo
              link.
            </p>
          </div>

          <div className="seoPanel">
            <h3>SEO</h3>
            <div className="serpPreview">
              <p className="serpUrl">{serpUrl}</p>
              <p className="serpTitle">{serpTitle}</p>
              <p className="serpDesc">{serpDesc}</p>
            </div>

            <div className="formGroup">
              <label htmlFor="focusKeyword">Focus keyword</label>
              <input
                type="text"
                id="focusKeyword"
                name="focusKeyword"
                value={formData.focusKeyword}
                onChange={handleChange}
                placeholder="e.g. react hooks"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="metaTitle">
                Meta title ({(formData.metaTitle || "").length}/70)
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                maxLength={70}
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="Defaults to title"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="metaDescription">
                Meta description ({(formData.metaDescription || "").length}/160)
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                maxLength={160}
                value={formData.metaDescription}
                onChange={handleChange}
                rows="3"
                placeholder="Defaults from excerpt / content"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="metaKeywords">Meta keywords (comma separated)</label>
              <input
                type="text"
                id="metaKeywords"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
                placeholder="react, nepal, travel"
              />
            </div>

            <ul className={`seoChecks score-${seoReport.score}`}>
              {seoReport.checks.map((check) => (
                <li key={check.id} className={`seoCheck ${check.status}`}>
                  {check.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="formActions">
            <button type="submit" className="submitBtn" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Update Blog" : "Publish Blog"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="cancelBtn">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="adminBlogList">
        <h3 className="listTitle">Manage Blogs</h3>
        {blogs.map((blog) => (
          <div key={blog._id} className="adminBlogItem">
            <div>
              <span>{blog.title}</span>
              {blog.slug && <small className="blogSlug">/{blog.slug}</small>}
            </div>
            <div className="adminActions">
              <button onClick={() => handleEdit(blog)} className="editBtn" type="button">
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="deleteBtn"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;

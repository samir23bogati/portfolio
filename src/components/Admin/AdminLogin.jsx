import React, { useState } from "react";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Seo } from "../../utils/seo";
import "./AdminLogin.css";

const AdminLogin = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (loading) return <div className="adminLoading">Loading…</div>;

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || "/admin"} replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="adminLoginPage">
      <Seo title="Admin login" description="Admin sign in" noindex />
      <div className="adminLoginCard">
        <Link to="/" className="adminLoginBrand">
          Samir Bogati
        </Link>
        <h1>Admin sign in</h1>
        <p className="adminLoginHint">Single-admin access. No public signup.</p>

        <form onSubmit={onSubmit} noValidate>
          {error && <p className="adminLoginError">{error}</p>}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

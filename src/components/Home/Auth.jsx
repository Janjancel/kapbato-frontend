import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle between Login & Register
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    formik.resetForm(); // Reset form when switching
  };

  // Formik form handling
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: isLogin
        ? Yup.string() // No validation for login
        : Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
      email: isLogin
        ? Yup.string() // No validation for login (can use username or email)
        : Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: isLogin
        ? Yup.string()
        : Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const url = isLogin
        ? "http://127.0.0.1:8000/api/login/"
        : "http://127.0.0.1:8000/api/register/";

      try {
        const payload = isLogin
          ? { identifier: values.email, password: values.password } // Identifier allows username or email
          : { username: values.username, email: values.email, password: values.password };

        console.log("📩 Sending request to:", url);
        console.log("📝 Payload:", payload);

        const response = await axios.post(url, payload, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("✅ Response:", response.data);

        Swal.fire({
          title: isLogin ? "Login Successful!" : "Registration Successful!",
          text: isLogin ? "Welcome back!" : "You can now log in.",
          icon: "success",
          confirmButtonText: "OK",
        });

        if (isLogin) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isSuperuser", response.data.is_superuser);

          if (response.data.is_superuser) {
            navigate("/admin/dashboard/");
          } else {
            navigate("/");
          }

          window.location.reload();
        } else {
          setIsLogin(true);
          resetForm();
        }
      } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);

        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Invalid username/email or password.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className={`auth-wrapper ${isLogin ? "slide-left" : "slide-right"}`}>
        {/* Left Section (Register Form / Message) */}
        <div className="auth-section left-section">
          {!isLogin ? (
            <div className="form-wrapper visible">
              <h2>Register</h2>
              <form onSubmit={formik.handleSubmit}>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.username && formik.errors.username && <p className="error">{formik.errors.username}</p>}

                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}

                <label>Password:</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="password-input"
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}

                <label>Confirm Password:</label>
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="password-input"
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="error">{formik.errors.confirmPassword}</p>
                )}

                <button className="auth-btn" type="submit" disabled={formik.isSubmitting}>
                  Register
                </button>
              </form>
              <p>
                Already have an account?{" "}
                <span onClick={toggleAuthMode} className="toggle-link">
                  Login here
                </span>
              </p>
            </div>
          ) : (
            <div className="text-container" id="login">
              <p>Welcome back! Login to continue.</p>
            </div>
          )}
        </div>

        {/* Right Section (Login Form / Message) */}
        <div className="auth-section right-section">
          {isLogin ? (
            <div className="form-wrapper visible">
              <h2>Login</h2>
              <form onSubmit={formik.handleSubmit}>
                <label>Username or Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />

                <label>Password:</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="password-input"
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button className="auth-btn" type="submit" disabled={formik.isSubmitting}>
                  Login
                </button>
              </form>
              <p>
                Don't have an account?{" "}
                <span onClick={toggleAuthMode} className="toggle-link">
                  Register here
                </span>
              </p>
            </div>
          ) : (
            <div className="text-container" id="register">
              <p>Join us today and create an account!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

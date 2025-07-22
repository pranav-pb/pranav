import React, { useState, useRef } from "react";
import "./regform.css";

function RegForm() {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    customRole: "",
    workspaceUrl: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role";
    } else if (formData.role === "Other" && !formData.customRole.trim()) {
      newErrors.customRole = "Please specify your role";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const finalRole =
        formData.role === "Other" ? formData.customRole : formData.role;
      console.log({
        ...formData,
        role: finalRole,
        profileImage,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          customRole: "",
          workspaceUrl: "",
          password: "",
          confirmPassword: "",
        });
        setProfileImage(null);
      }, 3000);
    }
  };

  return (
    <div className="registration-container">
      <div className="welcome-section">
        <h1>Welcome!</h1>
        <p className="subtitle">First things first...</p>
        <p className="instruction">
          Create a profile to personalize how you'll appear to collaborators
        </p>
      </div>

      <div className="form-container">
        {isSubmitted ? (
          <div className="success-message">
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully.</p>
            <div className="success-icon">✓</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="profile-section">
              <div className="profile-preview">
                {profileImage ? (
                  <img src={profileImage} alt="Profile preview" />
                ) : (
                  <div className="no-image" />
                )}
                <button
                  type="button"
                  className="camera-icon-btn"
                  onClick={() => fileInputRef.current.click()}
                  title="Change Photo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#fff"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5.9l1.45 1.36 2.59-.28.28 2.59L18.1 12l-1.36 1.45.28 2.59-2.59.28L12 18.1l-1.45-1.36-2.59.28-.28-2.59L5.9 12l1.36-1.45-.28-2.59 2.59-.28L12 5.9z" />
                  </svg>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>

            <div className="name-fields">
              <div className="input-group">
                <label>FIRST NAME</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="input-group">
                <label>LAST NAME</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label>ROLE</label>
              <div className="role-options">
                {["Designer", "Developer", "Other"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    className={`role-btn ${
                      formData.role === role ? "active" : ""
                    } ${errors.role ? "error-border" : ""}`}
                    onClick={() => {
                      setFormData({ ...formData, role, customRole: "" });
                      setErrors({ ...errors, role: "", customRole: "" });
                    }}
                  >
                    {role}
                  </button>
                ))}
              </div>
              {errors.role && (
                <span className="error-message">{errors.role}</span>
              )}

              {formData.role === "Other" && (
                <div className="input-group" style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    name="customRole"
                    placeholder="Please specify your role"
                    value={formData.customRole}
                    onChange={handleChange}
                    className={errors.customRole ? "error" : ""}
                  />
                  {errors.customRole && (
                    <span className="error-message">{errors.customRole}</span>
                  )}
                </div>
              )}
            </div>

            <div className="input-group">
              <label>WORKSPACE URL</label>
              <input
                type="text"
                name="workspaceUrl"
                value={formData.workspaceUrl}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="create-btn">
                Create Workspace
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegForm;

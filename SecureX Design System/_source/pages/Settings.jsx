import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/settings.css";
import { apiCall } from "../api";

const Settings = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("settings");
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: ""
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Helper
  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  // Fetch Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await apiCall("/api/users/profile", "GET");
        const rawUser = profileData.data || profileData.user || profileData;
        
        let firstName = rawUser.firstName;
        let lastName = rawUser.lastName;
        if (!firstName && rawUser.name) {
          const parts = rawUser.name.split(" ");
          firstName = parts[0];
          lastName = parts.slice(1).join(" ");
        }

        setUserData({ firstName, lastName, email: rawUser.email });
        setFormData({
          firstName: firstName || "",
          lastName: lastName || "",
          email: rawUser.email || "",
          phone: rawUser.phone || "",
          bio: rawUser.bio || ""
        });
        
        // If user has avatar URL
        if (rawUser.avatar) setAvatarPreview(rawUser.avatar);

      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      // In a real app, you would upload this file to S3/Cloudinary here
      // and get a URL back to save in the profile.
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {

      await apiCall("/api/users/profile", "PUT", formData);
      alert("Profile updated successfully!");
      
      // Update local state to reflect changes immediately
      setUserData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      });
      
    } catch (err) {
      alert(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-page">
      {/* Main Sidebar */}
      <aside className={`settings-sidebar-main ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Transactions</span>
          </button>
          <button onClick={() => navigate("/ai-insights")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>AI Insights</span>
          </button>
          <button onClick={() => navigate("/verification")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Verification</span>
          </button>
          <button className="active">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{getInitials(userData)}</div>
            <div className="user-info">
              <p className="user-name">{userData ? `${userData.firstName} ${userData.lastName}` : "Guest"}</p>
              <p className="user-email">{userData?.email || "..."}</p>
            </div>
          </div>
          <button className="sign-out-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 13L3 9M3 9L7 5M3 9H11M11 3H13C14.1046 3 15 3.89543 15 5V13C15 14.1046 14.1046 15 13 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content Area */}
      <main className="settings-main-content">
        <header className="settings-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.25" stroke="#7A7A7A" strokeWidth="1.5"/><path d="M12 12L15.5 15.5" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search settings..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C10 4 6 7 6 10C6 12 7.34315 13 9 13H11C12.6569 13 14 12 14 10C14 7 10 4 10 4Z" stroke="#1E1E1E" strokeWidth="1.5"/><path d="M9 16H11" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span className="notification-badge">1</span>
            </button>
            <button className="user-btn">
              <div className="user-avatar-small">{getInitials(userData)}</div>
            </button>
          </div>
        </header>

        <div className="settings-body">
          {/* Page Header */}
          <div className="settings-page-header">
            <h1>Settings</h1>
            <p>Manage your account preferences and security</p>
          </div>

          {/* Layout: Side Tabs + Content */}
          <div className="settings-layout">
            {/* Internal Tabs */}
            <div className="settings-tabs">
              <button className={`tab-btn ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M4 16C4 12.6863 6.68629 10 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Profile
              </button>
              <button className={`tab-btn ${activeTab === "security" ? "active" : ""}`} onClick={() => setActiveTab("security")}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 5V9C3 12.5 6 16 9 17C12 16 15 12.5 15 9V5L9 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Security
              </button>
              <button className={`tab-btn ${activeTab === "payment" ? "active" : ""}`} onClick={() => setActiveTab("payment")}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 9H16" stroke="currentColor" strokeWidth="1.5"/></svg>
                Payment Methods
              </button>
              <button className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`} onClick={() => setActiveTab("notifications")}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2C6.23858 2 4 4.23858 4 7V11L3 13H15L14 11V7C14 4.23858 11.7614 2 9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 13C7 14.1046 7.89543 15 9 15C10.1046 15 11 14.1046 11 13" stroke="currentColor" strokeWidth="1.5"/></svg>
                Notifications
              </button>
            </div>

            {/* Content Area */}
            <div className="settings-content">
              {loading ? (
                <div className="loading-state">Loading...</div>
              ) : (
                <>
                  {activeTab === "profile" && (
                    <div className="settings-card">
                      <h2>Profile Settings</h2>
                      
                      {/* Avatar Section */}
                      <div className="profile-picture-section">
                        <div className="avatar-large">
                          {avatarPreview ? <img src={avatarPreview} alt="Profile" /> : <span>{getInitials(userData)}</span>}
                        </div>
                        <div className="avatar-actions">
                          <input type="file" id="avatar-upload" hidden accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} />
                          <button className="btn-upload" onClick={() => document.getElementById('avatar-upload').click()}>
                            Upload New Photo
                          </button>
                          <p className="avatar-hint">JPG, PNG or GIF. Max size 2MB.</p>
                        </div>
                      </div>

                      <form className="settings-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <div className="form-row">
                          <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Email Address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} disabled className="disabled-input" />
                          <span className="input-hint">Email can only be changed by support</span>
                        </div>

                        <div className="form-group">
                          <label>Phone Number</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 800 000 0000" />
                        </div>

                        <div className="form-group">
                          <label>Bio</label>
                          <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange} placeholder="Tell us a little about yourself..."></textarea>
                        </div>

                        <div className="form-actions">
                          <button type="button" className="btn-cancel" onClick={() => setActiveNav("settings")}>Cancel</button>
                          <button type="submit" className="btn-save" disabled={saving}>
                            {saving ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {activeTab !== "profile" && (
                    <div className="settings-card empty-state">
                      <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                      <p>This section is coming soon.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
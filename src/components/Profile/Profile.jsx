// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaEdit } from "react-icons/fa";

// export default function Profile() {
//   const [profilePic, setProfilePic] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [userDetails, setUserDetails] = useState({ name: "", email: "" });

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("No authentication token found.");
//       return;
//     }

//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/user-profile/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const { name, email, profile_picture } = response.data;
//       setUserDetails({ name: name || "N/A", email: email || "N/A" });

//       if (profile_picture) {
//         setPreview(profile_picture);
//         localStorage.setItem("profileImage", profile_picture);
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setProfilePic(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpload = async () => {
//     const token = localStorage.getItem("token");
//     if (!profilePic) {
//       alert("Please select an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("profile_picture", profilePic);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/upload-profile-picture/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setPreview(response.data.profile_picture);
//         localStorage.setItem("profileImage", response.data.profile_picture);
//         alert("Profile picture updated successfully!");
//         fetchUserProfile(); // Refresh user info after upload
//       } else {
//         alert(`Failed to upload: ${response.data.error || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//       alert("Failed to upload profile picture.");
//     }
//   };

//   return (
//     <section className="container-fluid bg-light py-4">
//       <div className="container">
//         {/* Header */}
//         <div className="text-start mb-4">
//           <h2 className="d-flex align-items-center gap-2">
//             My Profile <FaEdit className="text-primary" />
//           </h2>
//           <p className="text-muted">Manage and protect your account</p>
//           <hr />
//         </div>

//         {/* Profile Layout */}
//         <div className="row">
//           {/* Left Section - Account Details */}
//           <div className="col-lg-8">
//             <div className="card p-4 shadow-sm">
//               <h4>Account Details</h4>
//               <p><strong>Name:</strong> {userDetails.name}</p>
//               <p><strong>Email:</strong> {userDetails.email}</p>
//             </div>
//           </div>

//           {/* Right Section - Profile Picture */}
//           <div className="col-lg-4 d-flex flex-column align-items-center border-start">
//             <div className="position-relative mb-3">
//               <label htmlFor="file-input">
//                 <div 
//                   className="rounded-circle border border-primary overflow-hidden d-flex align-items-center justify-content-center" 
//                   style={{ width: "120px", height: "120px", backgroundColor: "#f0f0f0" }}
//                 >
//                   <img
//                     src={preview || "default-profile.png"}
//                     alt="Profile"
//                     className="w-100 h-100"
//                     style={{ objectFit: "cover", borderRadius: "50%" }}
//                   />
//                 </div>
//               </label>
//               <input
//                 id="file-input"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 hidden
//               />
//             </div>

//             <button onClick={handleUpload} className="btn btn-primary">
//               Upload
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";

export default function Profile() {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("default-profile.png");
  const [userDetails, setUserDetails] = useState({ full_name: "", email: "" });


  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch current user details
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No authentication token found.");
      return;
    }
  
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user-profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("API Response:", response.data); // Debugging
  
      const { full_name, email, profile_picture } = response.data;
  
      setUserDetails({ full_name: full_name || "N/A", email: email || "N/A" });
  
      if (profile_picture) {
        setPreview(profile_picture);
        localStorage.setItem("profileImage", profile_picture);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data || error);
    }
  };
  
  
  

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle profile picture upload
  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!profilePic) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", profilePic);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload-profile-picture/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setPreview(response.data.profile_picture);
        localStorage.setItem("profileImage", response.data.profile_picture);
        alert("Profile picture updated successfully!");
        fetchUserProfile(); // Refresh user info after upload
      } else {
        alert(`Failed to upload: ${response.data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    }
  };

  return (
    <section className="container-fluid bg-light py-4">
      <div className="container">
        {/* Header */}
        <div className="text-start mb-4">
          <h2 className="d-flex align-items-center gap-2">
            My Profile <FaEdit className="text-primary" />
          </h2>
          <p className="text-muted">Manage and protect your account</p>
          <hr />
        </div>

        {/* Profile Layout */}
        <div className="row">
          {/* Left Section - Account Details */}
          <div className="col-lg-8">
            <div className="card p-4 shadow-sm">
              <h4>Account Details</h4>
              <p><strong>Name:</strong> {userDetails.full_name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
            </div>
          </div>

          {/* Right Section - Profile Picture */}
          <div className="col-lg-4 d-flex flex-column align-items-center border-start">
            <div className="position-relative mb-3">
              <label htmlFor="file-input">
                <div 
                  className="rounded-circle border border-primary overflow-hidden d-flex align-items-center justify-content-center" 
                  style={{ width: "120px", height: "120px", backgroundColor: "#f0f0f0" }}
                >
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-100 h-100"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </div>

            <button onClick={handleUpload} className="btn btn-primary">
              Upload
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

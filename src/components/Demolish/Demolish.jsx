import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "bootstrap/dist/css/bootstrap.min.css";

const Demolition = () => {
    const [formData, setFormData] = useState({
        where: "",
        name: "",
        contact: "",
        price: "",
        description: "",
        image: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        const data = new FormData();
        data.append("where", formData.where);
        data.append("name", formData.name);
        data.append("contact", formData.contact);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("image", formData.image);
    
        // Get authentication token (assuming stored in localStorage)
        const token = localStorage.getItem("token"); 
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/demolition/", data, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: token ? `Token ${token}` : "",
                },
            });
    
            Swal.fire({
                title: "Success!",
                text: response.data.message || "Your demolition request has been submitted.",
                icon: "success",
                confirmButtonText: "OK",
            });
    
            setFormData({
                where: "",
                name: "",
                contact: "",
                price: "",
                description: "",
                image: null,
            });
    
        } catch (error) {
            console.error("Error submitting form:", error);
            const errorMessage = error.response?.data
                ? Object.values(error.response.data).flat().join("\n")
                : "Failed to submit the form. Please try again.";
    
            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="fw-bold">Demolition Request</h1>
                <p className="text-muted">Fill out the form below to submit your demolition request</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <form onSubmit={handleSubmit} className="card p-4 shadow">
                        <div className="mb-3">
                            <label className="form-label">Where</label>
                            <input 
                                type="text" 
                                name="where" 
                                className="form-control" 
                                value={formData.where} 
                                onChange={handleChange} 
                                placeholder="Enter location" 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Enter your name" 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contact No</label>
                            <input 
                                type="text" 
                                name="contact" 
                                className="form-control" 
                                value={formData.contact} 
                                onChange={handleChange} 
                                placeholder="Enter contact number" 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input 
                                type="number" 
                                name="price" 
                                className="form-control" 
                                value={formData.price} 
                                onChange={handleChange} 
                                placeholder="Enter price" 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea 
                                name="description" 
                                className="form-control" 
                                value={formData.description} 
                                onChange={handleChange} 
                                placeholder="Enter description" 
                                rows="3" 
                                required 
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Upload Image</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="form-control" 
                                onChange={handleImageChange} 
                                required 
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Request"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Demolition;

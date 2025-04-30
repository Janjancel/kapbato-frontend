import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Image } from "react-bootstrap";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";

const SellDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/sell-requests/");
                setRequests(response.data);
                setFilteredRequests(response.data);
            } catch (err) {
                console.error("Error fetching sell requests:", err);
                setError("Failed to fetch sell requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        const filtered = requests.filter((request) =>
            request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.where.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRequests(filtered);
    }, [searchQuery, requests]);

    // 🔹 PDF Download Function
    const handleDownloadPDF = async () => {
        if (!selectedRequest) return;

        const doc = new jsPDF("portrait", "mm", "a4");
        doc.setFontSize(22);
        doc.text("Sell Request Details", 15, 20);

        doc.setFontSize(14);
        doc.text(`ID: ${selectedRequest.id}`, 15, 40);
        doc.text(`Name: ${selectedRequest.name}`, 15, 50);
        doc.text(`Contact: ${selectedRequest.contact}`, 15, 60);
        doc.text(`Location: ${selectedRequest.where}`, 15, 70);
        doc.text(`Price: $${selectedRequest.price.toLocaleString()}`, 15, 80);

        const description = doc.splitTextToSize(`Description: ${selectedRequest.description}`, 180);
        doc.text(description, 15, 90);

        if (selectedRequest.image) {
            try {
                const response = await fetch(`http://127.0.0.1:8000${selectedRequest.image}`);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    doc.addImage(reader.result, "JPEG", 120, 40, 80, 80);
                    doc.save(`Sell_Request_${selectedRequest.id}.pdf`);
                };
            } catch (error) {
                console.error("Error fetching image:", error);
                doc.save(`Sell_Request_${selectedRequest.id}.pdf`);
            }
        } else {
            doc.save(`Sell_Request_${selectedRequest.id}.pdf`);
        }
    };

    // 🔹 Excel Download Function
    const handleDownloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredRequests);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sell Requests");

        XLSX.writeFile(wb, "Sell_Requests.xlsx");
    };

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div
                className="bg-white p-4 rounded shadow position-relative"
                style={{
                    width: "80vw",
                    maxHeight: "90vh",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingBottom: "60px"
                }}
            >
                {/* Header with Search Bar */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Sell Requests</h2>
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search requests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: "250px" }}
                    />
                </div>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : (
                    <div className="table-responsive" style={{ maxHeight: "60vh", overflow: "auto" }}>
                        <table className="table table-bordered table-striped table-hover text-center" style={{ "--bs-table-hover-bg": "#ffeb99" }}>
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((request) => (
                                        <tr key={request.id} onClick={() => setSelectedRequest(request)} style={{ cursor: "pointer" }}>
                                            <td>{request.id}</td>
                                            <td>{request.name}</td>
                                            <td>{request.contact}</td>
                                            <td>{request.where}</td>
                                            <td>${request.price.toLocaleString()}</td>
                                            <td>{request.description}</td>
                                            <td>
                                                <Image
                                                    src={`http://127.0.0.1:8000${request.image}`}
                                                    alt="Property"
                                                    width="50"
                                                    height="50"
                                                    rounded
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">
                                            No results found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ✅ Download Buttons Positioned at the Bottom Right */}
                <div className="d-flex justify-content-end mt-3">
                    <Button className="btn btn-success" onClick={handleDownloadExcel}>
                        Download Excel
                    </Button>
                </div>

                {/* MODAL (A4-SIZED POPOVER) */}
                {selectedRequest && (
                    <Modal show={true} onHide={() => setSelectedRequest(null)} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Sell Request Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>ID:</strong> {selectedRequest.id}</p>
                                    <p><strong>Name:</strong> {selectedRequest.name}</p>
                                    <p><strong>Contact:</strong> {selectedRequest.contact}</p>
                                    <p><strong>Location:</strong> {selectedRequest.where}</p>
                                    <p><strong>Price:</strong> ${selectedRequest.price.toLocaleString()}</p>
                                    <p><strong>Description:</strong> {selectedRequest.description}</p>
                                </div>
                                <div className="col-md-6 d-flex justify-content-center">
                                    <Image
                                        src={`http://127.0.0.1:8000${selectedRequest.image}`}
                                        alt="Property"
                                        className="img-fluid"
                                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleDownloadPDF}>
                                Download PDF
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default SellDashboard;

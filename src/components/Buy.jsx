import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

const Buy = () => {
    const [antiques, setAntiques] = useState([]);
    const [filteredAntiques, setFilteredAntiques] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const fetchAntiques = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                console.warn("❌ No authentication token found.");
                setIsAuthenticated(false);
                return;
            }

            setIsAuthenticated(true);

            try {
                console.log("🔍 Fetching antiques with token:", token);
                const response = await axios.get("http://127.0.0.1:8000/api/antiques/", {
                    headers: { Authorization: `Token ${token}` },
                });

                console.log("✅ API Response:", response.data);

                if (response.data.length === 0) {
                    console.warn("⚠️ No antiques found in API.");
                }

                setAntiques(response.data);
                setFilteredAntiques(response.data);
            } catch (err) {
                console.error("❌ API Error:", err.response?.data || err.message);
                setError("Failed to load antiques.");
            }
        };

        fetchAntiques();
    }, []);

    useEffect(() => {
        const filtered = antiques.filter((antique) =>
            antique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            antique.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAntiques(filtered);
    }, [searchQuery, antiques]);

    const truncateText = (text, length) => {
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const handleAddToCart = async (antiqueId) => {
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            Swal.fire("Error", "You must be logged in to add items to the cart.", "error");
            return;
        }
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/cart/add/", 
                { antique_id: antiqueId, quantity: 1 },
                { headers: { "Content-Type": "application/json", Authorization: `Token ${localStorage.getItem("authToken")}` } }
            );
    
            Swal.fire("Success", "Item added to cart!", "success");

            // 🔹 Dispatch custom event to notify Navbar about cart update
            window.dispatchEvent(new CustomEvent("cartUpdated", { detail: response.data.total_items }));
            
        } catch (err) {
            console.error("Error adding to cart:", err);
            Swal.fire("Error", "Failed to add item to cart.", "error");
        }
    };

    return (
        <div style={{ minHeight: "100vh", padding: "20px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Antique Shop</h2>
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search antiques..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!isAuthenticated && (
                <p style={{ color: "red" }}>⚠️ You are not logged in. Please log in to view antiques.</p>
            )}

            <div className="row">
                {isAuthenticated && filteredAntiques.length > 0 ? (
                    filteredAntiques.map((antique) => (
                        <div className="col-md-2" key={antique.id}>
                            <div className="card" style={{ border: "none", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "12px", padding: "10px", textAlign: "left" }}>
                                {antique.image && (
                                    <img
                                        src={`http://127.0.0.1:8000${antique.image}`}
                                        alt={antique.name}
                                        className="card-img-top"
                                        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                                        onError={(e) => (e.target.src = "placeholder.jpg")}
                                    />
                                )}
                                <div className="card-body">
                                    <OverlayTrigger
                                        trigger="click"
                                        placement="auto"
                                        overlay={
                                            <Popover>
                                                <Popover.Header as="h3">{antique.name}</Popover.Header>
                                                <Popover.Body>
                                                    <img
                                                        src={`http://127.0.0.1:8000${antique.image}`}
                                                        alt={antique.name}
                                                        className="img-fluid mb-2"
                                                    />
                                                    <p>{antique.description}</p>
                                                    <p className="fw-bold">${antique.price}</p>
                                                </Popover.Body>
                                            </Popover>
                                        }
                                    >
                                        <h5 style={{ fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}>{antique.name}</h5>
                                    </OverlayTrigger>
                                    <p style={{ fontSize: "0.9rem", color: "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {truncateText(antique.description, 50)}
                                    </p>
                                    <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#333" }}>
                                        ${antique.price}
                                    </p>
                                    <div className="d-flex gap-2">
                                        <Button variant="primary" size="sm">Buy Now</Button>
                                        <Button variant="secondary" size="sm" onClick={() => handleAddToCart(antique.id)}>Add to Cart</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    isAuthenticated && <p style={{ color: "red" }}>⚠️ No antiques available. Try adding some items.</p>
                )}
            </div>
        </div>
    );
};

export default Buy;

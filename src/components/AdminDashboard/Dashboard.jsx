import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { BuildingFillX, HouseFill, CartFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [demolitionCount, setDemolitionCount] = useState(0);
    const [sellCount, setSellCount] = useState(0);
    const [analytics, setAnalytics] = useState({ total_sell_requests: 0, total_demolish_requests: 0 });

    useEffect(() => {
        fetchCounts();
        fetchAnalytics();

        const socket = new WebSocket("ws://127.0.0.1:8000/ws/dashboard/");
        socket.onopen = () => console.log("WebSocket connected");
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WebSocket Message Received:", data);
            setDemolitionCount(data.demolitions);
            setSellCount(data.sales);
        };
        socket.onerror = (error) => console.error("WebSocket Error:", error);
        socket.onclose = () => console.log("WebSocket disconnected");

        return () => socket.close();
    }, []);

    const fetchCounts = async () => {
        try {
            const demolitionRes = await axios.get("http://127.0.0.1:8000/api/demolition/count/");
            const sellRes = await axios.get("http://127.0.0.1:8000/api/sell/count/");
            setDemolitionCount(demolitionRes.data.count);
            setSellCount(sellRes.data.count);
        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found.");
            }

            const response = await axios.get("http://127.0.0.1:8000/api/analytics/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            setAnalytics(response.data);
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <Row className="g-4 row-cols-1 row-cols-md-3">
                <Col>
                    <Button 
                        className="w-100 p-4 d-flex flex-column align-items-center border-0"
                        style={{ backgroundColor: "#f8f9fa", color: "#000" }} // Off-white background
                        onClick={() => navigate("/admin/demolishDashboard")}
                    >
                        <BuildingFillX size={40} className="mb-2 text-danger" /> {/* Red icon */}
                        <h5>Demolition Requests</h5>
                        <div className="fs-3 fw-bold">{demolitionCount}</div>
                    </Button>
                </Col>
                <Col>
                    <Button 
                        className="w-100 p-4 d-flex flex-column align-items-center border-0"
                        style={{ backgroundColor: "#f8f9fa", color: "#000" }} // Off-white background
                        onClick={() => navigate("/admin/sellDashboard")}
                    >
                        <HouseFill size={40} className="mb-2 text-primary" /> {/* Blue icon */}
                        <h5>Sell Requests</h5>
                        <div className="fs-3 fw-bold">{sellCount}</div>
                    </Button>
                </Col>
                <Col>
                    <Button 
                        className="w-100 p-4 d-flex flex-column align-items-center border-0"
                        style={{ backgroundColor: "#f8f9fa", color: "#000" }} // Off-white background
                        onClick={() => navigate("/admin/orders")}
                    >
                        <CartFill size={40} className="mb-2 text-success" /> {/* Green icon */}
                        <h5>Orders</h5>
                        <div className="fs-3 fw-bold">{sellCount}</div>
                    </Button>
                </Col>
            </Row>

            {/* Analytics Section */}
            <Row className="mt-5">
                <Col>
                    <div className="shadow-sm p-3 bg-light rounded">
                        <h4 className="mb-3">Analytics Overview</h4>
                        <p>Total Sell Requests: {analytics.total_sell_requests}</p>
                        <ProgressBar now={analytics.total_sell_requests} max={100} variant="primary" />
                        <p className="mt-3">Total Demolish Requests: {analytics.total_demolish_requests}</p>
                        <ProgressBar now={analytics.total_demolish_requests} max={100} variant="danger" />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;

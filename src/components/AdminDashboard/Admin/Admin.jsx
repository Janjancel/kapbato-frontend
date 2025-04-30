import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Accounts from '../Accounts'
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard";
import SellRequests from "../Requests/SellDashboard/SellDashboard";
import DemolitionRequests from "../Requests/DemolishDashboard/DemolishDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../App.css'

const Admin = () => {
    return (
        <div className="container-fluid" id="Admin">
            <div className="row">
                {/* Sidebar - Fixed on the left */}
                <div className="col-md-3 col-lg-2 bg-light text-white vh-100 p-0">
                    <Sidebar />
                </div>

                {/* Main Content - Adjusts according to sidebar */}
                <div className="col-md-9 col-lg-10 p-4">
                    <Routes>
                        <Route path="/" element={<Navigate to="dashboard" />} />
                        <Route path="accounts" element={<Accounts/>} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="sellDashboard" element={<SellRequests />} />
                        <Route path="demolishDashboard" element={<DemolitionRequests />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;

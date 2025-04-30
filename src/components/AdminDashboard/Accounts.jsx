import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AccountsDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authentication token found.");

            const response = await axios.get("http://127.0.0.1:8000/api/accounts/", {
                headers: { Authorization: `Token ${token}` },
            });

            setAccounts(response.data);
            setFilteredAccounts(response.data);
        } catch (error) {
            console.error("Error fetching accounts:", error);
            setError("Failed to fetch accounts. Please log in.");
        } finally {
            setLoading(false);
        }
    };

    const toggleActivation = async (id, isActive) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `http://127.0.0.1:8000/api/accounts/${id}/`,
                { is_active: !isActive },
                { headers: { Authorization: `Token ${token}` } }
            );
            fetchAccounts();
        } catch (err) {
            console.error("Error updating account:", err);
            alert("Failed to update account status.");
        }
    };

    const deleteAccount = async (id) => {
        if (!window.confirm("Are you sure you want to delete this account?")) return;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Authentication required. Please log in.");
                return;
            }

            await axios.delete(`http://127.0.0.1:8000/api/accounts/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });

            fetchAccounts();
        } catch (err) {
            console.error("Error deleting account:", err);
            alert("Failed to delete account. Make sure you are authorized.");
        }
    };

    // Instant search filter
    useEffect(() => {
        const filtered = accounts.filter(
            (account) =>
                account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAccounts(filtered);
    }, [searchQuery, accounts]);

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div
                className="bg-white p-4 rounded shadow"
                style={{ width: "80vw", maxHeight: "90vh", margin: "auto" }}
            >
                {/* Header with Search Bar */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0 ">Accounts Management</h2>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by username or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : (
                    <div className="table-responsive" style={{ maxHeight: "60vh", overflow: "auto" }}>
                        <table className="table table-bordered table-striped text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAccounts.length > 0 ? (
                                    filteredAccounts.map((account) => (
                                        <tr key={account.id}>
                                            <td>{account.id}</td>
                                            <td>{account.username}</td>
                                            <td>{account.email}</td>
                                            <td className={account.is_active ? "text-success" : "text-danger"}>
                                                {account.is_active ? "Active" : "Inactive"}
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <Button
                                                        variant={account.is_active ? "warning" : "success"}
                                                        onClick={() => toggleActivation(account.id, account.is_active)}
                                                        className="me-2"
                                                    >
                                                        {account.is_active ? "Deactivate" : "Activate"}
                                                    </Button>
                                                    <Button variant="danger" onClick={() => deleteAccount(account.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">
                                            No results found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountsDashboard;
